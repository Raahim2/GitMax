"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import React from "react";
import Sidebar from "@/components/sidebar";
import NavBar from "@/components/navbar";
import MobileBar from "@/components/mobilebar";
import LanguagePie from "@/components/languagePie";
import BarChart from "@/components/barchart";
import LineChart from "@/components/linechart"; // Import LineChart
import RepoList from "@/components/repolist";
import InfoCard from "@/components/infocard";
import "@/styles/dashboard.css";

export default function ProfilePage() {
    const { username } = useParams(); // Get the dynamic username from the URL
    const [profileData, setProfileData] = useState(null);
    const [repos, setRepos] = useState([]);
    const [totalLines, setTotalLines] = useState(0);
    const [totalSize, setTotalSize] = useState(0);
    const [totalStars, setTotalStars] = useState(0);
    const [totalForks, setTotalForks] = useState(0);
    const [languageStats, setLanguageStats] = useState([]);
    const [monthlyCommits, setMonthlyCommits] = useState(Array(12).fill(0)); // Initialize monthly commits array
    const [linesOfCodeData, setLinesOfCodeData] = useState(Array(6).fill(0)); // Initialize lines of code for the last 6 months
    const githubToken = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const headers = {
                    Authorization: `Bearer ${githubToken}`, // Include token in request headers
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
                const languageTotals = {};
                const commitCounts = Array(12).fill(0); // Initialize commit counts for the last 12 months
                const linesOfCode = Array(6).fill(0); // Initialize lines of code for the last 6 months
    
                // Get the current month and calculate the last 12 months and last 6 months
                const currentMonth = new Date().getMonth(); // Current month (0-indexed)
                const currentYear = new Date().getFullYear();
                const months = [];
                for (let i = 0; i < 12; i++) {
                    const monthIndex = (currentMonth - i + 12) % 12; // Adjust for negative indices
                    months.push(monthIndex);
                }

                const last6Months = [];
                for (let i = 0; i < 6; i++) {
                    const monthIndex = (currentMonth - i + 12) % 12; // Adjust for negative indices
                    last6Months.push(monthIndex);
                }

                // Fetch language details and commits for each repository
                await Promise.all(
                    reposData.map(async (repo) => {
                        stars += repo.stargazers_count;
                        forks += repo.forks_count;
                        size += repo.size;
                        lines += repo.size;
    
                        // Fetch languages for the repository
                        const languageResponse = await fetch(repo.languages_url, { headers });
                        const languages = await languageResponse.json();
    
                        // Aggregate language totals
                        for (const [language, bytes] of Object.entries(languages)) {
                            if (!languageTotals[language]) {
                                languageTotals[language] = 0;
                            }
                            languageTotals[language] += bytes;
                        }
    
                        // Fetch commits for the repository
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
                                if (commitYear === new Date().getFullYear() || commitYear === new Date().getFullYear() - 1) {
                                    if (months.includes(commitMonth)) {
                                        const monthIndex = months.indexOf(commitMonth);
                                        commitCounts[monthIndex] += 1; // Increment commit count for the respective month
    
                                        // Calculate lines of code for each commit (for this example, assuming each commit adds 10 lines)
                                        if (last6Months.includes(commitMonth)) {
                                            // Only consider the last 6 months
                                            const month = commitDate.getMonth();
                                            linesOfCode[month] += 10; // Assuming each commit adds 10 lines of code
                                        }
                                    }
                                }
                            });
    
                            page++;
                        }
                    })
                );
    
                // Calculate percentage for each language
                const totalBytes = Object.values(languageTotals).reduce((sum, bytes) => sum + bytes, 0);
                const languagePercentages = Object.entries(languageTotals).map(([language, bytes]) => ({
                    language,
                    percentage: ((bytes / totalBytes) * 100).toFixed(2),
                }));
    
                // Update state
                setTotalStars(stars);
                setTotalForks(forks);
                setTotalLines(lines);
                setTotalSize((size / 1024).toFixed(2)); // Convert size from KB to MB
                setLanguageStats(languagePercentages);
                setMonthlyCommits(commitCounts); // Set the aggregated commit counts
                setLinesOfCodeData(linesOfCode); // Set the lines of code data for the last 6 months
            } catch (error) {
                console.error("Error fetching GitHub profile or repositories:", error);
            }
        };
    
        fetchProfileData();
    }, [username, githubToken]);

    if (!profileData) {
        return (
            <div className="bg-gray-100 flex items-center justify-center h-screen">
                <div className="w-3/4 max-w-lg bg-white p-8 rounded-lg shadow-lg">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">User Not Found</h1>
                    <p className="text-lg text-gray-700">Could not find the GitHub profile. Please try again.</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Sidebar highlight="Dashboard" username={username} />
            <NavBar username={username} logo={profileData.avatar_url} />
            <MobileBar />
            <div className="dashboard-content">
                <div className="dashboard-container">
                    <div className="w-layout-grid _2-1-grid">
                        <div className="w-layout-grid stacked-modules">
                            <div className="w-layout-grid _2-grid">
                                <InfoCard caption="Followers" value={profileData.followers} logo="https://assets.website-files.com/6057ab51530cb39d3fdac75d/605882d03baf8a2d544bd28f_dollar-sign.svg" />
                                <InfoCard caption="Repositories" value={repos.length} logo="https://assets.website-files.com/6057ab51530cb39d3fdac75d/605882d03baf8a2d544bd28f_dollar-sign.svg" />
                                <InfoCard caption="Stars" value={totalStars} logo="https://assets.website-files.com/6057ab51530cb39d3fdac75d/605882d03baf8a2d544bd28f_dollar-sign.svg" />
                                <InfoCard caption="Fork" value={totalForks} logo="https://assets.website-files.com/6057ab51530cb39d3fdac75d/605882d03baf8a2d544bd28f_dollar-sign.svg" />
                                <InfoCard caption="Code Data" value={totalSize + " MB"} logo="https://assets.website-files.com/6057ab51530cb39d3fdac75d/605882d03baf8a2d544bd28f_dollar-sign.svg" />
                                <InfoCard caption="Lines Of Code" value={totalLines + " Lines"} logo="https://assets.website-files.com/6057ab51530cb39d3fdac75d/605882d03baf8a2d544bd28f_dollar-sign.svg" />
                            </div>
                        </div>
                        <div className="w-layout-grid stacked-modules">
                            <LanguagePie languageStats={languageStats} />
                        </div>
                    </div>
                    <div className="w-layout-grid _1-2-grid" style={{ marginTop: '30px' }}>
                        <BarChart data={linesOfCodeData} /> {/* Pass lines of code data to BarChart */}
                        <LineChart commits={monthlyCommits} /> {/* Pass the commits data to LineChart */}
                    </div>
                    <div style={{ marginTop: '30px' }}>
                        <RepoList repodata={repos} />
                    </div>
                </div>
            </div>
        </div>
    );
}
