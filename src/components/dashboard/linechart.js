"use client";

import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register required components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({ username , githubToken}) => {
  const [monthlyCommits, setMonthlyCommits] = useState(Array(12).fill(0)); // Initialize with zero commits

  useEffect(() => {
    const fetchCommitsData = async () => {
      try {
        const headers = {
          Authorization: `Bearer ${githubToken}`,
        };

        // Get the current month
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();
        
        // Initialize commit counts for the last 12 months
        const commitCounts = Array(12).fill(0);

        // Fetch repositories of the user
        const repoResponse = await fetch(`https://api.github.com/users/${username}/repos`, { headers });
        const repos = await repoResponse.json();

        // Loop through repositories and fetch commits
        await Promise.all(
          repos.map(async (repo) => {
            let page = 1;
            while (true) {
              const commitResponse = await fetch(
                `https://api.github.com/repos/${username}/${repo.name}/commits?per_page=100&page=${page}`,
                { headers }
              );
              const commits = await commitResponse.json();

              if (commitResponse.status !== 200 || commits.length === 0) break; // No more commits

              // Aggregate commits by month
              commits.forEach((commit) => {
                const commitDate = new Date(commit.commit.author.date);
                const commitMonth = commitDate.getMonth(); // Get month (0-indexed)
                const commitYear = commitDate.getFullYear();

                // Check if the commit is in the last 12 months
                if (
                  commitYear === currentYear ||
                  commitYear === currentYear - 1
                ) {
                  const monthIndex = (currentMonth - commitMonth + 12) % 12;
                  commitCounts[monthIndex] += 1; // Increment commit count for the respective month
                }
              });

              page++;
            }
          })
        );

        // Update the state with the commit counts
        setMonthlyCommits(commitCounts);
      } catch (error) {
        console.error("Error fetching GitHub commits:", error);
      }
    };

    fetchCommitsData();
  }, [username, githubToken]);

  // Adjust months to display the last 12 months
  const monthsInYear = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const currentMonth = new Date().getMonth();
  const adjustedMonths = [];
  const adjustedCommits = [];

  // Loop through the last 12 months
  for (let i = 0; i < 12; i++) {
    const monthIndex = (currentMonth - i + 12) % 12; // Adjust for negative indices
    adjustedMonths.unshift(monthsInYear[monthIndex]); // Unshift to get the most recent month last
    adjustedCommits.unshift(monthlyCommits[monthIndex]); // Unshift to align with months
  }

  // Data for the line chart using the adjusted commits data
  const data = {
    labels: adjustedMonths, // X-axis labels: Months of the last year
    datasets: [
      {
        label: "Monthly Commits", // Label for the dataset
        data: adjustedCommits, // Y-axis values: Commit counts for each month
        fill: false, // No fill under the line
        borderColor: "#763FF9", // Line color
        tension: 0.1, // Smooth the curve
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true, // Start the Y-axis from zero
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            return `Commits: ${context.raw}`; // Display commit count on hover
          },
        },
      },
    },
  };

  return (
    <div className="table-module" style={{backgroundColor:'white'  ,border: "1px solid #ddd"}}>
      <div className="table-header-smaller-padding">
        <h4 className="no-space-bottom">Monthly Commits Throughout the Year</h4>
      </div>
      
      <div className="full-table-row-divider"></div>

      {/* Line Chart */}
      <div className="line-chart-container" style={{ padding: '20px' }}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default LineChart;
