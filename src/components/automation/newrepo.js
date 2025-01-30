"use client";

import { useState , useEffect } from "react";
import { FaTimes, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import { useSession } from "next-auth/react";

const CreateRepoModal = ({ isOpen, onClose }) => {
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
      const response = await fetch("https://api.github.com/user/repos", {
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
        }),
      });

      setNotification({
        type: 'success',
        message: 'Repository created successfully!'
      });
      setTimeout(onClose, 2000); // Close modal after 2 seconds


      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create repository");
      }

      setRepoName("");
      setDescription("");
      setVisibility("public");
    } catch (err) {
      setNotification({
        type: 'error',
        message: err.message
      });
    } finally {
      setLoading(false);
    }
  };


  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">

      {notification && (
          <div className={`notification ${notification.type}`}>
            <div className="notification-content">
              {notification.type === 'success' ? (
                <FaCheckCircle className="notification-icon" />
              ) : (
                <FaExclamationCircle className="notification-icon" />
              )}
              <span>{notification.message}</span>
              <button 
                className="notification-close"
                onClick={() => setNotification(null)}
              >
                <FaTimes />
              </button>
            </div>
          </div>
        )}
        
        <div className="modal-header">
          <h2>Create New Repository</h2>
          <button onClick={onClose} className="close-button">
            <FaTimes />
          </button>
        </div>
        
        <form className="repo-form" onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label>Repository name</label>
            <input
              type="text"
              value={repoName}
              onChange={(e) => setRepoName(e.target.value)}
              placeholder="e.g. my-awesome-project"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Description (optional)</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Short description of your project"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Visibility</label>
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  value="public"
                  checked={visibility === "public"}
                  onChange={() => setVisibility("public")}
                  disabled={loading}
                />
                <span className="radio-custom"></span>
                Public
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  value="private"
                  checked={visibility === "private"}
                  onChange={() => setVisibility("private")}
                  disabled={loading}
                />
                <span className="radio-custom"></span>
                Private
              </label>
            </div>
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              className="cancel-button" 
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="create-button"
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