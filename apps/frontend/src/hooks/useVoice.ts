import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { startVoiceCapture, stopVoiceCapture, addAudioChunk, setTranscription, setIsSpeaking } from '@/store/slices/voice.slice';
import { setIsListening } from '@/store/slices/faliz.slice';

interface UseVoiceResult {
  startCapture: () => void;
  stopCapture: () => void;
  speak: (text: string) => void;
  isCapturing: boolean;
  transcription: string;
  isSpeaking: boolean;
}

export const useVoice = (): UseVoiceResult => {
  const dispatch = useAppDispatch();
  const { isCapturing, transcription, isSpeaking } = useAppSelector((state) => state.voice);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    if (window.faliz && window.faliz.voice) {
      // Listen for audio chunks from Electron main process
      window.faliz.voice.onAudioChunk((chunk: ArrayBuffer) => {
        const blob = new Blob([chunk], { type: 'audio/webm' }); // Assuming webm format from Electron
        audioChunksRef.current.push(blob);
        dispatch(addAudioChunk(blob));
      });

      // Listen for transcription results from Electron main process (or backend via SSE)
      // This is a placeholder, actual implementation would involve IPC or SSE from backend
      // window.faliz.voice.onTranscription((text: string) => {
      //   dispatch(setTranscription(text));
      // });
    }
  }, [dispatch]);

  const startCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
        dispatch(addAudioChunk(event.data));
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        // Send audioBlob to backend for transcription
        // For now, simulate transcription
        dispatch(setTranscription('Simulated transcription from captured audio.'));
        dispatch(setIsListening(false)); // Update faliz slice
      };

      mediaRecorderRef.current.start();
      dispatch(startVoiceCapture());
      dispatch(setIsListening(true)); // Update faliz slice
    } catch (error) {
      console.error('Error starting audio capture:', error);
      dispatch(setIsListening(false));
    }
  };

  const stopCapture = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      dispatch(stopVoiceCapture());
    }
  };

  const speak = async (text: string) => {
    dispatch(setIsSpeaking(true));
    // In a real app, this would call your backend TTS API (e.g., ElevenLabs)
    // For now, use Web Speech API or simulate
    try {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = () => {
        dispatch(setIsSpeaking(false));
      };
      speechSynthesis.speak(utterance);
    } catch (error) {
      console.error('Error speaking text:', error);
      dispatch(setIsSpeaking(false));
    }
  };

  return {
    startCapture,
    stopCapture,
    speak,
    isCapturing,
    transcription,
    isSpeaking,
  };
};
