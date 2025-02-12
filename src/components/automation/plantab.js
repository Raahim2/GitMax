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
            overflowX: 'auto',
        },
        header: {
            fontSize: '20px',
            fontWeight: '600',
            marginBottom: '24px',
            color: '#1a1a1a',
        },
        table: {
            width: '100%',
            borderCollapse: 'collapse',
            minWidth: '800px',
        },
        th: {
            background: '#f8f9fa',
            padding: '12px 16px',
            textAlign: 'left',
            borderBottom: '2px solid #e9ecef',
            fontWeight: '600',
            color: '#495057',
            fontSize: '14px',
        },
        td: {
            padding: '16px',
            borderBottom: '1px solid #e9ecef',
            color: '#212529',
            fontSize: '14px',
            verticalAlign: 'middle',
        },
        status: {
            borderRadius: '20px',
            padding: '6px 12px',
            fontSize: '12px',
            fontWeight: '600',
            color: '#fff',
            display: 'inline-block',
        },
        priority: {
            borderRadius: '20px',
            padding: '6px 12px',
            fontSize: '12px',
            fontWeight: '600',
            color: '#fff',
            display: 'inline-block',
        },
        error: {
            color: '#dc3545',
            marginBottom: '16px',
            fontSize: '14px',
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
            color: '#495057',
        },
        checkbox: {
            width: '18px',
            height: '18px',
            accentColor: '#4dabf7',
        },
        rowHover: {
            transition: 'background-color 0.2s ease',
            '&:hover': {
                backgroundColor: '#f8f9fa',
            },
        },
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case "In Progress": return { ...styles.status, background: "#ffd700" };
            case "Completed": return { ...styles.status, background: "#40c057" };
            case "To Do": return { ...styles.status, background: "#4dabf7" };
            case "Blocked": return { ...styles.status, background: "#ff6b6b" };
            case "In Review": return { ...styles.status, background: "#9775fa" };
            default: return { ...styles.status, background: "#adb5bd" };
        }
    };

    const getPriorityStyle = (priority) => {
        switch (priority) {
            case "High": return { ...styles.priority, background: "#ff6b6b" };
            case "Medium": return { ...styles.priority, background: "#ffd43b" };
            case "Low": return { ...styles.priority, background: "#69db7c" };
            default: return { ...styles.priority, background: "#adb5bd" };
        }
    };

    const formatDate = (date) => {
        const options = {
            weekday: 'short',
            day: 'numeric',
            month: 'short',
        };
        return date.toLocaleDateString('en-US', options);
    };

    useEffect(() => {
        const fetchProjectPlan = async () => {
            try {
                const data = await fetchData(API_KEY, "GitMax", "Automations", { repoName: automation_name });
                
                if (data && data.length > 0) {
                    const firstItem = data[0];
                    if (firstItem.projectPlan && Array.isArray(firstItem.projectPlan)) {
                        const today = new Date();
                        const transformedPlan = firstItem.projectPlan.map((task, index) => ({
                            task: task.split(" - ")[0],
                            fullTask: task,
                            status: index === 0 ? "In Progress" : index < 0 ? "Completed" : "To Do",
                            deadline: formatDate(new Date(today.setDate(today.getDate() + index))),
                            priority: "Medium",
                            isChecked: index <= 0,
                            isExpanded: false,
                        }));
                        setPlanItems(transformedPlan);
                    } else {
                        setError("No valid project plan found");
                    }
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

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>Project Plan</h2>
            {error && <div style={styles.error}>{error}</div>}
            
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.th}>Complete</th>
                        <th style={styles.th}>Task</th>
                        <th style={styles.th}>Status</th>
                        <th style={styles.th}>Deadline</th>
                        <th style={styles.th}>Priority</th>
                        <th style={{ ...styles.th, width: '40px' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {planItems.map((item, index) => (
                        <React.Fragment key={index}>
                            <tr style={styles.rowHover}>
                                <td style={styles.td}>
                                    <input 
                                        type="checkbox" 
                                        checked={item.isChecked} 
                                        disabled
                                        style={styles.checkbox}
                                    />
                                </td>
                                <td style={styles.td}>{item.task}</td>
                                <td style={styles.td}>
                                    <span style={getStatusStyle(item.status)}>
                                        {item.status}
                                    </span>
                                </td>
                                <td style={styles.td}>{item.deadline}</td>
                                <td style={styles.td}>
                                    <span style={getPriorityStyle(item.priority)}>
                                        {item.priority}
                                    </span>
                                </td>
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
                                    <td colSpan="6" style={styles.td}>
                                        <div style={styles.expandedContent}>
                                            {item.fullTask}
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PlanTab;