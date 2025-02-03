"use client";

import Link from "next/link";
import { FaBars, FaTimes, FaHome, FaProjectDiagram, FaUser, FaCog } from "react-icons/fa"; // Import necessary icons
import { useState } from "react";

export default function MobileBar({ username, toggleSidebarContent }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to track sidebar visibility

  const handleToggle = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar state
    toggleSidebarContent(); // Call the function to toggle sidebar content className
  };

  return (
    <div className="mobile-bar">
      <div className="mobile-bar-menu">
        <Link href={`/${username}/`} className="mobile-bar-link w-inline-block">
          <FaHome size={24} /> {/* Home icon */}
        </Link>
        <Link href={`/${username}/projects`} className="mobile-bar-link w-inline-block">
          <FaProjectDiagram size={24} /> {/* Projects icon */}
        </Link>
        <span onClick={handleToggle} className="mobile-menu-icon w-inline-block" style={{ cursor: 'pointer' }}>
          {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />} {/* Toggle between icons */}
        </span>
        <Link href={`/${username}/profile`} className="mobile-bar-link w-inline-block">
          <FaUser size={24} /> {/* Profile icon */}
        </Link>
        <Link href={`/${username}/automation`} className="mobile-bar-link w-inline-block">
          <FaCog size={24} /> {/* Settings icon */}
        </Link>
      </div>
    </div>
  );
}
