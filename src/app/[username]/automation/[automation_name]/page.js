"use client";
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import Modal from '@/components/dashboard/signinModal';

// CSS Styles
const styles = `
  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #1e1e1e; /* VS Code background */
    color: #ffffff; /* Text color */
  }

  .container {
    max-width: 1200px;
    margin: auto;
    padding: 20px;
  }

  .tabs {
    display: flex;
    border-bottom: 1px solid #444444; /* Tab border */
    margin-bottom: 20px;
  }

  .tab {
    padding: 10px 20px;
    cursor: pointer;
    border: none;
    background-color: transparent;
    color: #ffffff;
    transition: background-color 0.3s ease;
  }

  .tab:hover {
    background-color: #333333; /* Hover effect */
  }

  .active-tab {
    border-bottom: 2px solid #007acc; /* Active tab color */
    font-weight: bold; /* Bold active tab */
  }

  .content {
    padding: 20px;
    border-radius: 8px;
    background-color: #252526; /* Content area background */
    min-height: 300px; /* Minimum height for content area */
  }

  .bento-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 10px;
  }

  .folder-item {
    padding: 10px;
    background-color: #333333; /* Folder item background */
    border-radius: 5px;
    text-align: center;
  }

  textarea {
    width: 100%;
    height: calc(100vh - 200px); /* Adjust height for code editor */
    background-color: #1e1e1e; /* Match VS Code theme */
    color: #ffffff; /* Text color */
    border: none; /* No border */
    resize: none; /* Disable resize */
    padding: 10px; /* Padding for textarea */
    font-family: 'Courier New', Courier, monospace; /* Monospace font for code */
}
`;

// Append styles to the document head
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

const AutomationPage = () => {
   const { data: session } = useSession(); 
   const { automation_name  } = useParams(); 
   const [activeTab, setActiveTab] = useState('code');

   useEffect(() => {
       if (!session) {
           return <> <Modal isOpen={true}  /> </>
       }
   }, [session]);

   

   return (
       <div className="container">
           <Head>
               <title>Automating {automation_name}</title>
           </Head>

           <h1>Automating {automation_name}</h1>


           <div className="tabs">
               <button 
                   className={`tab ${activeTab === 'code' ? 'active-tab' : ''}`} 
                   onClick={() => handleTabClick('code')}
               >
                   Code
               </button>
               <button 
                   className={`tab ${activeTab === 'plan' ? 'active-tab' : ''}`} 
                   onClick={() => handleTabClick('plan')}
               >
                   Plan
               </button>
           </div>

           <div className="content">
               {activeTab === 'code' && (
                   <textarea defaultValue="// Write your code here..." />
               )}
               {activeTab === 'plan' && (
                   <div className="bento-grid">
                       {/* Example folder structure */}
                       {['src', 'components', 'utils', 'assets', 'styles', 'tests'].map((folder) => (
                           <div key={folder} className="folder-item">
                               {folder}
                           </div>
                       ))}
                   </div>
               )}
           </div>

       </div>
   );
};

export default AutomationPage;

