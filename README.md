This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details




## Save It Believe it

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