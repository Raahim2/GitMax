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
        message: 'Repository created successfully!',
      });
      setTimeout(onClose, 2000); // Close modal after 2 seconds

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create repository");
      }

      // Reset form and close modal on success
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
