const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("faliz", {
  system: {
    getMetrics: () => ipcRenderer.invoke("get-system-metrics"),
    launchApp: (name) => ipcRenderer.send("launch-app", name),
    screenshot: () => ipcRenderer.invoke("take-screenshot"),
    clipboardGet: () => ipcRenderer.invoke("get-clipboard"),
    clipboardSet: (text) => ipcRenderer.send("set-clipboard", text),
  },
  voice: {
    startCapture: () => ipcRenderer.send("start-voice-capture"),
    stopCapture: () => ipcRenderer.send("stop-voice-capture"),
    onAudioChunk: (callback) => ipcRenderer.on("audio-chunk", (event, chunk) => callback(chunk)),
  },
  notifications: {
    show: (title, body) => ipcRenderer.send("show-notification", title, body),
  },
  window: {
    minimize: () => ipcRenderer.send("minimize-window"),
    maximize: () => ipcRenderer.send("maximize-window"),
    close: () => ipcRenderer.send("close-window"),
  },
  // Expose a way to send deep links to the renderer process
  onDeepLink: (callback) => ipcRenderer.on("faliz-deep-link", (event, url) => callback(url)),
});
