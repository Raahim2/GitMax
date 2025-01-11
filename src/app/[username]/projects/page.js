"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import React from "react";
import Sidebar from "@/components/sidebar";
import NavBar from "@/components/navbar";
import MobileBar from "@/components/mobilebar";
import "@/styles/dashboard.css";

export default function ProjectPage() {
  const { username } = useParams(); // Get the dynamic username from the URL
  const [profileImage, setProfileImage] = useState(""); // State for profile image URL

  const githubToken = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

  // Fetch user profile information
  useEffect(() => {
    const fetchProfile = async () => {
      try {
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

    if (username) {
      fetchProfile(); // Fetch profile when username is available
    }
  }, [username, githubToken]);

  return (
    <div>
      <Sidebar highlight="Projects" username={username} />
      <NavBar username={username} logo={profileImage} /> {/* Pass profileImage to NavBar */}
      <MobileBar />
    </div>
  );
}
