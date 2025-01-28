"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function NavBar({ username, githubToken }) {
  const [logo, setLogo] = useState(null);

  useEffect(() => {
    const fetchUserLogo = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${username}`, {
          headers: {
            Authorization: `token ${githubToken}`,
          },
        });
        const data = await response.json();
        if (data.avatar_url) {
          setLogo(data.avatar_url); // Set the logo URL
        }
      } catch (error) {
        console.error("Error fetching GitHub user data:", error);
      }
    };

    if (username) {
      fetchUserLogo();
    }
  }, [username]);

  if (!logo) {
    return <div>Loading...</div>; // Show loading message until logo is fetched
  }

  const currentUrl = window.location.href;
  const urlSegments = currentUrl
    .replace(/^https?:\/\//, '') // Remove protocol
    .replace(/^(gitmax\.vercel\.app|localhost)(:\d+)?\//, '') // Remove domain and port if present
    .split('/')
    

  return (
    <>
      <div className="dashboard-banner">
        <div className="dashboard-banner-header">
          <div className="breadcrumb-wrapper">
            {urlSegments.map((segment, index) => (
              <div className="breadcrumb-item" key={index}>
                <div className="breadcrumb-text">{segment}</div>
                {index < urlSegments.length - 1 && (
                  <img
                    src="https://assets.website-files.com/6057ab51530cb39d3fdac75d/618291022450e8b448680ed1_chevron-right.svg"
                    loading="lazy"
                    alt=""
                    className="breacrumb-chevron"
                  />
                )}
              </div>
            ))}
          </div>
          <div className="header-content">
            <Link href={`https://github.com/${username}`} className="banner-avatar-wrapper w-inline-block" target="_blank">
              <img
                src={logo} // Dynamically fetched logo
                loading="lazy"
                alt="User Avatar"
                className="banner-avatar-image"
              />
              <div>
                <h5 className="banner-avatar-name">{username}</h5>
                <div className="banner-avatar-caption">View on Github</div>
              </div>
            </Link>
          </div>
        </div>
        
      </div>
    </>
  );
}
