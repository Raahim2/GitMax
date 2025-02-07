"use client";
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import Modal from '@/components/dashboard/signinModal';
import { useRouter } from 'next/navigation';

// Inline Styles as JavaScript Object
const styles = {
  container: {
    maxWidth: '1200px',
    margin: 'auto',
    padding: '20px',
  },
  tabs: {
    display: 'flex',
    borderBottom: '1px solid #444444',
    marginBottom: '20px',
  },
  tab: {
    padding: '10px 20px',
    cursor: 'pointer',
    border: 'none',
    backgroundColor: 'transparent',
    color: '#ffffff',
    transition: 'background-color 0.3s ease',
  },
  tabHover: {
    backgroundColor: '#333333',
  },
  activeTab: {
    borderBottom: '2px solid #007acc',
    fontWeight: 'bold',
  },
  content: {
    padding: '20px',
    borderRadius: '8px',
    backgroundColor: '#252526',
    minHeight: '300px',
  },
  bentoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
    gap: '10px',
  },
  folderItem: {
    padding: '10px',
    backgroundColor: '#333333',
    borderRadius: '5px',
    textAlign: 'center',
  },
  textarea: {
    width: '100%',
    height: 'calc(100vh - 200px)', /* Adjust height for code editor */
    backgroundColor: '#1e1e1e', /* Match VS Code theme */
    color: '#ffffff', /* Text color */
    border: 'none', /* No border */
    resize: 'none', /* Disable resize */
    padding: '10px', /* Padding for textarea */
    fontFamily: "'Courier New', Courier, monospace", /* Monospace font for code */
  },
};

const AutomationPage = () => {
  const { data: session } = useSession();
  const { automation_name } = useParams();
  const [activeTab, setActiveTab] = useState('code');
  const router = useRouter()

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };


  
  return (
    <div style={styles.container}>
      <Head>
        <title>Automating {automation_name}</title>
      </Head>

      <h1>Automating {automation_name}</h1>

      <div style={styles.tabs}>
        <button
          style={activeTab === 'code' ? { ...styles.tab, ...styles.activeTab } : styles.tab}
          onClick={() => handleTabClick('code')}
        >
          Code
        </button>
        <button
          style={activeTab === 'plan' ? { ...styles.tab, ...styles.activeTab } : styles.tab}
          onClick={() => handleTabClick('plan')}
        >
          Plan
        </button>
      </div>

      <div style={styles.content}>
        {activeTab === 'code' && (
          <textarea style={styles.textarea} defaultValue="// Write your code here..." />
        )}
        {activeTab === 'plan' && (
          <div style={styles.bentoGrid}>
            {['src', 'components', 'utils', 'assets', 'styles', 'tests'].map((folder) => (
              <div key={folder} style={styles.folderItem}>
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
