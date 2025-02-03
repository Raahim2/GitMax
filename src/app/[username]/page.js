"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import React from "react";
import Sidebar from "@/components/dashboard/sidebar";
import NavBar from "@/components/dashboard/navbar";
import MobileBar from "@/components/dashboard/mobilebar";
import LanguagePie from "@/components/dashboard/languagePie";
import BarChart from "@/components/dashboard/barchart";
import LineChart from "@/components/dashboard/linechart"; 
import RepoList from "@/components/dashboard/repolist";
import InfoGrid from "@/components/dashboard/infogrid";
import "@/styles/dashboard.css";

export default function Dashboard() {
    const { username } = useParams(); 
    const { data: session } = useSession(); 
    const githubToken = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

    const [isSidebarContentVisible, setIsSidebarContentVisible] = useState(true); 
    const toggleSidebarContent = () => {
        setIsSidebarContentVisible((prev) => !prev); 
    };

    const BASE_URL = "https://projects-api-three.vercel.app/DBMS"; 
    const API_KEY = process.env.NEXT_PUBLIC_PROJECT_CUSTOM_API;

    async function fetchData(apiKey, dbName, collectionName, filterCondition = {}) {
        const endpoint = `${BASE_URL}/fetch`;
        const payload = {
            API_KEY: apiKey,
            db_name: dbName,
            collection_name: collectionName,
            filter_condition: filterCondition
        };
        const headers = {
            'Content-Type': 'application/json'
        };

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(payload)
            });

            if (response.status === 200) {
                return await response.json();
            } else {
                console.error(`Failed to fetch data. Status code: ${response.status}`);
                return null;
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            return null;
        }
    }

    async function addData(apiKey, dbName, collectionName, document) {
        const endpoint = `${BASE_URL}/add_data`;
        const payload = {
            API_KEY: apiKey,
            db_name: dbName,
            collection_name: collectionName,
            document: document
        };

        try {
            await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
        } catch (error) {
            console.error("Error adding data:", error);
        }
    }

    useEffect(() => {
        const storeUserInfo = async () => {
            if (session && session.user) {
                const filterCondition = { githubUsername: session.user.username };
                const existingUser = await fetchData(API_KEY, "GitMax", "Users", filterCondition);
                if (existingUser.message==="No data found") {
                    const userDocument = {
                        githubUsername: session.user.username,
                        normalUsername: session.user.name,
                        email: session.user.email,
                        accessToken: session.accessToken 
                    };
                    await addData(API_KEY, "GitMax", "Users", userDocument);
                    console.log("User info stored in database.");
                } else {
                    console.log("User already exists in database.");
                }
            }
        };

        storeUserInfo();
    }, [session]);

    return (
        <div>
            <Sidebar highlight="Dashboard" username={username} className={isSidebarContentVisible ? "sidebar-content" : ""} />
            <NavBar username={username} githubToken={githubToken} />
            <MobileBar username={username} toggleSidebarContent={toggleSidebarContent}/>
            
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
