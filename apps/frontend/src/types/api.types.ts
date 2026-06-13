export interface FalizVoiceAPI {
  startCapture: () => void;
  stopCapture: () => void;
  onAudioChunk: (callback: (chunk: ArrayBuffer) => void) => void;
}

export interface FalizIPCAPI {
  getMetrics: () => Promise<any>;
  launchApp: (name: string) => void;
  screenshot: () => Promise<string>;
  clipboardGet: () => Promise<string>;
  clipboardSet: (text: string) => void;
}

export interface FalizNotificationsAPI {
  show: (title: string, body: string) => void;
}

export interface FalizWindowAPI {
  minimize: () => void;
  maximize: () => void;
  close: () => void;
}

declare global {
  interface Window {
    faliz?: {
      voice?: FalizVoiceAPI;
      system?: FalizIPCAPI;
      notifications?: FalizNotificationsAPI;
      window?: FalizWindowAPI;
      onDeepLink?: (callback: (url: string) => void) => void;
    };
  }
}
