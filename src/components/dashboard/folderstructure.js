"use client";

import React, { useEffect, useState } from "react";
import {
  FaFile,
  FaFolder,
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
import CodeBlock from "./code";

const FolderStructure = ({ username, repoName, githubToken, folderstructure }) => {
  const [items, setItems] = useState([]);
  const [fileDetails, setFileDetails] = useState({});
  const [repoLastModified, setRepoLastModified] = useState("");
  const [currentPath, setCurrentPath] = useState(folderstructure);
  const [repoSize, setRepoSize] = useState(0); // Store repo size
  const [folderCount, setFolderCount] = useState(0); // Store number of folders
  const [selectedFile, setSelectedFile] = useState({ content: null, filename: "" });

  


  // Fetch repository structure and file details
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
          setRepoSize(repoData.size); // Set the repo size (in KB)
        }

        const response = await fetch(`https://api.github.com/repos/${username}/${repoName}/git/trees/main?recursive=1`, {
          headers: {
            Authorization: `token ${githubToken}`,
          },
        });
        const data = await response.json();
        
        if (data.tree) {
          // Filter the items based on the folder structure
          let folderItems = [];
          if (folderstructure.length === 0) {
            folderItems = data.tree.filter((item) => !item.path.includes("/"));
          } else {
            const basePath = folderstructure.join("/") + "/";
            folderItems = data.tree.filter((item) => {
              const itemPath = item.path;
              const relativePath = itemPath.replace(basePath, "");
              return (
                itemPath.startsWith(basePath) && // Item is inside the folder
                relativePath.split("/").length === 1 // Item is directly in the folder
              );
            });
          }
          setItems(folderItems);

          // Calculate number of folders
          const folderItemsOnly = folderItems.filter(item => item.type === "tree");
          setFolderCount(folderItemsOnly.length);

          // Fetch file details (size and last modified)
          const details = {};
          for (const file of folderItems) {
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
  }, [username, repoName, githubToken, folderstructure]);

  // Function to get the appropriate Font Awesome icon based on file extension
  const getFileIcon = (fileName) => {
    const ext = fileName.split('.').pop().toLowerCase();

    switch (ext) {
      case 'py':
        return <FaPython />;
      case 'js':
      case 'jsx':
        return <FaJsSquare />;
      case 'tsx':
      case 'ts':
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
      default:
        return <FaFile />;
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
    return { size: '0 KB', lastModified: 'N/A' };
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
      return sizeInMB >= 0.1 ? sizeInMB.toFixed(2) + " MB" : (data.size / 1024).toFixed(2) + " KB"; // Convert to MB or KB
    }
    return "0 KB";
  };

  

  // Function to format date (12 Feb 2024)
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-GB', options);
  };

  // Separate folders and files
  const folders = items.filter(item => item.type === "tree");
  const fileItems = items.filter(item => item.type === "blob");

  // Handle going up the folder structure
  const goUpFolder = () => {
    if (currentPath.length > 0) {
      // Remove the last folder from the path to go up one level
      const previousPath = [...currentPath];
      previousPath.pop();
      setCurrentPath(previousPath);
  
      // Redirect to the new folder path
      const newPath = previousPath.join("/");
      window.location.href = `/${username}/projects/${repoName}/${newPath}`; // Update the URL
    }
  };

  // Calculate folder size
  const getFolderSize = () => {
    if (folderCount === 0) return "0 KB";
    const sizePerFolder = repoSize / folderCount;
    return sizePerFolder >= 0.1 ? sizePerFolder.toFixed(2) + " KB" : (sizePerFolder).toFixed(2) + " KB";
  };

  const fetchFileContent = async (filePath) => {
    try {
      const response = await fetch(
        `https://api.github.com/repos/${username}/${repoName}/contents/${filePath}`,
        {
          headers: {
            Authorization: `token ${githubToken}`,
          },
        }
      );
      const data = await response.json();
      if (data.content) {
        const decodedContent = atob(data.content.replace(/\n/g, ""));
        setSelectedFile({ content: decodedContent, filename: filePath.split("/").pop() }); // Set both content and filename
      } else {
        setSelectedFile({ content: "Unable to fetch file content.", filename: "" });
      }
    } catch (error) {
      console.error("Error fetching file content:", error);
      setSelectedFile({ content: "An error occurred while fetching the file content.", filename: "" });
    }
  };
  

  return (
    <>
    {selectedFile.content ? (
  <div className="file-content">
    <button
      onClick={() => setSelectedFile({ content: null, filename: "" })}
      style={{ marginBottom: "10px", padding: "5px 10px", backgroundColor: "lightgray", border: "none", cursor: "pointer" }}
    >
      Back to Folder View
    </button>
    <CodeBlock code={selectedFile.content} filename={selectedFile.filename} /> {/* Use dynamic filename */}
  </div>
) : (
    <div className="table-module">
      <div className="table-header">
        <h4 className="no-space-bottom">
          {repoName} /{" "}
          {currentPath.length > 0 ? currentPath.join(" / ") : "Root Directory"}
        </h4>
      </div>

      {/* Back Button */}
      

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
              {folders.map((folder, index) => (
                <a key={index} href={`/${username}/projects/${repoName}/${folder.path}`} className="table-row-link w-inline-block">
                  <div className="w-layout-grid table-row">
                    <div className="file-title">
                      <div className="file-square">
                        <FaFolder size={24} />
                        <div className="light-fill"></div>
                      </div>
                      <div className="table-title">{folder.path.split("/").pop()}</div> {/* Display only the file name */}
                    </div>
                    <div>{getFolderSize()}</div> {/* Display folder size */}
                    <div>{repoLastModified}</div> {/* Last modified is repo's last commit */}
                    <div className="table-avatar-row" style={{ color: "blue" }}>
                      View
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}

          {/* Display Files */}
          {fileItems.length > 0 && (
  <div>
    {fileItems.map((file, index) => (
      <div
        key={index}
        className="table-row-link w-inline-block"
        style={{ cursor: "pointer" }}
        onClick={() => fetchFileContent(file.path)}
      >
        <div className="w-layout-grid table-row">
          <div className="file-title">
            <div className="file-square">
              {getFileIcon(file.path)}
              <div className="light-fill"></div>
            </div>
            <div className="table-title">{file.path.split("/").pop()}</div>
          </div>
          <div>{fileDetails[file.path]?.size || "0 KB"}</div>
          <div>{fileDetails[file.path]?.lastModified || "N/A"}</div>
          <div className="table-avatar-row" style={{ color: "blue" }}>
            View
          </div>
        </div>
      </div>
    ))}
  </div>
)}

          
        </div>
      </div>

      {currentPath.length > 0 && (
        <button onClick={goUpFolder} style={{ marginBottom: "10px", padding: "5px 10px", backgroundColor: "lightgray", border: "none", cursor: "pointer" }}>
          Go Back
        </button>
      )}
      <div className="table-bottom-caption">
        <div>All files data from github</div>
      </div>
    </div>
  )}
  </>
  );
};

export default FolderStructure;
