"use client";

import React, { useState } from "react";
import { FaTimes , FaSearch } from "react-icons/fa";
import "@/styles/automation.css"

const ImportRepo = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Dummy repositories data
  const dummyRepos = [
    { id: 1, name: "my-awesome-project", owner: "user1", description: "A project to automate workflows." },
    { id: 2, name: "react-dashboard", owner: "user2", description: "A modern React dashboard template." },
    { id: 3, name: "nextjs-blog", owner: "user3", description: "A blog built with Next.js and Tailwind CSS." },
    { id: 4, name: "nextjs-blog", owner: "user3", description: "A blog built with Next.js and Tailwind CSS." },
    { id: 5, name: "nextjs-blog", owner: "user3", description: "A blog built with Next.js and Tailwind CSS." },
  ];

  // Filter repositories based on search query
  const filteredRepos = dummyRepos.filter((repo) =>
    repo.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          {filteredRepos.map((repo) => (
            <div key={repo.id} className="repo-item">
              <div className="repo-info">
                <h3>{repo.name}</h3>
                <p>{repo.description}</p>
                <span className="repo-owner">{repo.owner}</span>
              </div>
              <button className="import-button">Import</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImportRepo;