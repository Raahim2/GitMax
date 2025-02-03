"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import NavBar from "@/components/landing/navbar";
import "@/styles/landing.css";


export default function Home() {
  const [username, setUsername] = useState("");
  const router = useRouter();




  const handleSearch = (e) => {
    e.preventDefault();
    if (username.trim()) {
      router.push(`/${username}`);
    }
  };




  return (
    <>
      <NavBar />
    
      <div className="container">
        <h1 className="title">Enter a GitHub Username</h1>
        <form onSubmit={handleSearch} className="form">
          <input
            type="text"
            placeholder="Enter your GitHub username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input"
          />
          <button type="submit" className="button">
            Search
          </button>
        </form>

        
      </div>
    </>
  );
}
