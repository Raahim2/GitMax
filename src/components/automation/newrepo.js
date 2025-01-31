"use client";

import { useState, useEffect } from "react";
import { FaTimes, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import { useSession } from "next-auth/react";

const CreateRepoModal = ({ isOpen, onClose, template }) => {
  const [repoName, setRepoName] = useState("");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState("public");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { data: session } = useSession();
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
  
    if (!session?.accessToken) {
      setError("Not authenticated with GitHub");
      setLoading(false);
      return;
    }
  
    if (!repoName.trim()) {
      setError("Repository name is required");
      setLoading(false);
      return;
    }
  
    try {
      // Create the new repository
      const createRepoResponse = await fetch("https://api.github.com/user/repos", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
          Accept: "application/vnd.github.v3+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: repoName.trim(),
          description: description.trim(),
          private: visibility === "private",
          auto_init: true, // Initialize with a README
        }),
      });
  
      if (!createRepoResponse.ok) {
        const errorData = await createRepoResponse.json();
        throw new Error(errorData.message || "Failed to create repository");
      }
  
      const repoData = await createRepoResponse.json();
  
      // Specify the folder to download
      const owner = 'Raahim2';
      const repo = 'GitMax';
      const folderPath = 'public'; // Update with the specific folder path
      const branch = 'master'; // Specify the branch if needed
  
      // Fetch contents of a directory from the specified repository
      const fetchFolderContents = async (path = '') => {
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${branch}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch contents from ${owner}/${repo}/${path}`);
        }
        return response.json();
      };
  
      // Handle file upload (create or update)
      const handleFileUpload = async (filePath, content) => {
        const response = await fetch(`https://api.github.com/repos/${repoData.full_name}/contents/${filePath}`);
        
        if (response.ok) {
          const fileData = await response.json();
          const sha = fileData.sha; // Get current SHA for updating
  
          // Update existing file
          await fetch(`https://api.github.com/repos/${repoData.full_name}/contents/${filePath}`, {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
              Accept: "application/vnd.github.v3+json",
            },
            body: JSON.stringify({
              message: `Update ${filePath}`,
              content: btoa(content), // Base64 encode content
              sha: sha, // Include SHA for update
              branch: 'main',
            }),
          });
        } else if (response.status === 404) {
          // Create new file if it doesn't exist
          await fetch(`https://api.github.com/repos/${repoData.full_name}/contents/${filePath}`, {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
              Accept: "application/vnd.github.v3+json",
            },
            body: JSON.stringify({
              message: `Create ${filePath}`,
              content: btoa(content), // Base64 encode content
              branch: 'main',
            }),
          });
        } else {
          throw new Error("Failed to check file existence");
        }
      };
  
      // Recursively process files and directories from the specified folder
      const processContents = async (items, basePath = '') => {
        for (const item of items) {
          const itemPath = basePath ? `${basePath}/${item.name}` : item.name; // Construct full path
          
          if (item.type === 'file') {
            const fileContentResponse = await fetch(item.download_url);
            if (!fileContentResponse.ok) {
              throw new Error(`Failed to fetch ${item.name} from template repository`);
            }
            const fileContent = await fileContentResponse.text();
            await handleFileUpload(itemPath, fileContent);
          } else if (item.type === 'dir') {
            const nestedContents = await fetchFolderContents(item.path);
            await processContents(nestedContents, itemPath); // Recursively process subdirectory
          }
        }
      };
  
      // Start processing the contents of the specified folder
      const contents = await fetchFolderContents(folderPath);
      await processContents(contents);
  
      setNotification({
        type: "success",
        message: `Repository created and folder contents uploaded successfully!`,
      });
  
      setTimeout(onClose, 2000);
    } catch (err) {
      setNotification({
        type: "error",
        message: err.message,
      });
      console.error("Error during repository creation:", err);
    } finally {
      setLoading(false);
      setRepoName("");
      setDescription("");
      setVisibility("public");
    }
  };
  
  
  


  if (!isOpen) return null;

  return (
    <div className="create-repo-modal-overlay">
      <div className="create-repo-modal">
        {notification && (
          <div className={`create-repo-notification ${notification.type}`}>
            <div className="create-repo-notification-content">
              {notification.type === 'success' ? (
                <FaCheckCircle className="create-repo-notification-icon" />
              ) : (
                <FaExclamationCircle className="create-repo-notification-icon" />
              )}
              <span>{notification.message}</span>
              <button 
                className="create-repo-notification-close"
                onClick={() => setNotification(null)}
              >
                <FaTimes />
              </button>
            </div>
          </div>
        )}

        {/* Framework Template Information */}
        <div className="template-info">
          <img src={template.image} alt={`${template.name} logo`} className="template-icon" />
          <span className="template-name">{template.name}</span>
        </div>

        <div className="create-repo-modal-header">
          <h2>Create New Repository</h2>
          <button onClick={onClose} className="create-repo-modal-close-btn">
            <FaTimes />
          </button>
        </div>

        <form className="repo-form" onSubmit={handleSubmit}>
          {error && <div className="create-repo-error-message">{error}</div>}

          <div className="create-repo-form-group">
            <label>Repository name</label>
            <input
              type="text"
              value={repoName}
              onChange={(e) => setRepoName(e.target.value)}
              placeholder="e.g. my-awesome-project"
              disabled={loading}
            />
          </div>

          <div className="create-repo-form-group">
            <label>Description (optional)</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Short description of your project"
              disabled={loading}
            />
          </div>

          <div className="create-repo-form-group">
            <label>Visibility</label>
            <div className="create-repo-radio-group">
              <label className="create-repo-radio-label">
                <input
                  type="radio"
                  value="public"
                  checked={visibility === "public"}
                  onChange={() => setVisibility("public")}
                  disabled={loading}
                  className="create-repo-radio-input"
                />
                Public
              </label>
              <label className="create-repo-radio-label">
                <input
                  type="radio"
                  value="private"
                  checked={visibility === "private"}
                  onChange={() => setVisibility("private")}
                  disabled={loading}
                  className="create-repo-radio-input"
                />
                Private
              </label>
            </div>
          </div>

          <div className="create-repo-form-actions">
            <button 
              type="button" 
              className="create-repo-cancel-btn" 
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="create-repo-create-btn"
              disabled={loading || !repoName.trim()}
            >
              {loading ? "Creating..." : "Create Repository"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRepoModal;
