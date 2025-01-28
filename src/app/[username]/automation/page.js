"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import React from "react";
import Sidebar from "@/components/dashboard/sidebar";
import NavBar from "@/components/dashboard/navbar";
import MobileBar from "@/components/dashboard/mobilebar";
import "@/styles/dashboard.css";

export default function AutomationPage() {
  const { username } = useParams();
  const githubToken = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
  const [isSidebarContentVisible, setIsSidebarContentVisible] = useState(true); // State to manage sidebar content class
  
  const toggleSidebarContent = () => {
    setIsSidebarContentVisible((prev) => !prev); // Toggle sidebar content class
  };

  return (
    <div>
      <Sidebar highlight="Automation" username={username} className={isSidebarContentVisible ? "sidebar-content" : ""} />
      <NavBar username={username} githubToken={githubToken} />
      <MobileBar username={username} toggleSidebarContent={toggleSidebarContent}/>
      <div className="dashboard-content">
        <div className="dashboard-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Automation Options</h2>
          <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%', flexWrap: 'wrap' }}>
            {/* Import GitHub Repo Box */}
            <div style={{ 
              backgroundColor: '#ffffff', 
              borderRadius: '10px', 
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
              padding: '20px', 
              margin: '10px', 
              flex: '1 1 300px', // Flex properties for responsive design
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'transform 0.2s',
            }} onClick={() => alert('Import a GitHub repo')}>
              <h3>Import a GitHub Repo</h3>
              <p>Connect your GitHub account and import an existing repository.</p>
            </div>

            {/* Create New GitHub Repo Box */}
            <div style={{ 
              backgroundColor: '#ffffff', 
              borderRadius: '10px', 
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
              padding: '20px', 
              margin: '10px', 
              flex: '1 1 300px', // Flex properties for responsive design
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'transform 0.2s',
            }} onClick={() => alert('Create a new GitHub repo')}>
              <h3>Create a New GitHub Repo</h3>
              <p>Start a new project by creating a new repository on GitHub.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
