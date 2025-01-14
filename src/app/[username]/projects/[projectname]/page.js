"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import React from "react";
import Sidebar from "@/components/dashboard/sidebar";
import NavBar from "@/components/dashboard/navbar";
import MobileBar from "@/components/dashboard/mobilebar";
import "@/styles/dashboard.css";
import RepoInfoGrid from "@/components/dashboard/repoinfogrid";
import RepoVisualization from "@/components/dashboard/repovisualization";
import FolderStructure from "@/components/dashboard/folderstructure";

export default function ProjectsPage() {
  const { username  , projectname} = useParams(); 
  const githubToken = process.env.NEXT_PUBLIC_GITHUB_TOKEN;


  return (
    <div>
      <Sidebar highlight="Projects" username={username} />
      <NavBar username={username} githubToken={githubToken}/> 
      <MobileBar />
      <div className="dashboard-content">
        <div className="dashboard-container">
            <p>{projectname}</p>
            <RepoInfoGrid username={username} repoName={projectname} githubToken={githubToken}/>
            <p>.</p>
            <RepoVisualization username={username} repoName={projectname} githubToken={githubToken}/>
            <p>.</p>
            <FolderStructure username={username} repoName={projectname} githubToken={githubToken}/>
        </div>
      </div>
    </div>
  );
}
