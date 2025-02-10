import React, { useState, useEffect } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import CodeBlock from '../dashboard/code'; // Import icons

const CodeTab = ({ session, reponame }) => {
  const [folderStructure, setFolderStructure] = useState([]);
  const [activeFileContent, setActiveFileContent] = useState(null);
  const [expandedFolders, setExpandedFolders] = useState({});

  const toggleFolder = (folderName) => {
    setExpandedFolders(prev => ({
      ...prev,
      [folderName]: !prev[folderName],
    }));
  };

  useEffect(() => {
    const fetchRepoContent = async () => {
      if (!session || !reponame) {
        return;
      }

      try {
        const response = await fetch(
          `https://api.github.com/repos/${session.user.username}/${reponame}/contents`,
          {
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`GitHub API error: ${response.status}`);
        }

        const data = await response.json();
        const structure = await buildFolderStructure(data);
        setFolderStructure(structure);
      } catch (error) {
        console.error("Error fetching repository content:", error);
      }
    };

    const buildFolderStructure = async (data, path = '') => {
      return Promise.all(data.map(async (item) => {
        if (item.type === 'dir') {
          const subResponse = await fetch(
            `https://api.github.com/repos/${session.user.username}/${reponame}/contents/${item.path}`,
            {
              headers: {
                Authorization: `Bearer ${session.accessToken}`,
              },
            }
          );
          if (!subResponse.ok) {
            return null;
          }

          const subData = await subResponse.json();
          const children = await buildFolderStructure(subData, item.path);
          return {
            name: item.name,
            type: 'folder',
            path: item.path,
            children: children.filter(Boolean),
          };
        } else if (item.type === 'file') {
          return {
            name: item.name,
            type: 'file',
            path: item.path,
            download_url: item.download_url,
          };
        }
        return null;
      })).then(results => results.filter(Boolean));
    };

    fetchRepoContent();
  }, [session, reponame]);

  useEffect(() => {
    const fetchFileContent = async (file) => {
      if (!file) return;

      try {
        const response = await fetch(file.download_url);
        if (!response.ok) {
          throw new Error(`Failed to fetch file content: ${response.status}`);
        }
        const content = await response.text();
        setActiveFileContent(content);
      } catch (error) {
        setActiveFileContent("Error loading file content.");
      }
    };

    if (folderStructure.length > 0 && activeFileContent === null) {
      const firstFile = findFirstFile(folderStructure);
      if (firstFile) {
        fetchFileContent(firstFile);
      }
    }

    function findFirstFile(structure) {
      for (const item of structure) {
        if (item.type === 'file') {
          return item;
        } else if (item.type === 'folder' && item.children) {
          const found = findFirstFile(item.children);
          if (found) {
            return found;
          }
        }
      }
      return null;
    }
  }, [folderStructure]);

  const handleFileClick = async (file) => {
    try {
      const response = await fetch(file.download_url);
      if (!response.ok) {
        throw new Error(`Failed to fetch file content: ${response.status}`);
      }
      const content = await response.text();
      setActiveFileContent(content);
    } catch (error) {
      setActiveFileContent("Error loading file content.");
    }
  };

  const renderFolderStructure = (items, level = 0) => {
    return (
      <ul style={{ paddingLeft: level * 10 + 'px' }}>
        {items.map(item => (
          <li key={item.name}>
            <div>
              {item.type === "folder" ? (
                <button
                  onClick={() => toggleFolder(item.name)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}
                >
                  {item.name}
                  {expandedFolders[item.name] ? <FaChevronUp /> : <FaChevronDown />}
                </button>
              ) : (
                <button
                  onClick={() => handleFileClick(item)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'flex-start', width: '100%' }}
                >
                  {item.name}
                </button>
              )}
            </div>
            {item.type === "folder" && expandedFolders[item.name] && item.children && (
              <div style={{ paddingLeft: '20px' }}>
                {renderFolderStructure(item.children, level + 1)}
              </div>
            )}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div style={{ display: 'flex', height: `calc(100vh - 75px)`, border: '1px solid #ccc', borderRadius: '5px', overflow: 'hidden', backgroundColor: '#ffffff', color: '#333333' }}>
      <div style={{ width: '250px', background: '#f0f0f0', padding: '10px', borderRight: '1px solid #ccc', overflowY: 'auto', flexShrink: 0, height: '100%', position: 'relative' }}>
        <h3>File Explorer</h3>
        <div style={{ maxHeight: '100%', overflowY: 'auto' }}>
          {renderFolderStructure(folderStructure)}
        </div>
      </div>
      <div style={{ flex: 1, fontFamily: 'monospace', whiteSpace: 'pre-wrap', overflowX: 'auto', minWidth: 0, backgroundColor: '#fff', color: '#000' }}>
        <CodeBlock code={activeFileContent} filename={"Repo.py"}  />
      </div>
    </div>
  );
};

export default CodeTab;
