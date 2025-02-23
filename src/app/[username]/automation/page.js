// src/app/automation/page.js
"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import React from "react";
import Sidebar from "@/components/dashboard/sidebar";
import NavBar from "@/components/dashboard/navbar";
import MobileBar from "@/components/dashboard/mobilebar";
import "@/styles/dashboard.css";
import "@/styles/automation.css";
import CreateRepoModal from "@/components/automation/newrepomodal";
import Modal from "@/components/dashboard/signinModal";
import { addData } from "@/lib/database";
import { useRouter } from "next/navigation";
import ImportRepo from "@/components/automation/importrepo";  // Import the ImportRepo component
import NewRepoSection from "@/components/automation/newrepo"; // Import the NewRepoSection component

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
  const { data: session } = useSession();
  const AccessToken = session?.accessToken;
  const githubToken = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
  const [isSidebarContentVisible, setIsSidebarContentVisible] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [repos, setRepos] = useState([]);
  const [isCreateRepoModalOpen, setIsCreateRepoModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const API_KEY = process.env.NEXT_PUBLIC_PROJECT_CUSTOM_API;
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!session) {
      setIsModalOpen(true);
    }
  }, [session]);

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

  const toggleSidebarContent = () => {
    setIsSidebarContentVisible((prev) => !prev);
  };

  const handleTemplateClick = (template) => {
    setSelectedTemplate(template);
    setIsCreateRepoModalOpen(true);
  };

  const formattedDate = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });

  const handleImport = async (repo) => {
    try {
      const repoDocument = {
        githubUsername: session.user.username,
        repoName: repo.name,
        repoUrl: repo.html_url,
        visibility: repo.private ? "private" : "public",
        template: "BLANK",
        createdAt: formattedDate
      };

      await addData(API_KEY, "GitMax", "Automations", repoDocument);

      router.push(`${window.location.pathname}/${repo.name}`);
    } catch (error) {
      console.error("Error importing repo:", error);
    }
  };

  if (!session) {
    return <Modal isOpen={isModalOpen} onClose={router.back} />;
  }

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
          {/* Import Repo Section */}
          <ImportRepo
            filteredRepos={filteredRepos}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleImport={handleImport}
            session={session}
            API_KEY={API_KEY}
          />

          {/* New Repo Section */}
          <NewRepoSection
            templates={templates}
            handleTemplateClick={handleTemplateClick}
          />
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
