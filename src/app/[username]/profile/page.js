"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import React from "react";
import Sidebar from "@/components/dashboard/sidebar";
import NavBar from "@/components/dashboard/navbar";
import MobileBar from "@/components/dashboard/mobilebar";
import "@/styles/dashboard.css";

export default function ProfilePage() {
  const { username } = useParams(); 

  return (
    <div>
      <Sidebar highlight="Profile" username={username} />
      <NavBar username={username} /> 
      <MobileBar />
      <div className="dashboard-content">
        <div className="dashboard-container">
        </div>
      </div>
    </div>
  );
}
