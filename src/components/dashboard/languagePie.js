"use client";

import { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

export default function LanguagePie({ username , githubToken }) {
  const [languageStats, setLanguageStats] = useState([]);

  // Fetch the programming language statistics for the user
  useEffect(() => {
    const fetchLanguageStats = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${username}/repos`, {
          headers: {
            Authorization: `token ${githubToken}`,
          },
        });
        const repos = await response.json();
        
        // Calculate the language statistics
        const languageCount = {};
        for (const repo of repos) {
          if (repo.language) {
            languageCount[repo.language] = (languageCount[repo.language] || 0) + 1;
          }
        }

        // Create an array of language statistics
        const stats = Object.entries(languageCount).map(([language, count]) => ({
          language,
          percentage: ((count / repos.length) * 100).toFixed(2),
        }));

        setLanguageStats(stats); // Set the language statistics
      } catch (error) {
        console.error("Error fetching language data:", error);
      }
    };

    if (username) {
      fetchLanguageStats(); // Fetch language stats when username is available
    }
  }, [username, githubToken]);

  // If languageStats is empty or invalid, display a message
  if (!languageStats || !Array.isArray(languageStats) || languageStats.length === 0) {
    return (
      <div className="module">
        <div className="card-header">
          <h4>Programming Languages</h4>
        </div>
        <p>No language data available.</p>
      </div>
    );
  }

  // Extract data and labels from languageStats
  const labels = languageStats.map(item => item.language);
  const data = languageStats.map(item => parseFloat(item.percentage));

  // Data for the Pie chart
  const chartData = {
    labels: labels, // Labels for the chart
    datasets: [
      {
        data: data, // Data for each language percentage
        backgroundColor: [
          "#36A2EB", "#FF9F40", "#4CAF50", "#FFCD56", "#FF5733", "#C70039",
          "#900C3F", "#581845", "#2E8B57", "#FF8C00"  // Colors for each section of the pie
        ],
        hoverBackgroundColor: [
          "#36A2EB", "#FF9F40", "#4CAF50", "#FFCD56", "#FF5733", "#C70039",
          "#900C3F", "#581845", "#2E8B57", "#FF8C00"  // Hover colors
        ],
      },
    ],
  };

  return (
    <div className="module">
      <div className="card-header">
        <h4>Programming Languages</h4>
      </div>
      <div style={{ width: '250px', height: '250px', margin: 'auto' }}>
        <Pie data={chartData} />
      </div>
    </div>
  );
}
