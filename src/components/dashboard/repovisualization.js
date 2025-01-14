"use client";

import React, { useEffect, useState } from "react";
import { Chart, Pie, Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement
);

const RepoVisualization = ({ username, repoName , githubToken }) => {

  const [languageData, setLanguageData] = useState({});
  const [commitData, setCommitData] = useState([]);
  const [starData, setStarData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = {
          Authorization: `Bearer ${githubToken}`,
        };

        // Fetch programming language distribution
        const languageResponse = await fetch(
          `https://api.github.com/repos/${username}/${repoName}/languages`,
          { headers }
        );
        const languages = await languageResponse.json();
        setLanguageData(languages);

        // Fetch commit activity
        const commitResponse = await fetch(
          `https://api.github.com/repos/${username}/${repoName}/stats/commit_activity`,
          { headers }
        );
        const commits = await commitResponse.json();

        // Ensure commit data is an array
        setCommitData(Array.isArray(commits) ? commits : []);

        // Fetch star growth (stub for demo purposes)
        const stars = Array.from({ length: 12 }, (_, i) => ({
          month: `Month ${i + 1}`,
          stars: Math.floor(Math.random() * 100),
        }));
        setStarData(stars);
      } catch (error) {
        console.error("Error fetching GitHub data:", error);
      }
    };

    fetchData();
  }, [username, repoName, githubToken]);

  // Data for charts
  const languageChartData = {
    labels: Object.keys(languageData),
    datasets: [
      {
        label: "Languages",
        data: Object.values(languageData),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
      },
    ],
  };

  const commitChartData = {
    labels: commitData.length
      ? commitData.map((_, idx) => `Week ${idx + 1}`)
      : ["No data"],
    datasets: [
      {
        label: "Commits",
        data: commitData.length ? commitData.map((item) => item.total) : [0],
        fill: false,
        borderColor: "#36A2EB",
        tension: 0.1,
      },
    ],
  };

  const starChartData = {
    labels: starData.map((item) => item.month),
    datasets: [
      {
        label: "Stars",
        data: starData.map((item) => item.stars),
        backgroundColor: "#FF6384",
      },
    ],
  };

  return (
    <div className="w-layout-grid _3-grid">
      {/* Programming Language Distribution */}
      <div className="module">
        <h4>Programming Language Distribution</h4>
        <Pie data={languageChartData} />
      </div>

      {/* Commit Activity */}
      <div className="module">
        <h4>Commit Activity</h4>
        {commitData.length > 0 ? (
          <Line data={commitChartData} />
        ) : (
          <p>No commit activity available.</p>
        )}
      </div>

      {/* Star Growth */}
      <div className="module">
        <h4>Star Growth</h4>
        <Bar data={starChartData} />
      </div>
    </div>
  );
};

export default RepoVisualization;
