import React from 'react';

const NotificationTab = () => {
  const notifications = [
    { id: 1, message: "New commit pushed to main branch", time: "5 minutes ago" },
    { id: 2, message: "Pull request #12 needs review", time: "30 minutes ago" },
    { id: 3, message: "Issue #4 assigned to you", time: "1 hour ago" },
    { id: 4, message: "Deployment to production successful", time: "2 hours ago" },
    { id: 5, message: "New follower: RandomUser123", time: "1 day ago" },
  ];

  const styles = {
    container: {
      background: '#fff',
      border: '1px solid #e1e4e8',
      borderRadius: '6px',
      padding: '16px',
    },
    notificationItem: {
      padding: '12px',
      borderBottom: '1px solid #e1e4e8',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    message: {
      flexGrow: 1,
    },
    time: {
      color: '#586069',
      fontSize: '0.8em',
    },
  };

  return (
    <div style={styles.container}>
      <h2>Notifications</h2>
      {notifications.map(notification => (
        <div key={notification.id} style={styles.notificationItem}>
          <div style={styles.message}>{notification.message}</div>
          <div style={styles.time}>{notification.time}</div>
        </div>
      ))}
    </div>
  );
};

export default NotificationTab;
