"use client";

import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"; // Importing arrow icons

// Mapping of colors for different programming languages
const colorMap = {
  JavaScript: "javascript",
  Python: "python",
  Ruby: "ruby",
  Java: "java",
  Go: "go",
  PHP: "php",
  Rust: "rust",
  "C#": "c-sharp",
  Kotlin: "kotlin",
  Swift: "swift",
  HTML: "html",
  CSS: "css",
  "Jupyter Notebook": "jupyter-notebook",
  EJS: "ejs",
  TypeScript:"typescript"
};

const getLanguageColor = (language) => {
  return colorMap[language] || "default-lang"; // Default class for unknown languages
};
const RepoList = ({ repodata }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const projectsPerPage = 5;
  const totalPages = Math.ceil(repodata.length / projectsPerPage);

  // Get the repositories to display for the current slide
  const currentProjects = repodata.slice(
    currentSlide * projectsPerPage,
    (currentSlide + 1) * projectsPerPage
  );

  const goToPreviousSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const goToNextSlide = () => {
    if (currentSlide < totalPages - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  return (
    <div className="table-module">
      <div className="table-header">
        <h4 className="no-space-bottom">Repositories</h4>
      </div>
      <div className="table-content">
        <div className="table-list">
          <div className="w-layout-grid table-headers">
            <div className="caption-large">Repository</div>
            <div className="caption-large">Language</div>
            <div className="caption-large">Collaborators</div>
            <div className="caption-large">View Project</div>
          </div>

          {/* Render the repositories for the current slide */}
          {currentProjects.map((repo, index) => (
            <div className="w-layout-grid table-row" key={index}>
              <div className="table-title">{repo.name}</div>
              <div className="status">
                <div className={`indication-color ${getLanguageColor(repo.language)}`}></div>
                <div>{repo.language || "N/A"}</div>
              </div>
              <div className="table-avatar-row">
                <img
                  src={repo.owner?.avatar_url || "default-avatar.png"}
                  loading="lazy"
                  alt="Collaborator"
                  className="in-row-avatar first"
                />
              </div>
              <div>
                <a href={repo.html_url} target="_blank" style={{ color: "blue" }} rel="noopener noreferrer">
                  View Project
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Controls */}
      <div
        className="pagination-controls"
        style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "20px" }}
      >
        {/* Previous Arrow */}
        <div
          onClick={goToPreviousSlide}
          style={{
            cursor: currentSlide === 0 ? "not-allowed" : "pointer",
            marginRight: "20px",
          }}
        >
          <FaArrowLeft
            style={{
              fontSize: "20px",
              color: currentSlide === 0 ? "gray" : "#007bff",
            }}
          />
        </div>

        {/* Pagination Dots */}
        <div style={{ display: "flex", gap: "10px" }}>
          {Array.from({ length: totalPages }).map((_, index) => (
            <div
              key={index}
              onClick={() => setCurrentSlide(index)}
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: currentSlide === index ? "#007bff" : "#ccc",
                cursor: "pointer",
              }}
            />
          ))}
        </div>

        {/* Next Arrow */}
        <div
          onClick={goToNextSlide}
          style={{
            cursor: currentSlide === totalPages - 1 ? "not-allowed" : "pointer",
            marginLeft: "20px",
          }}
        >
          <FaArrowRight
            style={{
              fontSize: "20px",
              color: currentSlide === totalPages - 1 ? "gray" : "#007bff",
            }}
          />
        </div>
      </div>

      <div className="table-bottom-caption">
        <div>Showing repositories from GitHub data</div>
      </div>
    </div>
  );
};

export default RepoList;
