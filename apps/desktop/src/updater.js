const { autoUpdater } = require("electron-updater");
const { dialog } = require("electron");

autoUpdater.logger = require("electron-log");
autoUpdater.logger.transports.file.level = "info";

function initUpdater(mainWindow) {
  autoUpdater.on("update-available", () => {
    mainWindow.webContents.send("update_available");
  });

  autoUpdater.on("update-downloaded", () => {
    dialog.showMessageBox({
      type: "info",
      title: "Update Available",
      message: "A new version of FALIZ AI has been downloaded. Restart to apply the update.",
      buttons: ["Restart", "Later"],
    }).then((result) => {
      if (result.response === 0) {
        autoUpdater.quitAndInstall();
      }
    });
  });

  autoUpdater.on("error", (err) => {
    console.error("Auto-updater error:", err);
    mainWindow.webContents.send("update_error", err.message);
  });

  // Check for updates every 5 minutes
  setInterval(() => {
    autoUpdater.checkForUpdatesAndNotify();
  }, 5 * 60 * 1000);

  autoUpdater.checkForUpdatesAndNotify();
}

module.exports = { initUpdater };
