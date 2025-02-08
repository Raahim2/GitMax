import React, { useEffect, useState } from "react";
import { FaSearch, FaCodeBranch, FaPlus, FaCheck } from "react-icons/fa";
import { useRouter } from "next/navigation"; // Import the useRouter hook
import { fetchData } from "@/lib/database";

const ImportRepo = ({ filteredRepos, searchQuery, setSearchQuery, handleImport, session, API_KEY }) => {
  const [importedRepos, setImportedRepos] = useState([]);
  const router = useRouter(); // Initialize the router

  // Function to check if a repo is already imported
  const checkIfRepoImported = async (repoName) => {
    const filterCondition = {
      githubUsername: session.user.username,
      repoName: repoName,
    };

    const data = await fetchData(API_KEY, "GitMax", "Automations", filterCondition);
    
    if (data && data.length > 0) {
      return true; // Repo already imported
    }
    return false; // Repo not imported
  };

  // Fetch imported repositories for the user
  useEffect(() => {
    const fetchImportedRepos = async () => {
      const repoNames = await Promise.all(
        filteredRepos.map(async (repo) => {
          const isImported = await checkIfRepoImported(repo.name);
          return { name: repo.name, isImported };
        })
      );
      setImportedRepos(repoNames);
    };

    if (session) {
      fetchImportedRepos();
    }
  }, [filteredRepos, session, API_KEY]);

  const truncateDescription = (desc, maxLength = 100) => {
    if (!desc) return '';
    return desc.length > maxLength ? `${desc.substring(0, maxLength)}...` : desc;
  };

  // Get the button class based on whether the repo is imported
  const getButtonClass = (repoImported) => {
    return repoImported ? "imported-repo-btn" : "import-repo-btn";
  };

  // Handle the redirect after import
  const handleRedirect = () => {
    router.push('/hello'); // Redirect to /hello page
  };

  return (
    <div className="repos-container">
      <div className="repo-header">
        <h2 className="section-title">Import a Git Repository</h2>
      </div>
      <div className="search-container">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search repositories..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="repo-list">
        {filteredRepos.map((repo) => {
          const repoImported = importedRepos.find((importedRepo) => importedRepo.name === repo.name)?.isImported;

          return (
            <div key={repo.id} className="repo-item">
              <div className="repo-content">
                <div className="repo-meta-top">
                  <span className="repo-visibility">{repo.visibility}</span>
                  <span className="repo-username">/{session.user.username}</span>
                </div>
                <h3 className="repo-name">{repo.name}</h3>
                <p className="repo-description">{truncateDescription(repo.description)}</p>
                <div className="repo-meta-bottom">
                  <span className="repo-language">
                    <FaCodeBranch /> {repo.language}
                  </span>
                  <span className="repo-updated">Updated {repo.updated_at}</span>
                </div>
              </div>
              <button
                className={getButtonClass(repoImported)} // Apply the conditional class
                onClick={() => {
                  handleImport(repo); // Handle repo import
                  if (repoImported) handleRedirect(); // Redirect if already imported
                }}
                disabled={repoImported} // Disable import if already imported
              >
                {repoImported ? <FaCheck /> : <FaPlus />} {repoImported ? "Imported" : "Import"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ImportRepo;
