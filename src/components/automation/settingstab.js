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
  const [programmingLanguage, setProgrammingLanguage] = useState(null);
  const [frameworksLibraries, setFrameworksLibraries] = useState([]);
  const [automationDuration, setAutomationDuration] = useState(5);
  const [repoUrl, setRepoUrl] = useState('');
  const [isAutomated, setIsAutomated] = useState(false);
  const [buttonText, setButtonText] = useState('Start Automation');
  const [template , settemplate] = useState("Blank");
  const isInitialMount = useRef(true);
  const [showAlert, setShowAlert] = useState({ show: false, message: '', type: 'success' });

  const languageOptions = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'csharp', label: 'C#' },
    { value: 'php', label: 'PHP' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'ruby', label: 'Ruby' },
    { value: 'go', label: 'Go' },
    { value: 'kotlin', label: 'Kotlin' },
    { value: 'swift', label: 'Swift' },
    { value: 'c', label: 'C' },
    { value: 'c++', label: 'C++'}
];


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
            setTaskDescription(firstItem.taskDescription || '');
            setProgrammingLanguage(languageOptions.find(option => option.value === firstItem.programmingLanguage) || null);
            setFrameworksLibraries(firstItem.frameworksLibraries ? firstItem.frameworksLibraries.map(lib => ({ label: lib, value: lib })) : []);
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
  }, [API_KEY, languageOptions, automation_name]);

  const generatePlan = async () => {
    try {
      // const prompt = `Given the task: '${taskDescription}' and template: '${template}', generate a step-by-step project plan. Focus on the actual implementation phases (no initialization or deployment tasks). Provide a daily breakdown, with one task per day. Each task should include the title and a brief description of the approach. The output should be an array with daily tasks, e.g., ['Day 1: Task title - Brief approach', 'Day 2: Task title - Brief approach', ...]. The tasks should be logical, feasible, and progressive for building the project. The duration of the tasks should be appropriate to complete in one day give a array of length ${automationDuration}. In array`;
      const prompt = `Given the task: '${taskDescription}' and template: '${template}', generate a step-by-step project plan. Focus on the implementation phases only, excluding initialization and deployment. Provide ${automationDuration} tasks, each with a title and brief description in this format: 'Task title - Brief approach'. Ensure all tasks are logical, feasible, and progressively build the project , Only output in a generalized format that is ['Task title here - Brief approach', 'Task title here - Brief approach', ...] nothing else!`
      const response = await chatbot(prompt);
      console.log(response)
      const formattedArray = JSON.parse(response.replace(/'/g, '"'));
      console.log(formattedArray)

      return formattedArray;

    } catch (error) {
      console.error("Error generating or parsing plan:", error);
      throw error; // Re-throw to be caught by handleSubmit
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
      programmingLanguage: programmingLanguage ? programmingLanguage.value : null,
      frameworksLibraries: frameworksLibraries.map(option => option.value),
      automationDuration,
    };

    let plan = null;

    if (!isAutomated) { // Only generate the plan when starting automation
      try {
        plan = await generatePlan();
        settings.projectPlan = plan; // Add the generated plan to the settings
        settings.createdAt = new Date().toISOString(); // Add the current date
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
            <label style={styles.label}>Programming Language</label>
            <div style={styles.select}>
              <Select
                options={languageOptions}
                value={programmingLanguage}
                onChange={(selectedOption) => setProgrammingLanguage(selectedOption)}
                placeholder="Select a language"
              />
            </div>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Frameworks/Libraries</label>
            <div style={styles.select}>
              <CreatableSelect
                isMulti
                options={[]}
                value={frameworksLibraries}
                onChange={(selectedOptions) => setFrameworksLibraries(selectedOptions || [])}
                placeholder="Enter frameworks/libraries (e.g., React, TensorFlow)"
              />
            </div>
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

       
      </form>
    </div>
  );
};

export default SettingsTab;
