"use client";

import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register necessary components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ username , githubToken }) => {
  const [linesOfCode, setLinesOfCode] = useState([]);

  useEffect(() => {
    const fetchLinesOfCode = async () => {
      try {
        const reposResponse = await fetch(
          `https://api.github.com/users/${username}/repos`,
          {
            headers: {
              Authorization: `token ${githubToken}`,
            },
          }
        );
        const repos = await reposResponse.json();
        const currentMonth = new Date().getMonth();

        // Initialize a map to store lines of code for each month
        const monthlyCodeData = Array(6).fill(0); // For the last 6 months

        // Fetch commit data for each repo
        for (const repo of repos) {
          const commitsResponse = await fetch(
            `https://api.github.com/repos/${username}/${repo.name}/commits`,
            {
              headers: {
                Authorization: `token ${githubToken}`,
              },
            }
          );
          const commits = await commitsResponse.json();

          // Process each commit to calculate lines of code
          commits.forEach((commit) => {
            const commitDate = new Date(commit.commitDate);
            const commitMonth = commitDate.getMonth();
            const commitYear = commitDate.getFullYear();

            // Get the date for the last 6 months
            const now = new Date();
            const sixMonthsAgo = new Date(now);
            sixMonthsAgo.setMonth(now.getMonth() - 6);

            // If the commit is within the last 6 months
            if (commitDate >= sixMonthsAgo) {
              // Calculate the difference in months
              const monthDiff = currentMonth - commitMonth;
              const monthIndex = (monthDiff + 12) % 12;

              // Add lines of code to the respective month
              const additions = commit.stats.additions || 0;
              const deletions = commit.stats.deletions || 0;
              const linesChanged = additions - deletions;

              monthlyCodeData[monthIndex] += linesChanged;
            }
          });
        }

        setLinesOfCode(monthlyCodeData);
      } catch (error) {
        console.error("Error fetching commit data:", error);
      }
    };

    if (username) {
      fetchLinesOfCode(); // Fetch lines of code when username is available
    }
  }, [username, githubToken]);

  // Get the current month (0-indexed)
  const currentMonth = new Date().getMonth();

  // Array for the last 6 months
  const monthsInLast6Months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  // Adjust months to show the last 6 months
  const adjustedMonths = [];
  const adjustedData = [];

  // Loop through the last 6 months
  for (let i = 0; i < 6; i++) {
    const monthIndex = (currentMonth - i + 12) % 12; // Adjust for negative indices
    adjustedMonths.unshift(monthsInLast6Months[monthIndex]); // Unshift to get the most recent month last
    adjustedData.unshift(linesOfCode[i] || 0); // Unshift to align data with months
  }

  const chartData = {
    labels: adjustedMonths, // X-axis labels: Last 6 months
    datasets: [
      {
        label: "Lines of Code",
        data: adjustedData, // Use the data passed as prop
        backgroundColor: "rgba(118, 63, 249, 0.2)", // Bar color
        borderColor: "#763FF9", // Border color
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Lines of Code - Last 6 Months",
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="module">
      <div className="card-header">
        <h4>Lines of Code</h4>
        <div className="header-detail">Last 6 Months</div>
      </div>
      <div
        className="chart-container"
        style={{
          width: "100%",
          height: "340px", // Container height
        }}
      >
        <Bar
          data={chartData}
          options={options}
          height={null} // Allow Chart.js to control the height
        />
      </div>
    </div>
  );
};

export default BarChart;
