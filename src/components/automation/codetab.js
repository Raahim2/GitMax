import React from 'react';

const CodeTab = () => {
  const folderStructure = [
    { name: "src", type: "folder", children: [
      { name: "components", type: "folder", children: [
        { name: "MyComponent.js", type: "file" },
        { name: "AnotherComponent.js", type: "file" }
      ]},
      { name: "App.js", type: "file" },
      { name: "index.js", type: "file" },
    ]},
    { name: "public", type: "folder" },
    { name: "package.json", type: "file" },
    { name: "README.md", type: "file" }
  ];

  const codeSnippet = `
  // src/components/MyComponent.js
  import React from 'react';

  const MyComponent = () => {
    return (
      <div>
        <h1>Hello from MyComponent</h1>
        <p>This is a functional React component.</p>
      </div>
    );
  }

  export default MyComponent;
  `;

  const styles = {
    container: {
      display: 'flex',
      height: `calc(100vh - 75px)`,
      border: '1px solid #ccc',
      borderRadius: '5px',
      overflow: 'hidden', // Hide any overflow
      backgroundColor: '#1e1e1e', // VS Code Dark Theme Background
      color: '#d4d4d4', // VS Code Text Color
    },
    sidebar: {
      width: '200px',
      background: '#252526', // Sidebar Background
      padding: '10px',
      borderRight: '1px solid #333',
      overflowY: 'auto', // Allow scrolling in the sidebar
      flexShrink: 0,
    },
    fileExplorer: {
      listStyleType: 'none',
      padding: 0,
      margin: 0,
    },
    fileExplorerItem: {
      padding: '5px 10px',
      cursor: 'pointer',
      ':hover': {
        background: '#333', // Hover Background
      },
    },
    codeEditor: {
      flex: 1,
      padding: '10px',
      fontFamily: 'monospace',
      whiteSpace: 'pre-wrap',
      overflowX: 'auto',
      minWidth: 0, // Ensures it takes remaining space
    },
  };

  const renderFolderStructure = (items) => {
    return (
      <ul style={styles.fileExplorer}>
        {items.map(item => (
          <li key={item.name} style={styles.fileExplorerItem}>
            {item.name}
            {item.type === "folder" && item.children && renderFolderStructure(item.children)}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <h3>File Explorer</h3>
        {renderFolderStructure(folderStructure)}
      </div>
      <div style={styles.codeEditor}>
        {codeSnippet}
      </div>
    </div>
  );
};

export default CodeTab;
