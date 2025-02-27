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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ username, githubToken }) => {
  const [chartData, setChartData] = useState({ stars: [], forks: [], followers: [], following: [] });
  const [activeMetric, setActiveMetric] = useState("stars");

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const profileResponse = await fetch(`https://api.github.com/users/${username}/events`, {
          headers: { Authorization: `token ${githubToken}` },
        });
        const events = await profileResponse.json();

        const now = new Date();
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(now.getMonth() - 5);

        let monthlyStars = Array(6).fill(0);
        let monthlyForks = Array(6).fill(0);
        let monthlyFollowers = Array(6).fill(0);
        let monthlyFollowing = Array(6).fill(0);

        events.forEach((event) => {
          const eventDate = new Date(event.created_at);
          if (eventDate >= sixMonthsAgo) {
            const monthDiff = now.getMonth() - eventDate.getMonth();
            const index = (monthDiff + 6) % 6;

            if (event.type === "WatchEvent") {
              monthlyStars[index] += 1;
            } else if (event.type === "ForkEvent") {
              monthlyForks[index] += 1;
            } else if (event.type === "FollowEvent") {
              monthlyFollowers[index] += 1;
            }
          }
        });

        setChartData({
          stars: monthlyStars,
          forks: monthlyForks,
          followers: monthlyFollowers,
          following: monthlyFollowing,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (username) fetchProfileData();
  }, [username, githubToken]);

  const metrics = {
    stars: "Stars Received",
    forks: "Forks Count",
    followers: "Followers",
    following: "Following",
  };

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const lastSixMonths = Array.from({ length: 6 }, (_, i) => {
    const d = new Date();
    d.setMonth(d.getMonth() - (5 - i));
    return months[d.getMonth()];
  });

  const chartConfig = {
    labels: lastSixMonths,
    datasets: [
      {
        label: metrics[activeMetric],
        data: chartData[activeMetric],
        backgroundColor: "rgba(118, 63, 249, 0.2)",
        borderColor: "#763FF9",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ maxWidth: "500px", margin: "auto", textAlign: "center", padding: "20px", border: "1px solid #ddd", borderRadius: "10px" , backgroundColor:'white' }}>
      <h3>GitHub Profile Metrics</h3>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "10px" }}>
        {Object.keys(metrics).map((metric) => (
          <button
            key={metric}
            onClick={() => setActiveMetric(metric)}
            style={{
              padding: "8px 12px",
              margin: "5px",
              cursor: "pointer",
              borderRadius: "5px",
              background: activeMetric === metric ? "#763FF9" : "#eee",
              color: activeMetric === metric ? "#fff" : "#333",
              border: "none",
              fontSize: "14px",
            }}
          >
            {metrics[metric]}
          </button>
        ))}
      </div>
      <div style={{ height: "300px" }}>
        <Bar data={chartConfig} options={{ responsive: true, maintainAspectRatio: false }} />
      </div>
    </div>
  );
};

export default BarChart;
