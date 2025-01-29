"use client";

import Link from "next/link";
import { FaHome, FaProjectDiagram, FaUser, FaCog , FaSignOutAlt} from "react-icons/fa";
import { signOut, useSession } from "next-auth/react"; // Import useSession
import { useRouter } from 'next/navigation'; // Import useRouter for redirection

export default function Sidebar({ highlight, username, className }) {
  const { data: session } = useSession(); // Get session data
  const router = useRouter(); // Initialize router for redirection

  const links = [
    { name: "Dashboard", icon: <FaHome size={24} style={{marginRight:20}}/> },
    { name: "Projects", icon: <FaProjectDiagram size={24} style={{marginRight:20}}/> },
    { name: "Profile", icon: <FaUser size={24} style={{marginRight:20}}/> },
    { name: "Automation", icon: <FaCog size={24} style={{marginRight:20}}/> },
  ];

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' }); // Sign out and redirect to home
  };

  return (
    <div className={className}>
      <div className="sidebar-logo-wrapper">
        <Link href="#">
          <img
            src="/logo.png"
            loading="lazy"
            alt="Logo"
            className="sidebar-logo"
          />
        </Link>
      </div>

      {links.map((link) => (
        <Link
          key={link.name}
          href={link.name === "Dashboard" ? `/${username}` : `/${username}/${link.name.toLowerCase()}`}
          className="nav-link w-inline-block"
          style={{
            color: link.name === highlight ? "#763FF9" : "inherit",
            backgroundColor: link.name === highlight ? "rgba(118, 63, 249, 0.2)" : "inherit",
          }}
        >
          <span style={{ display: 'flex', alignItems: 'center' }}>
            {link.icon}
          </span>
          <div style={{ color: link.name === highlight ? "#763FF9" : "inherit" }}>{link.name}</div>
        </Link>
      ))}

      {/* Conditionally render Logout button */}
      {session && (
        <p onClick={handleLogout} className="nav-link w-inline-block" style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
          <FaSignOutAlt size={24} style={{ marginRight: 20 }} /> {/* Use an icon similar to others */}
          Logout
        </p>
      )}
    </div>
  );
}
