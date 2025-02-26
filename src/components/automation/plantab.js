import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { fetchData } from '@/lib/database';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';

const PlanTab = () => {
    const { automation_name } = useParams();
    const [planItems, setPlanItems] = useState([]);
    const [error, setError] = useState(null);
    const API_KEY = process.env.NEXT_PUBLIC_PROJECT_CUSTOM_API;

    const styles = {
        container: {
            background: '#fff',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
            overflowX: 'auto'
        },
        header: {
            fontSize: '1.5rem',
            fontWeight: '600',
            marginBottom: '24px',
            color: '#1a1a1a',
        },
        table: {
            width: '100%',
            borderCollapse: 'collapse',
            // whiteSpace: 'nowrap',
        },
        th: {
            background: '#f8f9fa',
            padding: '12px 16px',
            textAlign: 'left',
            borderBottom: '2px solid #e9ecef',
            fontWeight: '600',
            color: '#495057',
            fontSize: '1rem',
        },
        td: {
            padding: '16px',
            borderBottom: '1px solid #e9ecef',
            color: '#212529',
            fontSize: '1rem',
            verticalAlign: 'middle',
        },
        errorContainer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '87vh',
            textAlign: 'center',
        },
        errorImage: {
            maxWidth: '80%',
            height: 'auto',
            marginBottom: '24px',
        },
        errorMessage: {
            fontSize: '1.5rem',
            color: '#495057',
            fontWeight: '500',
        },
        chevronButton: {
            cursor: 'pointer',
            transition: 'transform 0.2s ease',
            color: '#6c757d',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
        },
        expandedRow: {
            backgroundColor: '#f8f9fa',
        },
        expandedContent: {
            padding: '16px',
            lineHeight: '1.6',
            maxWidth:'100vh',
            color: '#495057',
        },
        fileList: {
            listStyle: 'none',
            paddingLeft: '0',
            margin: '8px 0',
        },
        fileListItem: {
            marginBottom: '4px',
            fontFamily: 'monospace',
        },
        sectionHeading: {
            margin: '12px 0 8px 0',
            color: '#2b8a3e',
        },
        details: {
            minWidth:'80vw'
        }
    };

    useEffect(() => {
        const fetchProjectPlan = async () => {
            try {
                const data = await fetchData(API_KEY, "GitMax", "Automations", { repoName: automation_name });
                console.log(data[0]["projectPlan"]["Daily Breakdown"])
                if (data[0] && data[0]["projectPlan"]["Daily Breakdown"]) {
                    setPlanItems(data[0]["projectPlan"]["Daily Breakdown"].map(item => ({
                        ...item,
                        isExpanded: false
                    })));
                } else {
                    setError("No valid project plan found");
                }
            } catch (err) {
                setError("Failed to load project plan");
            }
        };

        fetchProjectPlan();
    }, [API_KEY, automation_name]);

    const toggleExpand = (index) => {
        setPlanItems(prev => prev.map((item, i) =>
            i === index ? { ...item, isExpanded: !item.isExpanded } : item
        ));
    };

    if (error) {
        return (
            <div style={styles.errorContainer}>
                <img
                    src="/error.gif"
                    alt="Error"
                    style={styles.errorImage}
                />
                <div style={styles.errorMessage}>
                    Go to settings Tab & Start Automation to view the project plan
                </div>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>Project Plan</h2>

            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.th}>Day</th>
                        <th style={styles.th}>Task Title</th>
                        <th style={styles.th}>Files Involved</th>
                        <th style={{ ...styles.th, width: '40px' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {planItems.map((item, index) => {
                        const totalFiles = item["Files to Create"].length +
                                         item["Files to Modify"].length +
                                         item["Files to Delete"].length;

                        return (
                            <React.Fragment key={index}>
                                <tr>
                                    <td style={styles.td}>{item.Day}</td>
                                    <td style={styles.td}>{item["Task Title"]}</td>
                                    <td style={styles.td}>{totalFiles} files</td>
                                    <td style={styles.td}>
                                        <div
                                            style={styles.chevronButton}
                                            onClick={() => toggleExpand(index)}
                                        >
                                            {item.isExpanded ? <FaChevronUp /> : <FaChevronDown />}
                                        </div>
                                    </td>
                                </tr>
                                {item.isExpanded && (
                                    <tr style={styles.expandedRow}>
                                        <td colSpan="4" style={styles.td}>
                                            <div style={styles.expandedContent}>
                                                <p style={styles.details}><strong>Task Details:</strong> {item["Task Details"]}</p>
                                                
                                                {item["Files to Create"].length > 0 && (
                                                    <div>
                                                        <h4 style={styles.sectionHeading}>Files to Create:</h4>
                                                        <ul style={styles.fileList}>
                                                            {item["Files to Create"].map((file, i) => (
                                                                <li key={i} style={styles.fileListItem}>
                                                                    🆕 {file}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}

                                                {item["Files to Modify"].length > 0 && (
                                                    <div>
                                                        <h4 style={styles.sectionHeading}>Files to Modify:</h4>
                                                        <ul style={styles.fileList}>
                                                            {item["Files to Modify"].map((file, i) => (
                                                                <li key={i} style={styles.fileListItem}>
                                                                    ✏️ {file}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}

                                                {item["Files to Delete"].length > 0 && (
                                                    <div>
                                                        <h4 style={styles.sectionHeading}>Files to Delete:</h4>
                                                        <ul style={styles.fileList}>
                                                            {item["Files to Delete"].map((file, i) => (
                                                                <li key={i} style={styles.fileListItem}>
                                                                    🗑️ {file}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default PlanTab;