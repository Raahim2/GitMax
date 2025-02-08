import React from 'react';
import { FaGithub, FaArrowRight } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

// Inline Styles as JavaScript Object
const styles = {
    automationCard: {
        position: 'relative',
        background: 'white',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        border: '1px solid #f0f0f0',
    },
    automationCardHover: {
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.12)',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    projectInfo: {
        display: 'flex',
        alignItems: 'center',
    },
    storageSquare: {
        background: 'white',
        borderRadius: '8px',
        padding: '0px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
        border: '1px solid #f0f0f0',
    },
    projectName: {
        fontSize: '18px',
        fontWeight: '600',
        color: '#1a1a1a',
        marginLeft: '16px',
    },
    viewRepoButton: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '8px 16px',
        background: '#f8f9fa',
        borderRadius: '6px',
        border: '1px solid #e9ecef',
        color: '#2d333b',
        textDecoration: 'none',
        fontSize: '14px',
        transition: 'all 0.2s ease',
    },
    viewRepoButtonHover: {
        borderColor: '#d0d7de',
    },
    progressContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: '20px',
    },
    progressCircle: {
        width: '180px',
        height: '180px',
    },
    infoBox: {
        flexGrow: 1,
        marginLeft: '20px',
        borderRadius: '8px',
        padding: '18px',
    },
    infoBoxText: {
        marginBottom: '.5em',
        color: '#495057',
    },
    status: {
        display: 'inline-flex',
        alignItems: 'center',
        padding: '.25em .5em',
        borderRadius: '.5em',
        fontSize: '.875em',
        fontWeight: 'bold',
    },
    statusNeedsAttention: {
        background: '#ffe3e3',
        color: '#cc0000',
    },
    statusOptimal: {
        background: '#e6f6ed',
        color: '#007a5a',
    },
    percentageText: {
        fontSize: '1.5em',
        fill: '#1a1a1a',
    },
};

// Inline styles for progress circle colors
const getColor = (percentage) => {
    if (percentage < 20) return '#ef4444'; // Red
    if (percentage < 50) return '#f59e0b'; // Orange
    if (percentage < 80) return '#3b82f6'; // Blue
    return '#10b981'; // Green
};

const AutomationCard = ({ projectname, logo, percentage, visibility, createdAt, templateName }) => {
    const radius = 45; // Radius of the progress circle
    const circumference = 2 * Math.PI * radius; // Circumference of the circle
    const progress = (percentage * circumference) / 100; // Progress based on percentage
    const router = useRouter()

    const handleCardClick = () => {
        router.push(`automation/${projectname}`)
    };


    return (
        <div style={styles.automationCard} className="automation-card" onClick={handleCardClick}>
            <div style={styles.header} className="header">
                <div style={styles.projectInfo} className="project-info">
                    <div style={styles.storageSquare} className="storage-square">
                        <img
                            src={logo}
                            loading="lazy"
                            width="40"
                            height="40"
                            alt="Project logo"
                            className="icon"
                        />
                    </div>
                    <h4 style={styles.projectName} className="project-name">{projectname}</h4>
                </div>
                <a 
                    href="https://github.com/Raahim2/GitMax" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={styles.viewRepoButton}
                    onMouseOver={(e) => e.target.style.borderColor = '#d0d7de'}
                    onMouseOut={(e) => e.target.style.borderColor = '#e9ecef'}
                >
                    <FaGithub className="repo-icon" />
                    <span className="repo-text">View Repository</span>
                    <FaArrowRight className="arrow-icon" />
                </a>
            </div>

            <div style={styles.progressContainer} className="progress-container">
                <div style={styles.infoBox} className="info-box">
                    <p style={styles.infoBoxText}><strong>Status:</strong> 
                        <span 
                            style={percentage < 50 ? { ...styles.status, ...styles.statusNeedsAttention } : { ...styles.status, ...styles.statusOptimal }}
                        >
                            {percentage < 50 ? 'Needs Attention' : 'Optimal'}
                        </span>
                    </p>
                    <p style={styles.infoBoxText}><strong>Visibility:</strong> {visibility}</p>
                    <p style={styles.infoBoxText}><strong>Created At:</strong> {new Date(createdAt).toLocaleDateString()}</p>
                    <p style={styles.infoBoxText}><strong>Template:</strong> {templateName}</p>
                </div>

                <div style={styles.progressCircle} className="progress-circle">
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
                            style={styles.percentageText}
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
