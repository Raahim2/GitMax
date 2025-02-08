// src/components/automation/NewRepoSection.js
import React from "react";

const NewRepoSection = ({ templates, handleTemplateClick }) => {
  return (
    <div className="templates-container">
      <div className="repo-header">
        <h2 className="section-title">Create a New Repository</h2>
      </div>
      <div className="templates-grid">
        {templates.map((template) => (
          <div key={template.name} className="template-card" onClick={() => handleTemplateClick(template)}>
            <img src={template.image} alt={template.name} className="template-image" />
            <h3 className="template-name">{template.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewRepoSection;
