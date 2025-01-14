"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import React from "react";
import Sidebar from "@/components/dashboard/sidebar";
import NavBar from "@/components/dashboard/navbar";
import MobileBar from "@/components/dashboard/mobilebar";
import RepoInfoGrid from "@/components/dashboard/repoinfogrid";
import RepoVisualization from "@/components/dashboard/repovisualization";
import FolderStructure from "@/components/dashboard/folderstructure";
import "@/styles/dashboard.css";

export default function ProjectStructure() {
  const { username, projectname } = useParams();
  const githubToken = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

  // Ensure projectname is handled as an array
  const projectPathArray = Array.isArray(projectname) ? projectname : [];

  // Extract project name (first part) and folder paths (remaining parts)
  const projectName = projectPathArray[0] || ""; // First element as project name
  const folderPaths = projectPathArray.slice(1); // Remaining elements as folder paths

  return (
    <div>
      <Sidebar highlight="Projects" username={username} />
      <NavBar username={username} githubToken={githubToken} />
      <MobileBar />
      <div className="dashboard-content">
        <div className="dashboard-container">
          <p>Project Name: {projectName}</p>
          <RepoInfoGrid username={username} repoName={projectName} githubToken={githubToken} />
          <p>.</p>
          <RepoVisualization username={username} repoName={projectName} githubToken={githubToken} />
          <p>.</p>
          <FolderStructure
            username={username}
            repoName={projectName}
            githubToken={githubToken}
            folderstructure={folderPaths}
          />
          
        </div>
      </div>
    </div>
  );
}
