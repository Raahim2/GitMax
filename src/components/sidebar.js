"use client";

import Link from "next/link";

export default function Sidebar({ highlight, username }) {
  const links = [
    { name: "Dashboard", icon: "https://assets.website-files.com/6057ab51530cb39d3fdac75d/6058703e748ec21a46ed3b4e_Account.svg" },
    { name: "Projects", icon: "https://assets.website-files.com/6057ab51530cb39d3fdac75d/6058703e233c35f06d95eeab_Projects.svg" },
    { name: "Profile", icon: "https://assets.website-files.com/6057ab51530cb39d3fdac75d/6058703e3a273545cf97d31b_Profile.svg" },
    // { name: "Team", icon: "https://assets.website-files.com/6057ab51530cb39d3fdac75d/6058703e101182eaf273ae92_Team.svg" },
    // { name: "Orders", icon: "https://assets.website-files.com/6057ab51530cb39d3fdac75d/605882dc6380b2ff7a6e9171_shopping-cart.svg" },
    // { name: "Account", icon: "https://assets.website-files.com/6057ab51530cb39d3fdac75d/605882df8063b970ea883ad9_toggle-left.svg" },
    // { name: "Authentication", icon: "https://assets.website-files.com/6057ab51530cb39d3fdac75d/605882e02b9b3466f904de5b_unlock.svg" }
  ];

  return (
    <div className="sidebar-content">
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
          href={link.name === "Dashboard" ? `/${username}` : `/${username}/${link.name.toLowerCase()}`}  // Special case for Dashboard
          className="nav-link w-inline-block"
          style={{
            color: link.name === highlight ? "#763FF9" : "inherit", // Apply color to text if highlighted
            backgroundColor: link.name === highlight ? "rgba(118, 63, 249, 0.2)" : "inherit", // Add subtle background highlight
          }}
        >
          <img
            src={link.icon}
            loading="lazy"
            alt={link.name}
            className="nav-icon"
            style={{
              filter: link.name === highlight ? "invert(100%) sepia(100%) saturate(3252%) hue-rotate(223deg) brightness(99%) contrast(104%)" : "none", // Apply color change to icon
            }}
          />
          <div style={{ color: link.name === highlight ? "#763FF9" : "inherit" }}>{link.name}</div> {/* Apply color to text */}
        </Link>
      ))}
    </div>
  );
}
