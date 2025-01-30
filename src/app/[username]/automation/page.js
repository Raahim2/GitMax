"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import React from "react";
import Sidebar from "@/components/dashboard/sidebar";
import NavBar from "@/components/dashboard/navbar";
import MobileBar from "@/components/dashboard/mobilebar";
import ImportRepo from "@/components/automation/inportrepo"; 
import CreateRepoModal from "@/components/automation/newrepo";
import "@/styles/dashboard.css";
import "@/styles/automation.css"
import { FaDownload , FaPlus } from "react-icons/fa";

export default function AutomationPage() {
  const { username } = useParams();
  const githubToken = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
  const [isSidebarContentVisible, setIsSidebarContentVisible] = useState(true);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false); // State for modal
  const [isNewRepoModalOpen, setIsNewRepoModalOpen] = useState(false);

  const toggleSidebarContent = () => {
    setIsSidebarContentVisible((prev) => !prev);
  };

  const openImportModal = () => {
    setIsImportModalOpen(true);
  };

  const closeImportModal = () => {
    setIsImportModalOpen(false);
  };

  const openNewRepoModal = () => {
    setIsNewRepoModalOpen(true);
  };

  const closeNewRepoModal = () => {
    setIsNewRepoModalOpen(false);
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
          <div className="automation-box">
            <div className="icon-container">
              <FaDownload className="automation-icon" />
            </div>
            <h2>Import a GitHub Repo</h2>
            <p>Bring an existing repository for automation.</p>
            <button className="automation-button" onClick={openImportModal}>
              Import Repository
            </button>
          </div>
          <div className="automation-box">
            <div className="icon-container">
              <FaPlus className="automation-icon" />

            </div>
            <h2>Create a New GitHub Repo</h2>
            <p>Start Automating fresh with a new repository.</p>
            <button className="automation-button" onClick={openNewRepoModal}>
              Create Repository
            </button>
          </div>
        </div>
      </div>
      <ImportRepo isOpen={isImportModalOpen} onClose={closeImportModal} />
      <CreateRepoModal isOpen={isNewRepoModalOpen} onClose={closeNewRepoModal} />

    </div>
  );
}