"use client";

import Link from "next/link";
import { FaHome, FaProjectDiagram, FaUser, FaCog, FaSignOutAlt, FaSignInAlt } from "react-icons/fa";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from 'next/navigation'; // Import useRouter for redirection
import { useState } from 'react'; // Import useState for managing modal state
import Modal from '@/components/dashboard/signinModal'; // Import the Modal component

export default function Sidebar({ highlight, username, className }) {
  const { data: session } = useSession(); // Get session data
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  const links = [
    { name: "Dashboard", icon: <FaHome size={24} style={{ marginRight: 20 }} /> },
    { name: "Projects", icon: <FaProjectDiagram size={24} style={{ marginRight: 20 }} /> },
    { name: "Profile", icon: <FaUser size={24} style={{ marginRight: 20 }} /> },
    { name: "Automation", icon: <FaCog size={24} style={{ marginRight: 20 }} />, requiresAuth: true }, // Indicate that this requires authentication
  ];

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' }); // Sign out and redirect to home
  };

  return (
    <div className={className}>
      <div className="sidebar-logo-wrapper">
        <Link href="#">
          <img src="/logo.png" loading="lazy" alt="Logo" className="sidebar-logo" />
        </Link>
      </div>

      {links.map((link) => (
        <div key={link.name}>
          {/* Check if the link requires authentication */}
          <Link
            href={link.requiresAuth && !session ? "#" : (link.name === "Dashboard" ? `/${username}` : `/${username}/${link.name.toLowerCase()}`)}
            className="nav-link w-inline-block"
            onClick={() => {
              if (link.requiresAuth && !session) {
                setIsModalOpen(true); // Open modal if authentication is required and not signed in
              }
            }}
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
        </div>
      ))}

      {/* Conditionally render Sign In or Sign Out button */}
      {session ? (
        <Link
          href="#"
          onClick={handleLogout}
          className="nav-link w-inline-block"
          style={{
            color: "inherit",
            backgroundColor: "inherit",
          }}
        >
          <span style={{ display: 'flex', alignItems: 'center' }}>
            <FaSignOutAlt size={24} style={{ marginRight: 20 }} />
          </span>
          <div>Sign Out</div>
        </Link>
      ) : (
        <Link
          href="#"
          onClick={() => setIsModalOpen(true)} // Open modal for sign-in
          className="nav-link w-inline-block"
          style={{
            color: "inherit",
            backgroundColor: "inherit",
          }}
        >
          <span style={{ display: 'flex', alignItems: 'center' }}>
            <FaSignInAlt size={24} style={{ marginRight: 20 }} />
          </span>
          <div>Sign In</div>
        </Link>
      )}

      {/* Render the Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
