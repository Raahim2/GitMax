"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import React from "react";
import Sidebar from "@/components/dashboard/sidebar";
import NavBar from "@/components/dashboard/navbar";
import MobileBar from "@/components/dashboard/mobilebar";
import "@/styles/dashboard.css";

export default function ProfilePage() {
  const { username } = useParams();
  const githubToken = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
  const [isSidebarContentVisible, setIsSidebarContentVisible] = useState(true); // State to manage sidebar content class
  const [userData, setUserData] = useState(null); // State to hold user data
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to manage error state

  const toggleSidebarContent = () => {
    setIsSidebarContentVisible((prev) => !prev); // Toggle sidebar content class
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${username}`, {
          headers: {
            Authorization: `token ${githubToken}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        setUserData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [username, githubToken]);

  return (
    <div>
      <Sidebar highlight="Profile" username={username} className={isSidebarContentVisible ? "sidebar-content" : ""} />
      <NavBar username={username} githubToken={githubToken} />
      <MobileBar toggleSidebarContent={toggleSidebarContent}/>
      <div className="dashboard-content">
        <div className="dashboard-container">
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error}</p>}
          {userData && (
            <div className="profile-info">
              <img src={userData.avatar_url} alt={`${userData.login}'s avatar`} className="profile-avatar" />
              <h2>{userData.name || userData.login}</h2>
              <p>{userData.bio}</p>
              <p><strong>Location:</strong> {userData.location || 'Not specified'}</p>
              <p><strong>Followers:</strong> {userData.followers}</p>
              <p><strong>Following:</strong> {userData.following}</p>
              <p><strong>Public Repos:</strong> {userData.public_repos}</p>
              <a href={userData.html_url} target="_blank" rel="noopener noreferrer">View Profile on GitHub</a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
