"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

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
    <div className={styles.container}>
      <h1 className={styles.title}>Enter a Username</h1>
      <form onSubmit={handleSearch} className={styles.form}>
        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Go
        </button>
      </form>
    </div>
  );
}
