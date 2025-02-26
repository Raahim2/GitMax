"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Modal from "@/components/dashboard/signinModal";
import { FaGithub, FaCode, FaList, FaBell, FaCog } from "react-icons/fa";
import CodeTab from "@/components/automation/codetab";
import PlanTab from "@/components/automation/plantab";
import NotificationTab from "@/components/automation/notificationtab";
import SettingsTab from "@/components/automation/settingstab";

const AutomationPage = () => {
  const { data: session } = useSession();
  const { automation_name } = useParams();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tab, setTab] = useState("code");

  const styles = {
    container: {
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
      background: '#ffffff',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
    },
    navbar: {
      display: 'flex',
      alignItems: 'center',
      padding: '16px',
      background: '#ffffff',
      borderBottom: '1px solid #e1e4e8',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    logoSection: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
    },
    usernameSection: {
      fontWeight: 600,
      color: '#24292e',
      cursor: 'pointer',
    },
    tabs: {
      display: 'flex',
      gap: '12px',
      flexGrow: 1,
      justifyContent: 'center',
    },
    tab: {
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      padding: '8px 12px',
      cursor: 'pointer',
      fontSize: '14px',
      background: 'none',
      border: 'none',
      color: '#24292e',
      position: 'relative',
    },
    tabActive: {
      fontWeight: 'bold',
      color: '#fd8c73',
    },
    countBadge: {
      background: '#eaeaeb',
      borderRadius: '12px',
      padding: '2px 6px',
      fontSize: '12px',
    },
    mainContent: {
      flex: 1,
      width: '100%',
      maxWidth: '1200px',
      margin: '0 auto',
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
          {["code", "plan", "notifications", "settings"].map((item) => (
            <button
              key={item}
              style={{
                ...styles.tab,
                ...(tab === item ? styles.tabActive : {}),
              }}
              onClick={() => setTab(item)}
            >
              {item === "code" && <FaCode />} 
              {item === "plan" && <FaList />}
              {item === "notifications" && <FaBell />}
              {item === "settings" && <FaCog />}
              {item.charAt(0).toUpperCase() + item.slice(1)}
              {item === "plan" && <span style={styles.countBadge}>7</span>}
            </button>
          ))}
        </div>
      </nav>

      <main style={styles.mainContent}>
        {tab === "code" && <CodeTab session={session} reponame={automation_name} />}
        {tab === "plan" && <PlanTab />}
        {tab === "notifications" && <NotificationTab session={session} />}
        {tab === "settings" && <SettingsTab session={session}/>}
      </main>
    </div>
  );
};

export default AutomationPage;