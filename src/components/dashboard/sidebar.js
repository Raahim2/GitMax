"use client";

import Link from "next/link";
import { FaHome, FaProjectDiagram, FaUser, FaCog } from "react-icons/fa"; // Import necessary Font Awesome icons

export default function Sidebar({ highlight, username, className }) {
  const links = [
    { name: "Dashboard", icon: <FaHome size={24} style={{marginRight:20}}/> }, // Home icon for Dashboard
    { name: "Projects", icon: <FaProjectDiagram size={24} style={{marginRight:20}}/> }, // Project diagram icon for Projects
    { name: "Profile", icon: <FaUser size={24} style={{marginRight:20}}/> }, // User icon for Profile
    { name: "Automation", icon: <FaCog size={24} style={{marginRight:20}}/> }, // Cog icon for Automation
  ];

  return (
    <div className={className}>
      <div className="sidebar-logo-wrapper">
        <Link href="#">
          <img
            src="https://assets.website-files.com/6057ab51530cb39d3fdac75d/60586883ea59be120545c340_Dash%20Logo.svg"
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
            {link.icon} {/* Render the Font Awesome icon directly */}
          </span>
          <div style={{ color: link.name === highlight ? "#763FF9" : "inherit" }}>{link.name}</div>
        </Link>
      ))}
    </div>
  );
}
