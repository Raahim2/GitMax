"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import React from "react";
import Sidebar from "@/components/dashboard/sidebar";
import NavBar from "@/components/dashboard/navbar";
import MobileBar from "@/components/dashboard/mobilebar";
import RepoList from "@/components/dashboard/repolist";
import "@/styles/dashboard.css";

export default function ProjectsPage() {
  const { username } = useParams(); 
  const githubToken = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
  const [isSidebarContentVisible, setIsSidebarContentVisible] = useState(true); // State to manage sidebar content class

  const toggleSidebarContent = () => {
      setIsSidebarContentVisible((prev) => !prev); // Toggle sidebar content class
  };


  return (
    
    <div>
      <Sidebar highlight="Projects" username={username} className={isSidebarContentVisible ? "sidebar-content" : ""} />
      <NavBar username={username} githubToken={githubToken} />
      <MobileBar username={username} toggleSidebarContent={toggleSidebarContent}/>
      <div className="dashboard-content">
        <div className="dashboard-container">
            <RepoList username={username} projectsPerPage={20} githubToken={githubToken}/>
        </div>
      </div>
    </div>
  );
}
