import { FalizTTSAPI } from "../types/api.types";

class TTSService {
  public async speak(text: string): Promise<void> {
    if (window.faliz && window.faliz.tts) {
      return window.faliz.tts.speak(text);
    }

    // Fallback to Web Speech API
    return new Promise((resolve, reject) => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = () => resolve();
      utterance.onerror = (event) => reject(event.error);
      speechSynthesis.speak(utterance);
    });
  }
}

export const ttsService = new TTSService();
