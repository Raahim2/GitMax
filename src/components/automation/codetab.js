import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { FaChevronDown, FaChevronUp, FaFolder, FaFolderOpen, FaFile } from 'react-icons/fa';
import CodeBlock from '../dashboard/code';
import { fetchData } from '@/lib/database';

const CodeTab = ({ session }) => {
  const { automation_name } = useParams();
  const [folderStructure, setFolderStructure] = useState([]);
  const [activeFileContent, setActiveFileContent] = useState(null);
  const [expandedFolders, setExpandedFolders] = useState({});
  const [repoDetails, setRepoDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = process.env.NEXT_PUBLIC_PROJECT_CUSTOM_API;


  // VS Code-like light theme styles
  const styles = {
    container: {
      display: 'flex',
      height: 'calc(100vh - 75px)',
      backgroundColor: '#ffffff',
      borderRadius: '4px',
      overflow: 'hidden',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    sidebar: {
      width: '300px',
      backgroundColor: '#f3f3f3',
      borderRight: '1px solid #e0e0e0',
      overflowY: 'auto',
      padding: '16px'
    },
    fileTree: {
      listStyle: 'none',
      paddingLeft: '0',
      margin: '0'
    },
    listItem: {
      padding: '4px 0',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: 'rgba(0,0,0,0.05)'
      }
    },
    folderHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      fontWeight: '600',
      color: '#1f1f1f'
    },
    fileHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      color: '#1f1f1f'
    },
    icon: {
      color: '#80a0b0',
      flexShrink: 0
    },
    codeContainer: {
      flex: 1,
      overflow: 'auto',
      backgroundColor: '#fffffe',
    },
    error: {
      color: '#dc3545',
      padding: '16px'
    }
  };

  useEffect(() => {
    const fetchRepoData = async () => {
      try {
        const data = await fetchData(
          API_KEY,
          "GitMax",
          "Automations",
          { repoName: automation_name }
        );

        if (!data || data.length === 0) {
          throw new Error('Repository not found');
        }

        const repo = data[0];
        if (!repo.repoUrl) throw new Error('Repository URL not found');
        setRepoDetails(repo);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchRepoData();
  }, [automation_name]);

  useEffect(() => {
    const fetchRepoContent = async () => {
      if (!repoDetails || !session) return;

      try {
        const url = new URL(repoDetails.repoUrl);
        const [, owner, repo] = url.pathname.split('/');
        
        const response = await fetch(
          `https://api.github.com/repos/${owner}/${repo}/contents`,
          {
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
              Accept: 'application/vnd.github+json'
            }
          }
        );
        if (!response.ok) throw new Error('Failed to fetch repository contents');
        
        const data = await response.json();
        const structure = await buildFolderStructure(data, owner, repo);
        setFolderStructure(structure);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    const buildFolderStructure = async (data, owner, repo, path = '') => {
      return Promise.all(data.map(async (item) => {
        if (item.type === 'dir') {
          const response = await fetch(
            `https://api.github.com/repos/${owner}/${repo}/contents/${item.path}`,
            {
              headers: {
                Authorization: `Bearer ${session.accessToken}`,
                Accept: 'application/vnd.github+json'
              }
            }
          );

          if (!response.ok) return null;
          
          const subData = await response.json();
          const children = await buildFolderStructure(subData, owner, repo, item.path);
          return {
            name: item.name,
            type: 'folder',
            path: item.path,
            children: children.filter(Boolean)
          };
        }
        return {
          name: item.name,
          type: 'file',
          path: item.path,
          download_url: item.download_url
        };
      }));
    };

    fetchRepoContent();
  }, [repoDetails, session]);

  const toggleFolder = (path) => {
    setExpandedFolders(prev => ({
      ...prev,
      [path]: !prev[path]
    }));
  };

  const handleFileClick = async (download_url) => {
    try {
        const response = await fetch(download_url);
        if (!response.ok) throw new Error('Failed to fetch file content');
        
        const content = await response.text();
        setActiveFileContent(content);
    } catch (err) {
        setActiveFileContent('Error loading file content');
    }
};


  const renderTree = (items, level = 0) => (
    <ul style={{ ...styles.fileTree, paddingLeft: level > 0 ? '16px' : '0' }}>
      {items.map((item) => (
        <li key={item.path} style={styles.listItem}>
          {item.type === 'folder' ? (
            <>
              <div 
                style={{ ...styles.folderHeader, paddingLeft: `${level * 8}px` }}
                onClick={() => toggleFolder(item.path)}
              >
                {expandedFolders[item.path] ? (
                  <>
                    <FaFolderOpen style={styles.icon} />
                    <FaChevronUp size={12} />
                  </>
                ) : (
                  <>
                    <FaFolder style={styles.icon} />
                    <FaChevronDown size={12} />
                  </>
                )}
                <span>{item.name}</span>
              </div>
              {expandedFolders[item.path] && item.children && (
                renderTree(item.children, level + 1)
              )}
            </>
          ) : (
            <div 
              style={{ ...styles.fileHeader, paddingLeft: `${level * 8 + 24}px` }}
              onClick={() => handleFileClick(item.download_url)}
            >
              <FaFile style={styles.icon} />
              <span>{item.name}</span>
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  if (loading) return <div style={styles.error}>Loading repository...</div>;
  if (error) return <div style={styles.error}>Error: {error}</div>;

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <h3 style={{ margin: '0 0 16px 8px' }}>Explorer</h3>
        {renderTree(folderStructure)}
      </div>
      
      <div style={styles.codeContainer}>
        {activeFileContent ? (
          <CodeBlock code={activeFileContent} filename={"GitMax.py"}/>
        ) : (
          <div>Select a file to view its content</div>
        )}
      </div>
    </div>
  );
};

export default CodeTab;