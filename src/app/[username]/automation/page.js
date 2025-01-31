"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";  // Add this to access the session
import React from "react";
import Sidebar from "@/components/dashboard/sidebar";
import NavBar from "@/components/dashboard/navbar";
import MobileBar from "@/components/dashboard/mobilebar";
import "@/styles/dashboard.css";
import "@/styles/automation.css";
import { FaSearch, FaCodeBranch, FaPlus } from "react-icons/fa";
import CreateRepoModal from "@/components/automation/newrepo";

const templates = [
  { name: "HTML_CSS_JS", image: "https://static.vecteezy.com/system/resources/previews/013/313/458/non_2x/html-icon-3d-rendering-illustration-vector.jpg" },
  { name: "Flask", image: "https://upload.wikimedia.org/wikipedia/commons/3/3c/Flask_logo.svg" },
  { name: "Next", image: "https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg" },
  { name: "ReactNative Expo", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh79Z8_dzeOvsP4I9tAsDh-C7MLePq7d2sRA&sg" },
  { name: "React Js", image: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" },
  { name: "Django", image: "https://www.svgrepo.com/show/353657/django-icon.svg" },
];

export default function AutomationPage() {
  const { username } = useParams();
  const { data: session } = useSession(); // Get the session data to access the accessToken
  const AccessToken = session?.accessToken;
  const githubToken = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
  const [isSidebarContentVisible, setIsSidebarContentVisible] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [repos, setRepos] = useState([]);
  const [isCreateRepoModalOpen, setIsCreateRepoModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  
  // Fetch repos when the component mounts
  useEffect(() => {
    if (AccessToken) {
      fetch(`https://api.github.com/user/repos`, {
        headers: {
          Authorization: `Bearer ${AccessToken}`,
        },
      })
        .then((res) => res.json())
        .then((data) => setRepos(data))
        .catch((err) => console.error("Error fetching repos: ", err));
    }
  }, [AccessToken]);

  const filteredRepos = repos.filter((repo) =>
    repo.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const truncateDescription = (desc, maxLength = 100) => {
    if (!desc) return '';
    return desc.length > maxLength ? `${desc.substring(0, maxLength)}...` : desc;
  };

  const toggleSidebarContent = () => {
    setIsSidebarContentVisible((prev) => !prev);
  };

  const handleTemplateClick = (template) => {
    setSelectedTemplate(template);
    setIsCreateRepoModalOpen(true);
  };

  return (
    <div>
      <Sidebar
        highlight="Automation"
        username={username}
        className={isSidebarContentVisible ? "sidebar-content" : ""}
      />
      <NavBar username={username} githubToken={githubToken} />
      <MobileBar username={username} toggleSidebarContent={toggleSidebarContent} />

      <div className="dashboard-content">
        <div className="automation-container">
          {/* Repositories Container */}
          <div className="repos-container">
            <div className="repo-header">
              <h2 className="section-title">Import a Git Repository</h2>
            </div>
            <div className="search-container">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search repositories..."
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="repo-list">
              {filteredRepos.map((repo) => (
                <div key={repo.id} className="repo-item">
                  <div className="repo-content">
                    <div className="repo-meta-top">
                      <span className="repo-visibility">{repo.visibility}</span>
                      <span className="repo-username">/{username}</span>
                    </div>
                    <h3 className="repo-name">{repo.name}</h3>
                    <p className="repo-description">{truncateDescription(repo.description)}</p>
                    <div className="repo-meta-bottom">
                      <span className="repo-language">
                        <FaCodeBranch /> {repo.language}
                      </span>
                      <span className="repo-updated">Updated {repo.updated_at}</span>
                    </div>
                  </div>
                  <button className="import-repo-btn">
                    <FaPlus /> Import
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Templates Container */}
          <div className="templates-container">
            <div className="repo-header">
              <h2 className="section-title">Create a New Repository</h2>
            </div>
            <div className="templates-grid">
              {templates.map((template) => (
                <div key={template.name} className="template-card" onClick={() => handleTemplateClick(template)}>
                  <img src={template.image} alt={template.name} className="template-image" />
                  <h3 className="template-name">{template.name}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {isCreateRepoModalOpen && (
        <CreateRepoModal
          isOpen={isCreateRepoModalOpen}
          onClose={() => setIsCreateRepoModalOpen(false)}
          template={selectedTemplate}
        />
      )}
    </div>
  );
}
