import { FalizIPCAPI } from "../types/api.types";

class IPCService {
  public async getSystemMetrics(): Promise<any> {
    if (window.faliz && window.faliz.system && typeof window.faliz.system.getMetrics === 'function') {
      return window.faliz.system.getMetrics();
    }
    console.warn("IPC: getSystemMetrics not available. Running outside Electron or IPC not exposed.");
    return { cpuUsage: 0, memoryUsage: 0, diskUsage: 0, networkActivity: { upload: 0, download: 0 } };
  }

  public launchApplication(name: string): void {
    if (window.faliz && window.faliz.system && typeof window.faliz.system.launchApp === 'function') {
      window.faliz.system.launchApp(name);
      return;
    }
    console.warn("IPC: launchApp not available. Running outside Electron or IPC not exposed.");
  }

  public async takeScreenshot(): Promise<string> {
    if (window.faliz && window.faliz.system && typeof window.faliz.system.screenshot === 'function') {
      return window.faliz.system.screenshot();
    }
    console.warn("IPC: screenshot not available. Running outside Electron or IPC not exposed.");
    return "";
  }

  public async getClipboardContent(): Promise<string> {
    if (window.faliz && window.faliz.system && typeof window.faliz.system.clipboardGet === 'function') {
      return window.faliz.system.clipboardGet();
    }
    console.warn("IPC: clipboardGet not available. Running outside Electron or IPC not exposed.");
    return "";
  }

  public setClipboardContent(text: string): void {
    if (window.faliz && window.faliz.system && typeof window.faliz.system.clipboardSet === 'function') {
      window.faliz.system.clipboardSet(text);
      return;
    }
    console.warn("IPC: clipboardSet not available. Running outside Electron or IPC not exposed.");
  }
}

export const ipcService = new IPCService();
