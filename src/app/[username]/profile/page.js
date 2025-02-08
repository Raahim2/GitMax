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
import { useSession } from "next-auth/react";
import Modal from "@/components/dashboard/signinModal";
import { useRouter } from "next/navigation";

const templates = [
  { name: "HTML_CSS_JS", image: "https://static.vecteezy.com/system/resources/previews/013/313/458/non_2x/html-icon-3d-rendering-illustration-vector.jpg" },
  { name: "Flask", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmD38KsMgEwahtWc_Nfs5ZVktP9dBc36MUZA&s" },
  { name: "Next", image: "https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg" },
  { name: "ReactNative Expo", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh79Z8_dzeOvsP4I9tAsDh-C7MLePq7d2sRA&sg" },
  { name: "React Js", image: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" },
  { name: "Django", image: "https://www.svgrepo.com/show/353657/django-icon.svg" },
  { name: "BLANK", image: "https://www.perplexity.ai/favicon.ico" },

];

export default function ProfilePage() {
  const { username } = useParams();
  const githubToken = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
  const API_KEY = process.env.NEXT_PUBLIC_PROJECT_CUSTOM_API;
  const [isSidebarContentVisible, setIsSidebarContentVisible] = useState(true);
  const [automationData, setAutomationData] = useState([]);
  const{ data:session} = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter()


  const toggleSidebarContent = () => {
    setIsSidebarContentVisible((prev) => !prev);
  };

  useEffect(() => {
    if (!session) {
      setIsModalOpen(true);
    }
  }, [session]);

  
  // Fetch automation data when the component mounts
  useEffect(() => {
    const fetchAutomationCards = async () => {
      const data = await fetchData(API_KEY, "GitMax", "Automations", { githubUsername: session.user.username  });
      if (data) {
        setAutomationData(data); // Assuming data is an array of automation items
      }
    };
    if(session){
      fetchAutomationCards();
    }

  }, [API_KEY, session]);

  // Function to get logo URL based on template name
  const getLogoByTemplateName = (templateName) => {
    const template = templates.find(t => t.name === templateName);
    return template ? template.image : ""; // Return empty string if not found
  };

  

  if (!session) {
    return <Modal isOpen={isModalOpen} onClose={router.back} />;
  }

  return (
    <div>
      <Sidebar highlight="Profile" username={username} className={isSidebarContentVisible ? "sidebar-content" : ""} />
      <NavBar username={username} githubToken={githubToken} />
      <MobileBar username={username} toggleSidebarContent={toggleSidebarContent} />
      <div className="dashboard-content">
        <div className="dashboard-container">
          <div className="w-layout-grid main-grid">
            <div className="w-layout-grid _2-grid">
            {automationData.length > 0 ? (
              automationData.map((project) => (
                <AutomationCard
                  key={project.repoName}
                  projectname={project.repoName}
                  logo={getLogoByTemplateName(project.template)}
                  giturl={project.repoUrl}
                  percentage={7}
                  visibility={project.visibility}
                  createdAt={project.createdAt}
                  templateName={project.template}
                />
              ))
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
