"use client";

import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa"; // Import both icons
import { useState } from "react";

export default function MobileBar({ toggleSidebarContent }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to track sidebar visibility

  const handleToggle = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar state
    toggleSidebarContent(); // Call the function to toggle sidebar content class
  };

  return (
    <div className="mobile-bar">
      <div className="mobile-bar-menu">
        <Link href="#" className="mobile-bar-link w-inline-block">
          <img
            src="https://assets.website-files.com/6057ab51530cb39d3fdac75d/60586b1639502416b88ec95a_home%20(2).svg"
            alt="Home"
          />
        </Link>
        <Link href="#" className="mobile-bar-link w-inline-block">
          <img
            src="https://assets.website-files.com/6057ab51530cb39d3fdac75d/6058703e233c35f06d95eeab_Projects.svg"
            alt="Projects"
          />
        </Link>
        <span onClick={handleToggle} className="mobile-menu-icon w-inline-block" style={{ cursor: 'pointer' }}>
          {isSidebarOpen ? <FaTimes size={30} /> : <FaBars size={30} />} {/* Toggle between icons */}
        </span>
        <Link href="#" className="mobile-bar-link w-inline-block">
          <img
            src="https://assets.website-files.com/6057ab51530cb39d3fdac75d/6058703e3a273545cf97d31b_Profile.svg"
            alt="Profile"
          />
        </Link>
        <Link href="#" className="mobile-bar-link w-inline-block">
          <img
            src="https://assets.website-files.com/6057ab51530cb39d3fdac75d/6058703ecc16b10bf2981896_Settings.svg"
            alt="Settings"
          />
        </Link>
      </div>
    </div>
  );
}
