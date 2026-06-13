import { FalizVoiceAPI } from "../types/api.types";

class VoiceService {
  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];
  private onDataAvailableCallback: ((chunk: Blob) => void) | null = null;
  private onStopCallback: ((audioBlob: Blob) => void) | null = null;

  constructor() {
    if (window.faliz && window.faliz.voice) {
      // If running in Electron, use the exposed IPC methods
      window.faliz.voice.onAudioChunk((chunk) => {
        const blob = new Blob([chunk], { type: 'audio/webm' });
        this.audioChunks.push(blob);
        this.onDataAvailableCallback?.(blob);
      });
    }
  }

  public async startCapture(onDataAvailable?: (chunk: Blob) => void, onStop?: (audioBlob: Blob) => void): Promise<void> {
    this.onDataAvailableCallback = onDataAvailable || null;
    this.onStopCallback = onStop || null;

    if (window.faliz && window.faliz.voice) {
      window.faliz.voice.startCapture();
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.mediaRecorder = new MediaRecorder(stream);
      this.audioChunks = [];

      this.mediaRecorder.ondataavailable = (event) => {
        this.audioChunks.push(event.data);
        this.onDataAvailableCallback?.(event.data);
      };

      this.mediaRecorder.onstop = () => {
        const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
        this.onStopCallback?.(audioBlob);
      };

      this.mediaRecorder.start();
      console.log("Voice capture started (Web API).");
    } catch (error) {
      console.error("Error starting voice capture:", error);
      throw error;
    }
  }

  public stopCapture(): Blob | null {
    if (window.faliz && window.faliz.voice) {
      window.faliz.voice.stopCapture();
      // In Electron, the onStopCallback would be triggered by the main process
      return null;
    }

    if (this.mediaRecorder && this.mediaRecorder.state === 'recording') {
      this.mediaRecorder.stop();
      console.log("Voice capture stopped (Web API).");
      return new Blob(this.audioChunks, { type: 'audio/webm' });
    }
    return null;
  }
}

export const voiceService = new VoiceService();
