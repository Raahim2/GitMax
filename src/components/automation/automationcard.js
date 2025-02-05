import React from 'react';
import { FaGithub, FaArrowRight } from 'react-icons/fa';

// CSS Styles
const styles = `
.automation-card {
    position: relative;
    background: white;
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    border: 1px solid #f0f0f0;
}

.automation-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.project-info {
    display: flex;
    align-items: center;
}

.storage-square {
    background: white;
    border-radius: 8px;
    padding: 0px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    border: 1px solid #f0f0f0;
}

.project-name {
    font-size: 18px;
    font-weight: 600;
    color: #1a1a1a;
    margin-left: 16px; /* Add margin for spacing */
}

.view-repo-button {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    background: #f8f9fa;
    border-radius: 6px;
    border: 1px solid #e9ecef;
    color: #2d333b;
    text-decoration: none;
    font-size: 14px;
    transition: all 0.2s ease;
}

.view-repo-button:hover {
    border-color: #d0d7de;
}

.progress-container {
   display: flex; /* Flexbox for layout */
   align-items: center; /* Center vertically */
   justify-content: space-between; /* Space between elements */
   margin-top: 20px; /* Space above progress bar */
}

.progress-circle {
   width: 180px; /* Adjusted for better layout */
   height: 180px; /* Maintain aspect ratio */
}

.info-box {
   flex-grow: 1; /* Allow info box to take available space */
   margin-left: 20px; /* Space between info box and progress circle */
   border-radius: 8px; /* Rounded corners */
   padding: 18px; /* Padding inside the box */
}

.info-box p {
   margin-bottom: .5em; /* Space between paragraphs */
   color: #495057; /* Darker gray for text */
}

.info-box strong {
   font-weight: bold; /* Strong text for labels */
   color: #1a1a1a; /* Dark text color */
}

.status {
   display:inline-flex; 
   align-items:center; 
   padding:.25em .5em; 
   border-radius:.5em; 
   font-size:.875em; 
   font-weight:bold; 
}

.status.needs-attention {
   background:#ffe3e3; 
   color:#cc0000; 
}

.status.optimal {
   background:#e6f6ed; 
   color:#007a5a; 
}

/* Progress circle colors */
circle {
   transition: stroke .3s ease; 
}
`;

// Append styles to the document head
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

const AutomationCard = ({ projectname, logo, percentage, visibility, createdAt, templateName }) => {
   const radius = 45; // Radius of the progress circle
   const circumference = 2 * Math.PI * radius; // Circumference of the circle
   const progress = (percentage * circumference) / 100; // Progress based on percentage

   const getColor = (percentage) => {
       if (percentage < 20) return '#ef4444'; // Red
       if (percentage < 50) return '#f59e0b'; // Orange
       if (percentage < 80) return '#3b82f6'; // Blue
       return '#10b981'; // Green
   };

   return (
       <div className="automation-card">
           <div className="header">
               <div className="project-info">
                   <div className="storage-square">
                       <img
                           src={logo}
                           loading="lazy"
                           width="40"
                           height="40"
                           alt="Project logo"
                           className="icon"
                       />
                   </div>
                   <h4 className="project-name">{projectname}</h4>
               </div>
               <a 
                   href="https://github.com/Raahim2/GitMax" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="view-repo-button"
               >
                   <FaGithub className="repo-icon" />
                   <span className="repo-text">View Repository</span>
                   <FaArrowRight className="arrow-icon" />
               </a>
           </div>

           <div className="progress-container">
               <div className="info-box">
                   <p><strong>Status:</strong> 
                       <span className={`status ${percentage < 50 ? 'needs-attention' : 'optimal'}`}>
                           {percentage < 50 ? 'Needs Attention' : 'Optimal'}
                       </span>
                   </p>
                   <p><strong>Visibility:</strong> {visibility}</p>
                   <p><strong>Created At:</strong> {new Date(createdAt).toLocaleDateString()}</p>
                   <p><strong>Template:</strong> {templateName}</p>
               </div>

               <div className="progress-circle">
                   <svg width="180" height="180" viewBox="0 0 140 140">
                       <circle
                           cx="70"
                           cy="70"
                           r={radius}
                           fill="none"
                           stroke="#f3f4f6"
                           strokeWidth="10"
                           strokeLinecap="round"
                       />
                       <circle
                           cx="70"
                           cy="70"
                           r={radius}
                           fill="none"
                           stroke={getColor(percentage)}
                           strokeWidth="10"
                           strokeDasharray={`${progress} ${circumference}`}
                           strokeLinecap="round"
                           transform="rotate(-90,70,70)"
                       />
                       <text 
                           x="50%" 
                           y="50%" 
                           textAnchor="middle" 
                           dy=".3em" 
                           className="percentage-text"
                       >
                           {percentage}%
                       </text>
                   </svg>
               </div>
           </div>
       </div>
   );
};

export default AutomationCard;

