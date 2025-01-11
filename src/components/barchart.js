"use client";

import React from "react";
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

const BarChart = ({ data }) => {
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
    adjustedData.unshift(data[monthIndex]); // Unshift to align data with months
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
