"use client";

import React from "react";
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

const LineChart = ({ commits }) => {
  // Get the current month (0-indexed)
  const currentMonth = new Date().getMonth();

  // Dynamically create months starting from 12 months ago up to the current month
  const monthsInYear = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Adjust months to show from 12 months ago up to the current month
  const adjustedMonths = [];
  const adjustedCommits = [];

  // Loop through the last 12 months and adjust the labels and commits
  for (let i = 0; i < 12; i++) {
    const monthIndex = (currentMonth - i + 12) % 12; // Adjust for negative indices
    adjustedMonths.unshift(monthsInYear[monthIndex]); // Unshift months to have the most recent month last
    adjustedCommits.unshift(commits[monthIndex]); // Unshift commit data to match the months
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
    <div className="table-module">
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
