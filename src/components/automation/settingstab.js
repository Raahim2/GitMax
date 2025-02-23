import React, { useState, useEffect, useRef } from 'react';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useParams } from 'next/navigation';
import { updateData, fetchData } from '@/lib/database';
import chatbot from '@/lib/gemini-1.5';

const SettingsTab = () => {
  const { automation_name } = useParams();
  const [taskDescription, setTaskDescription] = useState('');
  const [automationDuration, setAutomationDuration] = useState(5);
  const [repoUrl, setRepoUrl] = useState('');
  const [isAutomated, setIsAutomated] = useState(false);
  const [buttonText, setButtonText] = useState('Start Automation');
  const [template , settemplate] = useState("Blank");
  const isInitialMount = useRef(true);
  const [showAlert, setShowAlert] = useState({ show: false, message: '', type: 'success' });

 


  const styles = {
    container: {
      background: '#f7f7f7',
      border: '1px solid #d1d5da',
      borderRadius: '10px',
      padding: '24px',
      maxWidth: '800px',
      margin: '20px auto',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)',
      width: '90%',
    },
    settingGroup: {
      marginBottom: '24px',
    },
    settingTitle: {
      fontSize: '1.3em',
      fontWeight: '600',
      marginBottom: '12px',
      color: '#24292e',
    },
    formGroup: {
      marginBottom: '18px',
    },
    label: {
      display: 'block',
      fontWeight: '500',
      marginBottom: '6px',
      color: '#586069',
    },
    input: {
      width: '100%',
      padding: '10px',
      border: '1px solid #d1d5da',
      borderRadius: '8px',
      fontSize: '16px',
      color: '#24292e',
      fontFamily: 'sans-serif',
    },
    textarea: {
      width: '100%',
      padding: '10px',
      border: '1px solid #d1d5da',
      borderRadius: '8px',
      fontSize: '16px',
      color: '#24292e',
      resize: 'vertical',
      fontFamily: 'sans-serif',
      minHeight: '80px',
    },
    select: {
      marginBottom: '18px',
    },
    slider: {
      marginBottom: '20px',
    },
    button: {
      background: '#2ea44f',
      color: 'white',
      border: 'none',
      padding: '12px 20px',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: '600',
      transition: 'background-color 0.2s ease',
      '&:hover': {
        backgroundColor: '#2c974b',
      },
    },
    alert: {
      padding: '10px',
      marginBottom: '15px',
      borderRadius: '4px',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    alertSuccess: {
      backgroundColor: '#d4edda',
      color: '#155724',
      borderColor: '#c3e6cb',
    },
    alertError: {
      backgroundColor: '#f8d7da',
      color: '#721c24',
      borderColor: '#f5c6cb',
    },
  };

  const API_KEY = process.env.NEXT_PUBLIC_PROJECT_CUSTOM_API;

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      const fetchAutomationData = async () => {
        try {
          const data = await fetchData(API_KEY, "GitMax", "Automations", { repoName: automation_name });

          if (data && data.length > 0) {
            const firstItem = data[0];
            setRepoUrl(firstItem.repoUrl);
            settemplate(firstItem.template)
            setTaskDescription(firstItem.taskDescription || '');
            setAutomationDuration(firstItem.automationDuration || 5);

            // Check if automationDuration is undefined
            if (firstItem.automationDuration === undefined) {
              setIsAutomated(false);
              setButtonText('Start Automation');
            } else {
              setIsAutomated(true);
              setButtonText('Update Automation');
            }

          } else {
            setIsAutomated(false);
            setButtonText('Start Automation');
          }
        } catch (error) {
          console.error("Error fetching automation data:", error);
          setIsAutomated(false);
          setButtonText('Start Automation');
        }
      };

      fetchAutomationData();
    }
  }, [API_KEY, automation_name]);

  const generatePlan = async () => {
    try {
      let fileStructure = "";
  
      // Define file structure based on template
      console.log(template)
      if (template === "HTML_CSS_JS") {
        fileStructure = `
        ├── CSS/
        │   └── style.css
        ├── JS/
        │   └── script.js
        ├── index.html
        └── README.md
        `;
      } else if (template === "Flask") {
        fileStructure = `
        ├── static/
        │   ├── css/
        │   │   └── style.css
        │   └── images/
        │       └── logo.png
        ├── templates/
        │   └── index.html
        └── main.py
        `;
      } else if (template === "NEXT") {
        fileStructure = `
        ├── pages/
        │   ├── index.js
        │   └── _app.js
        ├── public/
        │   └── favicon.ico
        ├── styles/
        │   └── globals.css
        ├── package.json
        └── next.config.js
        `;
      } else if (template === "EXPO") {
        fileStructure = `
        ├── App.js
        ├── assets/
        ├── node_modules/
        ├── package.json
        └── app.json
        `;
      } else {
        fileStructure = `
        └── README.md
        `;
      }
  
      const prompt = `
        Generate a JSON response with the following structure and format. Include day-wise tasks, file operations (create, modify, delete), and specific coding instructions. Use the provided project description, template, and duration to create a consistent and complete JSON.
  
        Project Details:
  
        ProjectDesc: ${taskDescription}
        Template: ${template}
        Duration: ${automationDuration}
        JSON Structure:
  
        {
          "Project Overview": {
            "Project Name": "[Project Title]",
            "Project Description": "[Detailed description based on user prompt]",
            "Template": "[Selected Template]",
            "Duration": "[Total Days]"
          },
          "Default File Structure": "${fileStructure}",
          "Daily Breakdown": [
            {
              "Day": 1,
              "Task Title": "[Task Title]",
              "Files to Create": ["[List files]"],
              "Files to Modify": ["[List files]"],
              "Files to Delete": ["[List files, if any]"],
              "Task Details": "[Detailed explanation of what to implement today]"
            }
            // Repeat for each day up to the total duration
          ]
        }
        Instructions for YOU:
  
        Use the provided project description, template, and duration to define tasks.
        Auto-generate the default file structure based on the template.
        For each day:
        Assign a logical and incremental coding task.
        Clearly state file operations (create/modify/delete).
        Ensure tasks build on previous work to complete the project by the final day.
        Only output the JSON response. No explanations, no extra text [VERY IMPORTANT].
        Focus solely on coding tasks—exclude documentation and deployment.
      `;
      
      const response = await chatbot(prompt);
  
      let lines = response.trim().split('\n');
      let modifiedText = lines.slice(1, -1).join('\n');
  
      let obj = JSON.parse(modifiedText);
      console.log(response)
  
      return obj;
    } catch (error) {
      console.error("Error generating or parsing plan:", error);
      throw error;
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!repoUrl) {
      console.error("Repo URL is not available. Cannot update data.");
      return;
    }

    const settings = {
      taskDescription,
      automationDuration,
    };

    let plan = null;

    if (!isAutomated) { 
      const formattedDate = new Date().toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      });

      try {
        plan = await generatePlan();
        settings.projectPlan = plan; // Add the generated plan to the settings
        settings.createdAt = formattedDate
      } catch (error) {
        console.error("Failed to generate project plan:", error);
        setShowAlert({
          show: true,
          message: "Failed to generate project plan. Automation details may not be complete.",
          type: 'error',
        });
        return; // Exit the handleSubmit function if plan generation fails
      }
    }

    try {
      await updateData(API_KEY, "GitMax", "Automations", { repoUrl: repoUrl }, settings);
      setShowAlert({
        show: true,
        message: `${isAutomated ? 'Updated' : 'Started'} Automation Details!`,
        type: 'success',
      });
    } catch (error) {
      console.error("Error updating data:", error);
      setShowAlert({
        show: true,
        message: "Failed to update automation details.",
        type: 'error',
      });
    }
  };

  return (
    <div style={styles.container}>
      <h2>AI Code Generation Task</h2>
      {showAlert.show && (
        <div
          style={{
            ...styles.alert,
            ...(showAlert.type === 'success' ? styles.alertSuccess : styles.alertError),
          }}
        >
          {showAlert.message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={styles.settingGroup}>
          <h3 style={styles.settingTitle}>Task Details</h3>
          <div style={styles.formGroup}>
            <label style={styles.label}>Task Description</label>
            <textarea
              style={styles.textarea}
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              placeholder="Describe the specific task for the AI to generate code for."
              required
            />
          </div>


          <div style={styles.formGroup}>
            <label style={styles.label}>Automation Duration (Days)</label>
            <div style={styles.slider}>
              <Slider
                min={5}
                max={30}
                defaultValue={5}
                value={automationDuration}
                onChange={(value) => setAutomationDuration(value)}
              />
            </div>
            <p>Selected Duration: {automationDuration} day(s)</p>
          </div>
        </div>

        <button style={styles.button} type="submit">
          {buttonText}
        </button>

        {/* <button  style={styles.button} onClick={generatePlan}>
          Generate Plan BETA
        </button> */}

       
      </form>
    </div>
  );
};

export default SettingsTab;
