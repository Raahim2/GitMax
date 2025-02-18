"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Sidebar from "@/components/dashboard/sidebar";
import NavBar from "@/components/dashboard/navbar";
import MobileBar from "@/components/dashboard/mobilebar";
import "@/styles/dashboard.css";

export default function FollowersPage() {
  const { username } = useParams();
  const githubToken = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
  const [isSidebarContentVisible, setIsSidebarContentVisible] = useState(true);
  const [followers, setFollowers] = useState([]);
  const router = useRouter();

  const toggleSidebarContent = () => {
    setIsSidebarContentVisible((prev) => !prev);
    console.log("Sidebar visibility toggled:", !isSidebarContentVisible);
  };

  // Fetch followers when component mounts
  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${username}/followers`, {
          headers: {
            Authorization: `token ${githubToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch followers");
        }

        const data = await response.json();
        setFollowers(data);
      } catch (error) {
        console.error("Error fetching followers:", error);
      }
    };

    fetchFollowers();
  }, [username, githubToken]);

  // Redirect to the follower's GitHub profile
  const handleViewProfile = (followerUsername) => {
    router.push(`/${followerUsername}`);
  };

  // CSS as JS object
  const styles = {
    followersGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
      gap: "20px",
      marginTop: "20px",
    },
    followerCard: {
      backgroundColor: "#fff",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      textAlign: "center",
      padding: "20px",
      transition: "transform 0.2s ease-in-out",
    },
    followerCardHover: {
      transform: "translateY(-10px)",
    },
    followerAvatar: {
      width: "100px",
      height: "100px",
      borderRadius: "50%",
      objectFit: "cover",
      marginBottom: "10px",
    },
    viewBtn: {
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      padding: "10px 20px",
      borderRadius: "5px",
      cursor: "pointer",
      marginTop: "10px",
      transition: "background-color 0.3s",
    },
    viewBtnHover: {
      backgroundColor: "#0056b3",
    },
  };

  return (
    <div>
      <Sidebar highlight="Profile" username={username} className={isSidebarContentVisible ? "sidebar-content" : ""} />
      <NavBar username={username} githubToken={githubToken} />
      <MobileBar username={username} toggleSidebarContent={toggleSidebarContent} />
      
      <div className="dashboard-content">
        <div className="dashboard-container">
          <h1>Followers of {username}</h1>
          <div style={styles.followersGrid}>
            {followers.map((follower) => (
              <div key={follower.id} style={styles.followerCard}>
                <img
                  src={follower.avatar_url}
                  alt={follower.login}
                  style={styles.followerAvatar}
                />
                <h3>{follower.login}</h3>
                <button
                  onClick={() => handleViewProfile(follower.login)}
                  style={styles.viewBtn}
                  onMouseEnter={(e) => (e.target.style.backgroundColor = styles.viewBtnHover.backgroundColor)}
                  onMouseLeave={(e) => (e.target.style.backgroundColor = styles.viewBtn.backgroundColor)}
                >
                  View Profile
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
