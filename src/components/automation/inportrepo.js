"use client";

import React, { useState, useEffect } from "react";
import { FaTimes, FaSearch } from "react-icons/fa";
import { useSession } from "next-auth/react";
import "@/styles/automation.css";

const ImportRepo = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://api.github.com/user/repos", {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
            Accept: "application/vnd.github.v3+json"
          }
        });

        if (!response.ok) throw new Error("Failed to fetch repositories");
        
        const data = await response.json();
        setRepos(data.map(repo => ({
          id: repo.id,
          name: repo.name,
          owner: repo.owner?.login || "Unknown",
          description: repo.description || "No description",
          private: repo.private
        })));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen && session?.accessToken) {
      fetchRepos();
    }
  }, [isOpen, session?.accessToken]);

  const filteredRepos = repos.filter((repo) =>
    repo.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const redirectToRepoPage = async (repo) => {
    window.location.href = `/${session.user?.username}/automation/${repo.name}`;
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>Import a GitHub Repository</h2>
          <button onClick={onClose} className="close-button">
            <FaTimes />
          </button>
        </div>
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search repositories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="repo-list">
          {loading ? (
            <div className="loading-message">Loading repositories...</div>
          ) : error ? (
            <div className="error-message">Error: {error}</div>
          ) : filteredRepos.length === 0 ? (
            <div className="empty-message">No repositories found</div>
          ) : (
            filteredRepos.map((repo) => (
              <div key={repo.id} className="repo-item">
                <div className="repo-info">
                  <h3>
                    {repo.name}
                    {repo.private && (
                      <span className="visibility-badge">Private</span>
                    )}
                  </h3>
                  <p>{repo.description}</p>
                  <span className="repo-owner">{repo.owner}</span>
                </div>
                <button className="import-button" onClick={() => redirectToRepoPage(repo)}>Import</button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ImportRepo;