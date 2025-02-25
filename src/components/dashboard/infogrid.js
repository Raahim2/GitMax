"use client";

import React, { useState, useEffect } from "react";
import InfoCard from "./infocard";
import Link from "next/link";

const InfoGrid = ({ username  , githubToken}) => {
  const [profileData, setProfileData] = useState(null);
  const [repos, setRepos] = useState([]);
  const [totalStars, setTotalStars] = useState(0);
  const [totalForks, setTotalForks] = useState(0);
  const [totalSize, setTotalSize] = useState(0);
  const [totalLines, setTotalLines] = useState(0);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const headers = {
          Authorization: `Bearer ${githubToken}`,
        };

        const profileResponse = await fetch(`https://api.github.com/users/${username}`, { headers });
        const profileData = await profileResponse.json();
        setProfileData(profileData);

        // Fetch repositories
        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos`, { headers });
        const reposData = await reposResponse.json();
        setRepos(reposData);

        // Initialize variables
        let stars = 0;
        let forks = 0;
        let size = 0;
        let lines = 0;

        reposData.forEach((repo) => {
          stars += repo.stargazers_count;
          forks += repo.forks_count;
          size += repo.size;
          lines += repo.size; // Placeholder for lines of code, might need additional API calls for detailed lines count
        });

        // Update state
        setTotalStars(stars);
        setTotalForks(forks);
        setTotalSize((size / 1024).toFixed(2)); // Convert size from KB to MB
        setTotalLines(lines); // Assuming lines are approximated by repo size for now
      } catch (error) {
        console.error("Error fetching GitHub profile or repositories:", error);
      }
    };

    fetchProfileData();
  }, [username, githubToken]);

  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-layout-grid _2-grid">
      <Link href={`/${username}/followers`}>
      <InfoCard
        caption="Followers"
        value={profileData.followers}
      />
      </Link>
      
      <Link href={`/${username}/projects`}>
      <InfoCard
        caption="Repositories"
        value={repos.length}
      />
      </Link>


      <InfoCard
        caption="Stars"
        value={totalStars}
      />
      <InfoCard
        caption="Fork"
        value={totalForks}
      />
      <InfoCard
        caption="Code Data"
        value={totalSize + " MB"}
      />
      <InfoCard
        caption="Lines Of Code"
        value={totalLines + " Lines"}
      />
    </div>
  );
};

export default InfoGrid;
