import React from 'react';

const PlanTab = () => {
  const planItems = [
    { id: 1, task: "Design UI for new feature", status: "In Progress", assignee: "John Doe", priority: "High" },
    { id: 2, task: "Implement user authentication", status: "Completed", assignee: "Jane Smith", priority: "High" },
    { id: 3, task: "Write unit tests for API", status: "To Do", assignee: "Peter Jones", priority: "Medium" },
    { id: 4, task: "Deploy application to staging", status: "Blocked", assignee: "Alice Brown", priority: "Medium" },
    { id: 5, task: "Review code changes", status: "In Review", assignee: "John Doe", priority: "High" },
  ];

  const styles = {
    container: {
      background: '#fff',
      border: '1px solid #e1e4e8',
      borderRadius: '6px',
      padding: '16px',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
    },
    th: {
      background: '#f6f8fa',
      padding: '8px',
      textAlign: 'left',
      borderBottom: '1px solid #e1e4e8',
      fontWeight: 600,
    },
    td: {
      padding: '8px',
      borderBottom: '1px solid #e1e4e8',
    },
    status: {
      borderRadius: '20px',
      padding: '4px 8px',
      fontSize: '12px',
      fontWeight: 'bold',
      color: '#fff',
    },
    priority: {
      borderRadius: '20px',
      padding: '4px 8px',
      fontSize: '12px',
      fontWeight: 'bold',
      color: '#fff',
    },
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "In Progress": return { ...styles.status, background: "#f9c851" };
      case "Completed": return { ...styles.status, background: "#28a745" };
      case "To Do": return { ...styles.status, background: "#0366d6" };
      case "Blocked": return { ...styles.status, background: "#d73a49" };
      case "In Review": return { ...styles.status, background: "#6f42c1" };
      default: return { ...styles.status, background: "#586069" };
    }
  };

  const getPriorityStyle = (priority) => {
    switch (priority) {
      case "High": return { ...styles.priority, background: "#d73a49" };
      case "Medium": return { ...styles.priority, background: "#f9c851" };
      case "Low": return { ...styles.priority, background: "#28a745" };
      default: return { ...styles.priority, background: "#586069" };
    }
  };

  return (
    <div style={styles.container}>
      <h2>Project Plan</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Task</th>
            <th style={styles.th}>Status</th>
            <th style={styles.th}>Assignee</th>
            <th style={styles.th}>Priority</th>
          </tr>
        </thead>
        <tbody>
          {planItems.map(item => (
            <tr key={item.id}>
              <td style={styles.td}>{item.task}</td>
              <td style={styles.td}><span style={getStatusStyle(item.status)}>{item.status}</span></td>
              <td style={styles.td}>{item.assignee}</td>
              <td style={styles.td}><span style={getPriorityStyle(item.priority)}>{item.priority}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlanTab;
