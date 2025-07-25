/**
 * Utility functions for launching local servers for project demos
 */

/**
 * Attempts to launch a local development server for a project
 * Note: This requires Electron or similar environment with Node.js integration
 * to actually spawn a server process. In a browser-only environment, it will
 * show instructions instead.
 */
export const launchLocalServer = async (projectPath: string): Promise<void> => {
  // Check if we're in an Electron-like environment with Node.js access
  if (typeof window !== 'undefined' && 'electron' in window) {
    try {
      // @ts-ignore - Electron environment
      const { shell } = (window as any).electron;
      
      // Try to open a terminal and run a local server
      const command = process.platform === 'win32' 
        ? `start cmd.exe /k "cd ${projectPath} && npx serve"` 
        : `osascript -e 'tell application "Terminal" to do script "cd ${projectPath} && npx serve"'`;
      
      await shell.executeCommand(command);
      
      // Open the browser to the local server
      setTimeout(() => {
        shell.openExternal('http://localhost:3000');
      }, 1500);
      
    } catch (error) {
      console.error('Failed to launch local server:', error);
      showServerInstructions(projectPath);
    }
  } else {
    // We're in a regular browser environment, show instructions
    showServerInstructions(projectPath);
  }
};

/**
 * Shows instructions on how to manually launch a local server
 */
const showServerInstructions = (projectPath: string): void => {
  const instructions = `
    To view this project locally:
    
    1. Clone the repository from GitHub
    2. Navigate to the project directory: ${projectPath}
    3. Install dependencies if needed: npm install
    4. Run a local server using one of these commands:
       - npx serve
       - npx http-server
       - python -m http.server
       
    The project will be available at http://localhost:3000 or http://localhost:8000
    depending on which server you use.
  `;
  
  alert(instructions.replace(/\s+/g, ' ').trim());
  
  // Open the GitHub repo page as a fallback
  const repoName = projectPath.split('/').pop();
  if (repoName) {
    window.open(`https://github.com/Mrpatra013/${repoName}`, '_blank');
  }
};
