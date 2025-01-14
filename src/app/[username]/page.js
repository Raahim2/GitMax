"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import React from "react";
import Sidebar from "@/components/dashboard/sidebar";
import NavBar from "@/components/dashboard/navbar";
import MobileBar from "@/components/dashboard/mobilebar";
import LanguagePie from "@/components/dashboard/languagePie";
import BarChart from "@/components/dashboard/barchart";
import LineChart from "@/components/dashboard/linechart"; // Import LineChart
import RepoList from "@/components/dashboard/repolist";
import InfoGrid from "@/components/dashboard/infogrid";
import "@/styles/dashboard.css";

export default function ProfilePage() {
    const { username } = useParams(); 
    const githubToken = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

    return (
        <div>
            <Sidebar highlight="Dashboard" username={username} />
            <NavBar username={username} githubToken={githubToken} />
            <MobileBar />
            <div className="dashboard-content">
                <div className="dashboard-container">
                    <div className="w-layout-grid _2-1-grid">
                        <div className="w-layout-grid stacked-modules">
                            <InfoGrid username={username} githubToken={githubToken}/>
                        </div>
                        <div className="w-layout-grid stacked-modules">
                            <LanguagePie username={username} githubToken={githubToken}/>
                        </div>
                    </div>
                     <div className="w-layout-grid _1-2-grid" style={{ marginTop: '30px' }}>
                        <BarChart username={username} githubToken={githubToken}/> 
                        <LineChart username={username} githubToken={githubToken}/>
                    </div>
                    <div style={{ marginTop: '30px' }}>
                        <RepoList username={username} projectsPerPage={5} githubToken={githubToken} />
                    </div> 
                </div>
            </div>
        </div>
    );
}
