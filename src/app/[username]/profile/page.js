"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import React from "react";
import Sidebar from "@/components/sidebar";
import NavBar from "@/components/navbar";
import MobileBar from "@/components/mobilebar";
import "@/styles/dashboard.css";

export default function ProfilePage() {
  const { username } = useParams(); // Get the dynamic username from the URL
  const [profileImage, setProfileImage] = useState(""); // State for profile image URL
  const [readmeContent, setReadmeContent] = useState(""); // State for README content
  const [noReadme, setNoReadme] = useState(false); // Flag for no README found
  const githubToken = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

  // Fetch user profile information
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Fetch user profile data
        const response = await fetch(`https://api.github.com/users/${username}`, {
          headers: {
            Authorization: `token ${githubToken}`,
          },
        });
        const data = await response.json();
        if (data.avatar_url) {
          setProfileImage(data.avatar_url); // Set profile image URL
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    // Fetch profile README
    const fetchReadme = async () => {
      try {
        // Check if there's a repository named the same as the username
        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos`, {
          headers: {
            Authorization: `token ${githubToken}`,
          },
        });
        const reposData = await reposResponse.json();
        
        // Find the repository with the same name as the username
        const userRepo = reposData.find((repo) => repo.name === username);

        if (userRepo) {
          // Fetch the README file from the user's repository
          const readmeResponse = await fetch(`https://api.github.com/repos/${username}/${username}/readme`, {
            headers: {
              Authorization: `token ${githubToken}`,
            },
          });
          const readmeData = await readmeResponse.json();
          if (readmeData.content) {
            const decodedContent = atob(readmeData.content); // Decode base64 content
            setReadmeContent(decodedContent); // Set README content
          } else {
            setNoReadme(true); // If no README found in the user's profile repo
          }
        } else {
          setNoReadme(true); // If no repository with the same name as the username exists
        }
      } catch (error) {
        console.error("Error fetching README data:", error);
      }
    };

    if (username) {
      fetchProfile(); // Fetch profile data
      fetchReadme(); // Fetch README data
    }
  }, [username, githubToken]);

  return (
    <div>
      <Sidebar highlight="Profile" username={username} />
      <NavBar username={username} logo={profileImage} /> {/* Pass profileImage to NavBar */}
      <MobileBar />

      <div className="dashboard-content">
        <div className="dashboard-container">
          <h2>User Profile README</h2>
          <div>
            {/* Display the README content or message if not found */}
            {noReadme ? (
              <p>No README available</p>
            ) : (
              <pre>{readmeContent}</pre> // Display the README content
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
