import React from 'react';

const SettingsTab = () => {
  const styles = {
    container: {
      background: '#fff',
      border: '1px solid #e1e4e8',
      borderRadius: '6px',
      padding: '16px',
      maxWidth: '600px',
      margin: '0 auto',
    },
    settingGroup: {
      marginBottom: '20px',
    },
    settingTitle: {
      fontSize: '1.2em',
      fontWeight: 'bold',
      marginBottom: '10px',
    },
    formGroup: {
      marginBottom: '15px',
    },
    label: {
      display: 'block',
      fontWeight: 'bold',
      marginBottom: '5px',
    },
    input: {
      width: '100%',
      padding: '8px',
      border: '1px solid #e1e4e8',
      borderRadius: '6px',
    },
    textarea: {
      width: '100%',
      padding: '8px',
      border: '1px solid #e1e4e8',
      borderRadius: '6px',
      resize: 'vertical',
    },
    button: {
      background: '#28a745',
      color: 'white',
      border: 'none',
      padding: '10px 15px',
      borderRadius: '6px',
      cursor: 'pointer',
    },
  };

  return (
    <div style={styles.container}>
      <h2>Settings</h2>

      <div style={styles.settingGroup}>
        <h3 style={styles.settingTitle}>Profile</h3>
        <div style={styles.formGroup}>
          <label style={styles.label}>Username</label>
          <input type="text" style={styles.input} defaultValue="Raahim2" />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Email</label>
          <input type="email" style={styles.input} defaultValue="raahim@example.com" />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Bio</label>
          <textarea style={styles.textarea} defaultValue="Software Engineer | Open Source Enthusiast"></textarea>
        </div>
      </div>

      <div style={styles.settingGroup}>
        <h3 style={styles.settingTitle}>Notifications</h3>
        <div style={styles.formGroup}>
          <label style={styles.label}>Email Notifications</label>
          <select style={styles.input}>
            <option>Enabled</option>
            <option>Disabled</option>
          </select>
        </div>
      </div>

      <button style={styles.button}>Save Changes</button>
    </div>
  );
};

export default SettingsTab;
