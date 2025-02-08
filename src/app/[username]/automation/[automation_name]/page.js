"use client";
import React, { useState, useEffect } from 'react';
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import Modal from '@/components/dashboard/signinModal';
import { useRouter } from 'next/navigation';

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
    height: 'calc(100vh - 200px)',
    backgroundColor: '#1e1e1e',
    color: '#ffffff',
    border: 'none',
    resize: 'none',
    padding: '10px',
    fontFamily: "'Courier New', Courier, monospace",
  },
};

const AutomationPage = () => {
  const { data: session } = useSession();
  const { automation_name } = useParams();
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!session) {
      setIsModalOpen(true);
    }
  }, [session]);

  
  

  if (!session) {
    return <Modal isOpen={isModalOpen} onClose={router.back} />;
  }

  return (
    <div style={styles.container}>
      

        {automation_name}
    </div>
  );
};

export default AutomationPage;
