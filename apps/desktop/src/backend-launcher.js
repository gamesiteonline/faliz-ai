const { spawn } = require("child_process");
const path = require("path");

let backendProcess = null;

function startBackend() {
  const backendPath = path.join(__dirname, "../../backend");
  console.log(`Starting backend from: ${backendPath}`);

  // In a production build, you might have a pre-built executable
  // For development, we'll assume Python and dependencies are available
  backendProcess = spawn("python3", ["main.py"], {
    cwd: backendPath,
    stdio: "inherit", // Pipe backend output to Electron console
    env: { ...process.env, PYTHONUNBUFFERED: "1" }, // Ensure unbuffered output
  });

  backendProcess.on("error", (err) => {
    console.error("Failed to start backend process:", err);
  });

  backendProcess.on("close", (code) => {
    console.log(`Backend process exited with code ${code}`);
    if (code !== 0) {
      // Optionally restart or notify user
    }
  });

  return backendProcess;
}

function stopBackend(process) {
  if (process) {
    console.log("Stopping backend process...");
    process.kill();
  }
}

module.exports = { startBackend, stopBackend };
