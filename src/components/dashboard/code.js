"use client";

import React, { useState, useEffect } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark, solarizedLight } from "react-syntax-highlighter/dist/cjs/styles/prism"; // Import both light and dark themes
import { IconCheck, IconCopy } from "@tabler/icons-react";

// Function to map file extensions to languages
const getLanguageFromExtension = (ext) => {
  const languageMap = {
    js: "javascript",
    jsx: "javascript",
    ts: "typescript",
    tsx: "typescript",
    html: "html",
    css: "css",
    py: "python",
    java: "java",
    rb: "ruby",
    php: "php",
    c: "c",
    cpp: "cpp",
    json: "json",
    md: "markdown",
    yml: "yaml",
    xml: "xml",
    go: "go",
    sh: "bash",
    sql: "sql",
  };

  return languageMap[ext] || "text"; // Default to plain text if no match
};

export default function CodeBlock({ code, filename, highlightLines = []}) {
  const [copied, setCopied] = useState(false);
  const [language, setLanguage] = useState("text"); // State for language
  const [loading, setLoading] = useState(false); // State to track loading status
  const [isDarkMode , setIsDarkMode] = useState(true)

  useEffect(() => {
    if (filename) {
      const fileExtension = filename.split(".").pop();
      setLanguage(getLanguageFromExtension(fileExtension));
    }
  }, [filename]);

  const copyToClipboard = async () => {
    if (code) {
      console.log("Copying code to clipboard...");
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => {
        console.log("Code copied!");
        setCopied(false);
      }, 2000);
    }
  };

  // Toggle theme between light and dark (optional)
  const toggleTheme = () => {
    console.log("Toggling theme...");
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <div style={{ position: "relative", backgroundColor: isDarkMode ? "#1d1f21" : "#f5f2f0", color: isDarkMode ? "#eaeaea" : "#333333", borderRadius: "8px", padding: "16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
        <span style={{ fontSize: "12px", color: isDarkMode ? "#657b83" : "#555" }}>{filename}</span>
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            onClick={toggleTheme}
            style={{
              fontSize: "12px",
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
              color: isDarkMode ? "#657b83" : "#333",
            }}
            aria-label="Toggle theme"
          >
            {isDarkMode ? '🌙 Dark' : '🌞 Light'}
          </button>
          <button
            onClick={copyToClipboard}
            style={{
              fontSize: "12px",
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
              color: isDarkMode ? "#657b83" : "#333",
            }}
            aria-label="Copy to clipboard"
          >
            {copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
          </button>
        </div>
      </div>

      {loading ? (
        <p style={{ color: isDarkMode ? "#657b83" : "#555" }}>Loading...</p>
      ) : (
        <SyntaxHighlighter
          language={language} // Automatically determined language
          style={isDarkMode ? atomDark : solarizedLight} // Toggle between dark and light theme
          wrapLines
          lineProps={(lineNumber) => ({
            style: {
              display: "block",
              backgroundColor: highlightLines.includes(lineNumber) ? "#eee8d5" : "transparent",
            },
          })}
        >
          {code}
        </SyntaxHighlighter>
      )}
    </div>
  );
}
