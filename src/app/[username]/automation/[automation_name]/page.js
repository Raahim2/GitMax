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

  useEffect(() => {
    if (!session) {
      setIsModalOpen(true);
    }
  }, [session]);

  if (!session) {
    return <Modal isOpen={isModalOpen} onClose={router.back} />;
  }

  return (
    <div className="container">
      <nav className="navbar">
        <div className="logo-section">
          <FaGithub size={32} />
          <div className="username-section">
            {session.user.username}/{automation_name}
          </div>
        </div>

        <div className="tabs">
          {["code", "plan", "notifications", "settings"].map((item) => (
            <button key={item} className={`tab ${tab === item ? "active" : ""}`} onClick={() => setTab(item)}>
              {item === "code" && <FaCode />} 
              {item === "plan" && <FaList />}
              {item === "notifications" && <FaBell />}
              {item === "settings" && <FaCog />}
              {item.charAt(0).toUpperCase() + item.slice(1)}
              {item === "plan" && <span className="count-badge">7</span>}
            </button>
          ))}
        </div>

        {/* <div className="right-section">
          <button className="icon-button">
            <FaBell size={20} />
          </button>
          <button className="icon-button">
            <FaCog size={20} />
          </button>
        </div> */}
      </nav>

      <main className="main-content">
        {tab === "code" && <CodeTab session={session} reponame={automation_name} />}
        {tab === "plan" && <PlanTab />}
        {tab === "notifications" && <NotificationTab session={session} />}
        {tab === "settings" && <SettingsTab />}
      </main>

      <style jsx>{`
        .container {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
          background: #ffffff;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }
        
        .navbar {
          display: flex;
          align-items: center;
          padding: 16px;
          background: #ffffff;
          border-bottom: 1px solid #e1e4e8;
          position: sticky;
          top: 0;
          z-index: 100;
          flex-wrap: wrap;
          justify-content: space-between;
        }
        
        .logo-section {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        
        .username-section {
          font-weight: 600;
          color: #24292e;
          cursor: pointer;
        }

        .tabs {
          display: flex;
          gap: 12px;
          flex-grow: 1;
          justify-content: center;
        }

        .tab {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 12px;
          cursor: pointer;
          font-size: 14px;
          background: none;
          border: none;
          color: #24292e;
          position: relative;
        }

        .tab.active {
          font-weight: bold;
          color: #fd8c73;
        }

        .tab.active::after {
          content: "";
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 100%;
          height: 2px;
          background: #fd8c73;
        }

        .count-badge {
          background: #eaeaeb;
          border-radius: 12px;
          padding: 2px 6px;
          font-size: 12px;
        }

        .right-section {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .icon-button {
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
        }

        .main-content {
          flex: 1;
          width: 100%;
          maxWidth: 1200px;
          margin: 0 auto;
        }

        @media (maxWidth: 768px) {
          .navbar {
            flex-direction: column;
            gap: 12px;
          }

          .tabs {
            flex-wrap: wrap;
            justify-content: center;
          }

          .tab {
            font-size: 12px;
            padding: 6px 8px;
          }

          .right-section {
            gap: 8px;
          }
        }
      `}</style>
    </div>
  );
};

export default AutomationPage;
