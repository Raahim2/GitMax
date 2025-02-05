"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import React from "react";
import Sidebar from "@/components/dashboard/sidebar";
import NavBar from "@/components/dashboard/navbar";
import MobileBar from "@/components/dashboard/mobilebar";
import "@/styles/dashboard.css";
import AutomationCard from "@/components/automation/automationcard";
import { fetchData } from "@/lib/database";

const templates = [
  { name: "HTML_CSS_JS", image: "https://static.vecteezy.com/system/resources/previews/013/313/458/non_2x/html-icon-3d-rendering-illustration-vector.jpg" },
  { name: "Flask", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmD38KsMgEwahtWc_Nfs5ZVktP9dBc36MUZA&s" },
  { name: "Next", image: "https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg" },
  { name: "ReactNative Expo", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh79Z8_dzeOvsP4I9tAsDh-C7MLePq7d2sRA&sg" },
  { name: "React Js", image: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" },
  { name: "Django", image: "https://www.svgrepo.com/show/353657/django-icon.svg" },
];

export default function ProfilePage() {
  const { username } = useParams();
  const githubToken = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
  const API_KEY = process.env.NEXT_PUBLIC_PROJECT_CUSTOM_API;
  const [isSidebarContentVisible, setIsSidebarContentVisible] = useState(true);
  const [automationData, setAutomationData] = useState([]);

  const toggleSidebarContent = () => {
    setIsSidebarContentVisible((prev) => !prev);
  };

  // Fetch automation data when the component mounts
  useEffect(() => {
    const fetchAutomationCards = async () => {
      const data = await fetchData(API_KEY, "GitMax", "Automations", { githubUsername: "Raahim2" });
      if (data) {
        setAutomationData(data); // Assuming data is an array of automation items
      }
    };

    fetchAutomationCards();
  }, [API_KEY]);

  // Function to get logo URL based on template name
  const getLogoByTemplateName = (templateName) => {
    const template = templates.find(t => t.name === templateName);
    return template ? template.image : ""; // Return empty string if not found
  };

  return (
    <div>
      <Sidebar highlight="Profile" username={username} className={isSidebarContentVisible ? "sidebar-content" : ""} />
      <NavBar username={username} githubToken={githubToken} />
      <MobileBar username={username} toggleSidebarContent={toggleSidebarContent} />
      <div className="dashboard-content">
        <div className="dashboard-container">
          <div className="w-layout-grid main-grid">
            <div className="w-layout-grid _2-grid">
              {automationData.map((project) => (
                <AutomationCard 
                  key={project.repoName} // Assuming project has a unique repoName property
                  projectname={project.repoName} // Assuming project has a name property
                  logo={getLogoByTemplateName(project.template)} // Get logo based on templateName
                  giturl={project.repoUrl} // Assuming project has a repoUrl property
                  percentage={7}
                  visibility={project.visibility} 
                  createdAt={project.createdAt}
                  templateName={project.template}
                />
              ))}
              <AutomationCard 
                key="dummy-repo" 
                projectname="Dummy Project" 
                logo={getLogoByTemplateName("HTML_CSS_JS")}
                giturl="https://github.com/dummy-repo" 
                percentage={96}
                visibility="public" 
                createdAt="2023-01-01"
                templateName="Dummy Template"
              />
              <AutomationCard 
                key="dummy-repo" 
                projectname="Dummy Project" 
                logo={getLogoByTemplateName("Next")}
                giturl="https://github.com/dummy-repo" 
                percentage={56}
                visibility="public" 
                createdAt="2023-01-01"
                templateName="Dummy Template"
              />
              <AutomationCard 
                key="dummy-repo" 
                projectname="Dummy Project" 
                logo={getLogoByTemplateName("ReactNative Expo")}
                giturl="https://github.com/dummy-repo" 
                percentage={45}
                visibility="public" 
                createdAt="2023-01-01"
                templateName="Dummy Template"
              />
              <AutomationCard 
                key="dummy-repo" 
                projectname="Dummy Project" 
                logo={getLogoByTemplateName("Django")}
                giturl="https://github.com/dummy-repo" 
                percentage={76}
                visibility="public" 
                createdAt="2023-01-01"
                templateName="Dummy Template"
              />
              <AutomationCard 
                key="dummy-repo" 
                projectname="Dummy Project" 
                logo={getLogoByTemplateName("React Js")}
                giturl="https://github.com/dummy-repo" 
                percentage={26}
                visibility="public" 
                createdAt="2023-01-01"
                templateName="Dummy Template"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
