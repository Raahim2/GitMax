"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import Sidebar from "@/components/dashboard/sidebar";
import NavBar from "@/components/dashboard/navbar";
import MobileBar from "@/components/dashboard/mobilebar";
import LanguagePie from "@/components/dashboard/languagePie";
import BarChart from "@/components/dashboard/barchart";
import LineChart from "@/components/dashboard/linechart"; 
import RepoList from "@/components/dashboard/repolist";
import InfoGrid from "@/components/dashboard/infogrid";
import { fetchData, addData } from "@/lib/database";
import NotFound from "@/components/landing/404";

import "@/styles/dashboard.css";

export default function Dashboard() {
    const { username } = useParams();
    const { data: session } = useSession();
    const githubToken = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
    const API_KEY = process.env.NEXT_PUBLIC_PROJECT_CUSTOM_API;

    const [isSidebarContentVisible, setIsSidebarContentVisible] = useState(true);
    const [userExists, setUserExists] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const toggleSidebarContent = () => {
        setIsSidebarContentVisible((prev) => !prev);
    };

    useEffect(() => {
        const checkGitHubUser = async () => {
            try {
                const response = await fetch(`https://api.github.com/users/${username}`, {
                    headers: { Authorization: `token ${githubToken}` }
                });

                const userFound = response.status !== 404;
                setUserExists(userFound);
            } catch (error) {
                setUserExists(false);
            } finally {
                setIsLoading(false);
            }
        };

        if (username) checkGitHubUser();
    }, [username]);

    useEffect(() => {
        const storeUserInfo = async () => {
            if (session && session.user) {
                const filterCondition = { githubUsername: session.user.username };
                const existingUser = await fetchData(API_KEY, "GitMax", "Users", filterCondition);
                if (existingUser.message === "No data found") {
                    const userDocument = {
                        githubUsername: session.user.username,
                        normalUsername: session.user.name,
                        email: session.user.email,
                        accessToken: session.accessToken
                    };
                    await addData(API_KEY, "GitMax", "Users", userDocument);
                }
            }
        };

        storeUserInfo();
    }, [session]);

    if (isLoading) {
        return (
            <div style={styles.spinnerContainer}>
                <div style={styles.spinner}></div>
            </div>
        );
    }

    if (userExists === false) {
        return <NotFound />;
    }

    return (
        <div>
            <Sidebar highlight="Dashboard" username={username} className={isSidebarContentVisible ? "sidebar-content" : ""} />
            <NavBar username={username} githubToken={githubToken} />
            <MobileBar username={username} toggleSidebarContent={toggleSidebarContent} />
            
            <div className="dashboard-content">
                <div className="dashboard-container">
                    <div className="w-layout-grid _2-1-grid">
                        <div className="w-layout-grid stacked-modules">
                            <InfoGrid username={username} githubToken={githubToken} />
                        </div>
                        <div className="w-layout-grid stacked-modules">
                            <LanguagePie username={username} githubToken={githubToken} />
                        </div>
                    </div>
                    <div className="w-layout-grid _1-2-grid" style={{ marginTop: '30px' }}>
                        <BarChart username={username} githubToken={githubToken} /> 
                        <LineChart username={username} githubToken={githubToken} />
                    </div>
                    <div style={{ marginTop: '30px' }}>
                        <RepoList username={username} projectsPerPage={5} githubToken={githubToken} />
                    </div> 
                </div>
            </div>
        </div>
    );
}

const styles = {
    spinnerContainer: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
    },
    spinner: {
        border: "5px solid #f3f3f3",
        borderTop: "5px solid #007bff", // Blue spinner color
        borderRadius: "50%",
        width: "50px",
        height: "50px",
        animation: "spin 0.2s linear infinite",
    },
    "@keyframes spin": {
        "0%": { transform: "rotate(0deg)" },
        "100%": { transform: "rotate(360deg)" },
    },
};



// "use client";

// import { useState, useEffect } from "react";
// import { useParams } from "next/navigation";
// import { useSession } from "next-auth/react";
// import Sidebar from "@/components/dashboard/sidebar";
// import NavBar from "@/components/dashboard/navbar";
// import MobileBar from "@/components/dashboard/mobilebar";
// import LanguagePie from "@/components/dashboard/languagePie";
// import BarChart from "@/components/dashboard/barchart";
// import LineChart from "@/components/dashboard/linechart"; 
// import RepoList from "@/components/dashboard/repolist";
// import InfoGrid from "@/components/dashboard/infogrid";
// import { fetchData, addData } from "@/lib/database";
// import NotFound from "@/components/landing/404";

// import "@/styles/dashboard.css";

// export default function Dashboard() {
//     const { username } = useParams();
//     const githubToken = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

//     const [isSidebarContentVisible, setIsSidebarContentVisible] = useState(true);
   

//     const toggleSidebarContent = () => {
//         setIsSidebarContentVisible((prev) => !prev);
//     };

    

 


//     return (
//         <div>
//             <Sidebar highlight="Dashboard" username={username} className={isSidebarContentVisible ? "sidebar-content" : ""} />
//             <NavBar username={username} githubToken={githubToken} />
//             <MobileBar username={username} toggleSidebarContent={toggleSidebarContent} />
            
//             <div className="dashboard-content">
//                 lol
//             </div>
//         </div>
//     );
// }

// const styles = {
//     spinnerContainer: {
//         position: "absolute",
//         top: "50%",
//         left: "50%",
//         transform: "translate(-50%, -50%)",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         height: "100vh",
//     },
//     spinner: {
//         border: "5px solid #f3f3f3",
//         borderTop: "5px solid #007bff", // Blue spinner color
//         borderRadius: "50%",
//         width: "50px",
//         height: "50px",
//         animation: "spin 0.2s linear infinite",
//     },
//     "@keyframes spin": {
//         "0%": { transform: "rotate(0deg)" },
//         "100%": { transform: "rotate(360deg)" },
//     },
// };
