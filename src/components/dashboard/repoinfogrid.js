"use client";

import React, { useState, useEffect } from "react";
import InfoCard from "./infocard";

const RepoInfoGrid = ({ username, repoName , githubToken }) => {
  const [repoStats, setRepoStats] = useState({
    loc: "Loading...", // Lines of Code
    size: "Loading...", // Repository Size
    stars: "Loading...", // Stars
    forks: "Loading...", // Forks
  });

  useEffect(() => {
    const fetchRepoStats = async () => {
      try {
        const headers = {
          Authorization: `Bearer ${githubToken}`,
        };

        // Fetch the specific repository data
        const repoResponse = await fetch(
          `https://api.github.com/repos/${username}/${repoName}`,
          { headers }
        );
        const repoData = await repoResponse.json();

        if (repoData.message === "Not Found") {
          console.error("Repository not found.");
          return;
        }

        // Fetch the languages used in the repository
        const languagesResponse = await fetch(
          `https://api.github.com/repos/${username}/${repoName}/languages`,
          { headers }
        );
        const languagesData = await languagesResponse.json();

        // Calculate total lines of code from language data
        const totalLOC = Object.values(languagesData).reduce((sum, lines) => sum + lines, 0);

        // Initialize stats
        const totalSize = repoData.size || 0; // Size in KB
        const totalStars = repoData.stargazers_count || 0;
        const totalForks = repoData.forks_count || 0;

        // Update state
        setRepoStats({
          loc: `${totalLOC.toLocaleString()} Lines`,
          size: `${(totalSize / 1024).toFixed(2)} MB`, // Convert KB to MB
          stars: totalStars.toLocaleString(),
          forks: totalForks.toLocaleString(),
        });
      } catch (error) {
        console.error("Error fetching GitHub data:", error);
      }
    };

    // Only fetch data if both username and repoName are provided
    if (username && repoName) {
      fetchRepoStats();
    }
  }, [username, repoName, githubToken]);

  return (
    <div className="w-layout-grid _4-grid">
      <InfoCard
        caption="Lines Of Code"
        value={repoStats.loc}
        logo="https://assets.website-files.com/6057ab51530cb39d3fdac75d/605882d03baf8a2d544bd28f_code.svg"
      />
      <InfoCard
        caption="Code Data"
        value={repoStats.size}
        logo="https://assets.website-files.com/6057ab51530cb39d3fdac75d/605882d03baf8a2d544bd28f_code.svg"
      />
      <InfoCard
        caption="Stars"
        value={repoStats.stars}
        logo="https://assets.website-files.com/6057ab51530cb39d3fdac75d/605882d03baf8a2d544bd28f_star.svg"
      />
      <InfoCard
        caption="Fork"
        value={repoStats.forks}
        logo="https://assets.website-files.com/6057ab51530cb39d3fdac75d/605882d03baf8a2d544bd28f_dollar-sign.svg"
      />
    </div>
  );
};

export default RepoInfoGrid;
