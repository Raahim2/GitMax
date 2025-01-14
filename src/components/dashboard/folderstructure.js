"use client";

import React, { useEffect, useState } from "react";
import {
  FaFile,
  FaFolder,
  FaFileCode,
  FaFilePdf,
  FaImage,
  FaMusic,
  FaVideo,
  FaFileExcel,
  FaPython,
  FaJsSquare,
  FaReact,
  FaCss3Alt,
  FaHtml5,
  FaJava,
  FaPhp,
  FaCuttlefish,
  FaSwift,
  FaRust,
  FaGlobe,
  FaNodeJs,
  FaDatabase
} from "react-icons/fa";

const FolderStructure = ({ username, repoName, githubToken }) => {
  const [files, setFiles] = useState([]);
  const [fileDetails, setFileDetails] = useState({});
  const [repoLastModified, setRepoLastModified] = useState('');

  // Fetch repository structure from GitHub API
  useEffect(() => {
    async function fetchRepoFiles() {
      try {
        const repoResponse = await fetch(`https://api.github.com/repos/${username}/${repoName}`, {
          headers: {
            Authorization: `token ${githubToken}`,
          },
        });
        const repoData = await repoResponse.json();
        const repoCommitResponse = await fetch(`https://api.github.com/repos/${username}/${repoName}/commits`, {
          headers: {
            Authorization: `token ${githubToken}`,
          },
        });
        const repoCommitData = await repoCommitResponse.json();
        
        if (repoData && repoCommitData.length > 0) {
          setRepoLastModified(formatDate(repoCommitData[0].commit.committer.date));
        }

        const response = await fetch(`https://api.github.com/repos/${username}/${repoName}/git/trees/main`, {
          headers: {
            Authorization: `token ${githubToken}`,
          },
        });
        const data = await response.json();
        if (data.tree) {
          setFiles(data.tree);

          // Fetch file details (size and last modified)
          const details = {};
          for (const file of data.tree) {
            if (file.type === "blob") {
              const fileData = await getFileDetails(file.path);
              details[file.path] = fileData;
            }
          }
          setFileDetails(details);
        }
      } catch (error) {
        console.error("Error fetching repository files:", error);
      }
    }

    fetchRepoFiles();
  }, [username, repoName, githubToken]);

  // Function to get the appropriate Font Awesome icon based on file extension
  const getFileIcon = (fileName) => {
    const ext = fileName.split('.').pop().toLowerCase();

    switch (ext) {
      // Programming languages
      case 'py':
        return <FaPython />;
      case 'js':
      case 'jsx':
        return <FaJsSquare />;
      case 'ts':
      case 'tsx':
        return <FaReact />;
      case 'css':
        return <FaCss3Alt />;
      case 'html':
        return <FaHtml5 />;
      case 'java':
        return <FaJava />;
      case 'php':
        return <FaPhp />;
      case 'c':
      case 'cpp':
        return <FaCuttlefish />;
      case 'swift':
        return <FaSwift />;
      case 'rs':
        return <FaRust />;
      case 'go':
        return <FaGlobe />;
      case 'node':
        return <FaNodeJs />;
      case 'sql':
      case 'db':
        return <FaDatabase />;
        
      // File types
      case 'pdf':
        return <FaFilePdf />;
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
      case 'bmp':
        return <FaImage />;
      case 'mp3':
        return <FaMusic />;
      case 'mp4':
      case 'mkv':
      case 'avi':
        return <FaVideo />;
      case 'xlsx':
        return <FaFileExcel />;
      case 'txt':
        return <FaFile />;
      case 'md':
        return <FaFile />;
        
      // Default file icon for unknown extensions
      default:
        return <FaFileCode />;
    }
  };

  // Function to fetch last commit date and size for files
  const getFileDetails = async (filePath) => {
    const response = await fetch(`https://api.github.com/repos/${username}/${repoName}/commits?path=${filePath}`, {
      headers: {
        Authorization: `token ${githubToken}`,
      },
    });
    const data = await response.json();

    if (data.length > 0) {
      const lastCommit = data[0].commit;
      const fileSize = await getFileSize(filePath);
      return {
        size: fileSize,
        lastModified: formatDate(lastCommit.committer.date)
      };
    }
    return { size: 'N/A', lastModified: 'N/A' };
  };

  // Function to fetch size of the file in KB or MB
  const getFileSize = async (filePath) => {
    const response = await fetch(`https://api.github.com/repos/${username}/${repoName}/contents/${filePath}`, {
      headers: {
        Authorization: `token ${githubToken}`,
      },
    });
    const data = await response.json();
    if (data.size) {
      const sizeInMB = data.size / (1024 * 1024);
      return sizeInMB >= 0.1 ? sizeInMB.toFixed(2) : (data.size / 1024).toFixed(2); // Convert to MB or KB
    }
    return 'N/A';
  };

  // Function to format date (12 Feb 2024)
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-GB', options);
  };

  // Separate folders and files
  const folders = files.filter(file => file.type === "tree");
  const fileItems = files.filter(file => file.type === "blob");

  // Calculate total size and last modified for each folder
  const getFolderDetails = (folderName) => {
    const folderFiles = fileItems.filter(file => file.path.startsWith(folderName));
    let totalSize = 0;
    let lastModified = repoLastModified;
    
    folderFiles.forEach(file => {
      totalSize += parseFloat(fileDetails[file.path]?.size || 0);
      const fileDate = fileDetails[file.path]?.lastModified || '';
      if (new Date(fileDate) > new Date(lastModified)) {
        lastModified = fileDate;
      }
    });

    return {
      totalSize: totalSize >= 0.1 ? totalSize.toFixed(2) + ' MB' : (totalSize * 1024).toFixed(2) + ' KB', // Display MB or KB
      lastModified: lastModified || 'N/A'
    };
  };

  return (
    <div className="table-module">
      <div className="table-header">
        <h4 className="no-space-bottom">Latest Files from {repoName} Repo</h4>
      </div>
      <div className="table-content">
        <div className="table-list">
          <div className="w-layout-grid table-headers">
            <div className="caption-large">File Name</div>
            <div className="caption-large">Size</div>
            <div className="caption-large">Modified</div>
            <div className="caption-large">View</div>
          </div>

          {/* Display Folders First */}
          {folders.length > 0 && (
            <div>
              {folders.map((file, index) => {
                const folderDetails = getFolderDetails(file.path);
                return (
                  <a key={index} href={`/${username}/projects/${repoName}`} className="table-row-link w-inline-block">
                    <div className="w-layout-grid table-row">
                      <div className="file-title">
                        <div className="file-square">
                          <FaFolder size={24} />
                          <div className="light-fill"></div>
                        </div>
                        <div className="table-title">{file.path}</div>
                      </div>
                      <div>{folderDetails.totalSize}</div>
                      <div>{folderDetails.lastModified}</div>
                      <div className="table-avatar-row" style={{ color: "blue" }}>
                        View
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          )}

          {/* Display Files */}
          {fileItems.length > 0 && (
            <div>
              {fileItems.map((file, index) => (
                <a key={index} href="#" className="table-row-link w-inline-block">
                  <div className="w-layout-grid table-row">
                    <div className="file-title">
                      <div className="file-square">
                        {getFileIcon(file.path)}
                        <div className="light-fill"></div>
                      </div>
                      <div className="table-title">{file.path}</div>
                    </div>
                    <div>{fileDetails[file.path]?.size } MB</div>
                    <div>{fileDetails[file.path]?.lastModified || 'N/A'}</div>

                    <div className="table-avatar-row" style={{ color: "blue" }}>
                     View
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}

        </div>
      </div>
      <div className="table-bottom-caption">
        <div>All files under non-disclosure agreement</div>
      </div>
    </div>
  );
};

export default FolderStructure;
