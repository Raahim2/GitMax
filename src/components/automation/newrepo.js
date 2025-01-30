"use client";

import { useState } from "react";
import { FaTimes } from "react-icons/fa";

const CreateRepoModal = ({ isOpen, onClose }) => {
  const [repoName, setRepoName] = useState("");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState("public");

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>Create New Repository</h2>
          <button onClick={onClose} className="close-button">
            <FaTimes />
          </button>
        </div>
        
        <form className="repo-form">
          <div className="form-group">
            <label>Repository name</label>
            <input
              type="text"
              value={repoName}
              onChange={(e) => setRepoName(e.target.value)}
              placeholder="e.g. my-awesome-project"
            />
          </div>

          <div className="form-group">
            <label>Description (optional)</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Short description of your project"
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
                />
                <span className="radio-custom"></span>
                Private
              </label>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="create-button">
              Create Repository
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRepoModal;