"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import React from "react";
import Sidebar from "@/components/dashboard/sidebar";
import NavBar from "@/components/dashboard/navbar";
import MobileBar from "@/components/dashboard/mobilebar";
import "@/styles/dashboard.css";
import AutomationCard from "@/components/automation/automationcard";

export default function ProfilePage() {
  const { username } = useParams();
  const githubToken = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
  const [isSidebarContentVisible, setIsSidebarContentVisible] = useState(true); // State to manage sidebar content className

  const toggleSidebarContent = () => {
    setIsSidebarContentVisible((prev) => !prev); // Toggle sidebar content className
  };

  return (
    <div>
      <Sidebar highlight="Profile" username={username} className={isSidebarContentVisible ? "sidebar-content" : ""} />
      <NavBar username={username} githubToken={githubToken} />
      <MobileBar username={username} toggleSidebarContent={toggleSidebarContent}/>
      <div className="dashboard-content">
      <div className="dashboard-container">
      <div className="w-layout-grid main-grid">
            <div className="w-layout-grid _2-grid">
              <AutomationCard projectname="GitMax" logo={"https://static.vecteezy.com/system/resources/previews/013/313/458/non_2x/html-icon-3d-rendering-illustration-vector.jpg"} percentage={5} />
              <AutomationCard projectname="GitMax" logo={"https://static.vecteezy.com/system/resources/previews/013/313/458/non_2x/html-icon-3d-rendering-illustration-vector.jpg"} percentage={30} />
              <AutomationCard projectname="GitMax" logo={"https://static.vecteezy.com/system/resources/previews/013/313/458/non_2x/html-icon-3d-rendering-illustration-vector.jpg"} percentage={50} />
              <AutomationCard projectname="GitMax" logo={"https://static.vecteezy.com/system/resources/previews/013/313/458/non_2x/html-icon-3d-rendering-illustration-vector.jpg"} percentage={70} />
              <AutomationCard projectname="Flask" logo={"https://upload.wikimedia.org/wikipedia/commons/3/3c/Flask_logo.svg"} percentage={100}/>
            </div>
        </div>

      </div>
      
      </div>
    </div>
  );
}
