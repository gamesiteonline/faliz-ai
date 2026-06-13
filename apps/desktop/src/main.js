const { app, BrowserWindow, ipcMain, nativeTheme, Tray, Menu } = require("electron");
const path = require("path");
const { autoUpdater } = require("electron-updater");
const { spawn } = require("child_process");
const { startBackend, stopBackend } = require("./backend-launcher");

let mainWindow;
let tray;
let backendProcess = null;

const createMainWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    frame: false, // Frameless window
    titleBarStyle: "hidden", // Use custom title bar
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      webSecurity: true,
      enableRemoteModule: false,
    },
    icon: path.join(__dirname, "../assets/icon.png"),
    show: false, // Don't show until ready
  });

  // Load the frontend application
  const frontendUrl = app.isPackaged
    ? `file://${path.join(__dirname, "../frontend/dist/index.html")}`
    : "http://localhost:3000";

  mainWindow.loadURL(frontendUrl);

  mainWindow.on("ready-to-show", () => {
    mainWindow.show();
    if (process.env.NODE_ENV === "development") {
      mainWindow.webContents.openDevTools();
    }
    autoUpdater.checkForUpdatesAndNotify();
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  // Handle deep linking
  app.setAsDefaultProtocolClient("faliz");
  app.on("open-url", (event, url) => {
    event.preventDefault();
    if (mainWindow) {
      mainWindow.webContents.send("faliz-deep-link", url);
    }
  });
};

const createTray = () => {
  tray = new Tray(path.join(__dirname, "../assets/tray-icon.png"));
  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Show FALIZ AI",
      click: () => {
        if (mainWindow) {
          mainWindow.show();
        }
      },
    },
    {
      label: "Quit FALIZ AI",
      click: () => {
        app.quit();
      },
    },
  ]);
  tray.setToolTip("FALIZ AI");
  tray.setContextMenu(contextMenu);
  tray.on("click", () => {
    if (mainWindow) {
      mainWindow.show();
    }
  });
};

app.on("ready", async () => {
  nativeTheme.themeSource = "dark";

  // Start backend process
  backendProcess = startBackend();

  // Wait for backend health check before creating main window
  const backendReady = await new Promise((resolve) => {
    const checkInterval = setInterval(async () => {
      try {
        const response = await fetch("http://localhost:8000/health");
        if (response.ok) {
          clearInterval(checkInterval);
          resolve(true);
        }
      } catch (error) {
        console.log("Waiting for backend...");
      }
    }, 1000);
  });

  if (backendReady) {
    createMainWindow();
    createTray();
  } else {
    console.error("Backend failed to start.");
    app.quit();
  }

  // Global keyboard shortcut: Ctrl+Shift+F to show/hide
  ipcMain.on("set-global-shortcut", () => {
    // This would typically be registered with globalShortcut.register
    // but for security reasons, it's often handled by the OS or a separate utility
    // For demonstration, we'll just log it.
    console.log("Global shortcut Ctrl+Shift+F registered (simulated)");
  });

  // Auto-start on system boot (Electron Login Items)
  app.setLoginItemSettings({
    openAtLogin: true,
    path: app.getPath("exe"),
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow();
  }
});

app.on("before-quit", () => {
  stopBackend(backendProcess);
});

// Auto-updater events
autoUpdater.on("update-available", () => {
  mainWindow.webContents.send("update_available");
});
autoUpdater.on("update-downloaded", () => {
  mainWindow.webContents.send("update_downloaded");
});
autoUpdater.on("error", (err) => {
  console.error("Auto-updater error:", err);
});

// IPC handlers for window controls
ipcMain.on("minimize-window", () => {
  mainWindow.minimize();
});

icpMain.on("maximize-window", () => {
  if (mainWindow.isMaximized()) {
    mainWindow.unmaximize();
  } else {
    mainWindow.maximize();
  }
});

ipcMain.on("close-window", () => {
  mainWindow.close();
});
