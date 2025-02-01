import React from 'react';

const AutomationCard = ({ projectname, logo, percentage }) => {
    const radius = 40;
    const circumference = Math.PI * radius; // Half-circle circumference
    const progress = (percentage / 100) * circumference;

    const getColor = (percentage) => {
        if (percentage < 20) return 'red';
        if (percentage < 50) return 'orange';
        if (percentage < 80) return 'yellow';
        return 'green';
    };

    return (
        <div className="module">
            <div className="content-percentage">
                <div className="content-storage">
                    <div className="storage-square">
                        <img
                            src={logo}
                            loading="lazy"
                            width="48"
                            alt=""
                            className="icon"
                        />
                    </div>
                    <h4>{projectname}</h4>
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        backgroundColor: '#f6f8fa',
                        borderRadius: '20px',
                        padding: '10px',
                        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                        marginBottom: '10px'
                    }}>
                        <img 
                            src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" 
                            alt="GitHub Logo" 
                            style={{ width: '24px', height: '24px', marginRight: '8px' }} 
                        />
                        <span style={{ fontSize: '16px' }}>Raahim2/GitMax</span>
                    </div>
                </div>
                <svg width="200" height="150" viewBox="0 0 100 50">
                    <path
                        d="M10,50 A40,40 0 0,1 90,50"
                        fill="none"
                        stroke="#e0e0e0"
                        strokeWidth="8"
                    />
                    <path
                        d="M10,50 A40,40 0 0,1 90,50"
                        fill="none"
                        stroke={getColor(percentage)}
                        strokeWidth="8"
                        strokeDasharray={`${progress}, ${circumference}`}
                        strokeLinecap="round"
                    />
                    <text x="50" y="40" fontSize="12" textAnchor="middle">{percentage}%</text>
                </svg>
            </div>
        </div>
    );
};

export default AutomationCard;