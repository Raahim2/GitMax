"use client";
import React, { useState, useEffect } from 'react';
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import Modal from '@/components/dashboard/signinModal';
import { useRouter } from 'next/navigation';
import { FaGithub, FaCode, FaList, FaBell, FaCog } from "react-icons/fa";
import CodeTab from '@/components/automation/codetab';
import PlanTab from '@/components/automation/plantab';
import NotificationTab from '@/components/automation/notificationtab';
import SettingsTab from '@/components/automation/settingstab';

const AutomationPage = () => {
  const { data: session } = useSession();
  const { automation_name } = useParams();
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tab, setTab] = useState("code");

  const styles = {
    container: {
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
      background: "#ffffff",
      minHeight: "100vh",
    },
    navbar: {
      display: "flex",
      alignItems: "center",
      padding: "16px 32px",
      background: "#ffffff",
      borderBottom: "1px solid #e1e4e8",
      position: "sticky",
      top: 0,
      zIndex: 100,
    },
    logoSection: {
      display: "flex",
      alignItems: "center",
      gap: "16px",
      marginRight: "32px",
    },
    usernameSection: {
      display: "flex",
      alignItems: "center",
      gap: "4px",
      cursor: "pointer",
      color: "#24292e",
      fontWeight: 600,
    },
    tabs: {
      display: "flex",
      gap: "16px",
      marginLeft: "32px",
      flexGrow: 1,
    },
    tab: {
      display: "flex",
      alignItems: "center",
      gap: "6px",
      padding: "8px 0",
      cursor: "pointer",
      color: "#24292e",
      background: "none",
      border: "none",
      fontSize: "14px",
      position: "relative",
      textDecoration: "none", 
      color: "#24292e", 
    },
    tabActive: { 
      position: "absolute",
      bottom: 0,
      left: 0,
      width: "100%",
      height: "2px",
      background: "#fd8c73",
    },
    countBadge: {
      background: "#eaeaeb",
      borderRadius: "20px",
      padding: "2px 6px",
      fontSize: "12px",
    },
    rightSection: {
      display: "flex",
      alignItems: "center",
      gap: "16px",
      marginLeft: "auto",
    },
    iconButton: {
      background: "none",
      border: "none",
      cursor: "pointer",
      color: "#24292e",
      padding: "8px",
    },
    mainContent: {
      flex: 1, // Take up remaining vertical space
      maxWidth: "100vw", // Take the full width
      margin: "0 auto",
    },
  };

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
      <nav style={styles.navbar}>
        <div style={styles.logoSection}>
          <FaGithub size={32} />
          <div style={styles.usernameSection}>
            {session.user.username}/{automation_name}
          </div>
        </div>

        <div style={styles.tabs}>
          <button
            style={styles.tab}
            onClick={() => setTab("code")}
          >
            <FaCode/> Code
            {tab === "code" && <span style={styles.tabActive}></span>}
          </button>
          <button
            style={styles.tab}
            onClick={() => setTab("plan")}
          >
            <FaList /> Plan <span style={styles.countBadge}>7</span>
            {tab === "plan" && <span style={styles.tabActive}></span>}
          </button>
          <button
            style={styles.tab}
            onClick={() => setTab("notifications")}
          >
            <FaBell /> Notifications
            {tab === "notifications" && <span style={styles.tabActive}></span>}
          </button>
          <button
            style={styles.tab}
            onClick={() => setTab("settings")}
          >
            <FaCog /> Settings
            {tab === "settings" && <span style={styles.tabActive}></span>}
          </button>
        </div>

        <div style={styles.rightSection}>
          <button style={styles.iconButton}>
            <FaBell size={20} />
          </button>
          {/* Removed Plus Icon, as per instructions */}
          <button style={styles.iconButton}>
            <FaCog size={20} />
          </button>
        </div>
      </nav>

      <main style={styles.mainContent}>
        {tab === "code" && <CodeTab session={session} reponame={automation_name}/>}
        {tab === "plan" && <PlanTab />}
        {tab === "notifications" && <NotificationTab session={session}/>}
        {tab === "settings" && <SettingsTab />}
      </main>
    </div>
  );
};

export default AutomationPage;
