"use client";

import React, { useState, useEffect } from "react";
import InfoCard from "./infocard";

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

        // Fetch user profile
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

        // Loop through repositories and calculate stars, forks, size, and lines of code
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
      <InfoCard
        caption="Followers"
        value={profileData.followers}
        logo="https://assets.website-files.com/6057ab51530cb39d3fdac75d/605882d03baf8a2d544bd28f_dollar-sign.svg"
      />
      <InfoCard
        caption="Repositories"
        value={repos.length}
        logo="https://assets.website-files.com/6057ab51530cb39d3fdac75d/605882d03baf8a2d544bd28f_dollar-sign.svg"
      />
      <InfoCard
        caption="Stars"
        value={totalStars}
        logo="https://assets.website-files.com/6057ab51530cb39d3fdac75d/605882d03baf8a2d544bd28f_dollar-sign.svg"
      />
      <InfoCard
        caption="Fork"
        value={totalForks}
        logo="https://assets.website-files.com/6057ab51530cb39d3fdac75d/605882d03baf8a2d544bd28f_dollar-sign.svg"
      />
      <InfoCard
        caption="Code Data"
        value={totalSize + " MB"}
        logo="https://assets.website-files.com/6057ab51530cb39d3fdac75d/605882d03baf8a2d544bd28f_dollar-sign.svg"
      />
      <InfoCard
        caption="Lines Of Code"
        value={totalLines + " Lines"}
        logo="https://assets.website-files.com/6057ab51530cb39d3fdac75d/605882d03baf8a2d544bd28f_dollar-sign.svg"
      />
    </div>
  );
};

export default InfoGrid;
