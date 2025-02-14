import React, { useEffect, useState } from 'react';
import { fetchData } from '@/lib/database';
import { useParams } from 'next/navigation';

const NotificationTab = ({session}) => {
  const { automation_name } = useParams();
  const API_KEY = process.env.NEXT_PUBLIC_PROJECT_CUSTOM_API;
  const [fetchedData, setFetchedData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [commitStatus, setCommitStatus] = useState('');


  useEffect(() => {
    const fetchDataFromAPI = async () => {
      setLoading(true);
      const dbName = 'GitMax';
      const collectionName = 'Automations';
      const filterCondition = { repoName: automation_name };
      
      const data = await fetchData(API_KEY, dbName, collectionName, filterCondition);
      
      if (data) {
        setFetchedData(data);
      }
      
      setLoading(false);
    };

    fetchDataFromAPI();
  }, [API_KEY, automation_name]);

  // Helper function to format date
  const formatDate = (dateString) => {
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Helper function to get today's date
  const getTodayDate = () => {
    return formatDate(new Date());
  };

  // Get today's task based on the creation date and automation duration
  const getTodaysTask = (projectPlan, createdAt) => {
    const createdDate = new Date(createdAt);
    const today = new Date();
    
    const differenceInDays = Math.floor((today - createdDate) / (1000 * 60 * 60 * 24));
    
    if (differenceInDays >= 0 && differenceInDays < projectPlan.length) {
      return projectPlan[differenceInDays];
    }
    return 'No task for today';
  };

  const commitFileToGitHub = async () => {
    try {
      const accessToken = session.accessToken;
      const repoOwner = session.user.username; 
      const repoName = automation_name; 
      const filePath = 'hello_world.txt';
  
      // Step 1: Fetch the current content of the file
      const getFileResponse = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`, {
        headers: {
          'Authorization': `token ${accessToken}`,
        },
      });
  
      let currentContent = '';
      let sha = null;
  
      if (getFileResponse.ok) {
        const fileData = await getFileResponse.json();
        currentContent = atob(fileData.content); // Decode Base64 content
        sha = fileData.sha; // Get the SHA for the existing file
      } else {
        console.error('Error fetching file:', await getFileResponse.json());
        setCommitStatus('Failed to fetch existing file.');
        return;
      }
  
      // Step 2: Append new content
      const newContent = `${currentContent}\nHello World`; // Append new line with Hello World
  
      // Step 3: Commit the updated content back to GitHub
      const response = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`, {
        method: 'PUT',
        headers: {
          'Authorization': `token ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: 'Append Hello World to file',
          content: btoa(newContent), 
          sha: sha, 
          branch: 'main',
        }),
      });
  
      if (response.ok) {
        setCommitStatus('File updated successfully!');
      } else {
        setCommitStatus('Failed to update file.');
        console.error('Update error:', await response.json());
      }
    } catch (error) {
      console.error('Error updating file:', error);
      setCommitStatus('An error occurred while updating the file.');
    }
  };
  
  return (
    <div style={{ background: '#fff', border: '1px solid #e1e4e8', borderRadius: '6px', padding: '16px' }}>
      <h2>Notifications</h2>
      
      {/* Commit Button */}
      <button 
        onClick={commitFileToGitHub} 
        style={{ float: 'right', marginBottom: '16px', padding: '8px 12px', backgroundColor: '#4caf50', color: '#fff', borderRadius: '4px', border: 'none' }}
      >
        Commit Hello World
      </button>
      
      {commitStatus && <p>{commitStatus}</p>}

      <h3>Project Details</h3>
      {loading ? (
        <p>Loading...</p>
      ) : fetchedData ? (
        <div>
          <p>Created At: {formatDate(fetchedData[0].createdAt)}</p>
          <p>Today's Date: {getTodayDate()}</p>
          <p>Task Duration: {fetchedData[0].automationDuration} Days</p>
          <p>Today's Task: {getTodaysTask(fetchedData[0].projectPlan, fetchedData[0].createdAt)}</p>
        </div>
      ) : (
        <p>No data found.</p>
      )}
    </div>
  );
};

export default NotificationTab;
