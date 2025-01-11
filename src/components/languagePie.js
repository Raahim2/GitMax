"use client";

import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

export default function LanguagePie({ languageStats }) {
  // Check if languageStats is defined and is an array
  if (!languageStats || !Array.isArray(languageStats)) {
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
          "#900C3F", "#581845", "#2E8B57", "#FF8C00"  // You can add more colors if needed
        ], // Colors for each section of the pie
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
