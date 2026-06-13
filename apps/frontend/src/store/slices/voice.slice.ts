import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface VoiceState {
  isCapturing: boolean;
  audioChunks: Blob[];
  transcription: string;
  isSpeaking: boolean;
  speakingQueue: string[];
}

const initialState: VoiceState = {
  isCapturing: false,
  audioChunks: [],
  transcription: '',
  isSpeaking: false,
  speakingQueue: [],
};

const voiceSlice = createSlice({
  name: 'voice',
  initialState,
  reducers: {
    startVoiceCapture: (state) => {
      state.isCapturing = true;
      state.audioChunks = [];
      state.transcription = '';
    },
    stopVoiceCapture: (state) => {
      state.isCapturing = false;
    },
    addAudioChunk: (state, action: PayloadAction<Blob>) => {
      state.audioChunks.push(action.payload);
    },
    setTranscription: (state, action: PayloadAction<string>) => {
      state.transcription = action.payload;
    },
    setIsSpeaking: (state, action: PayloadAction<boolean>) => {
      state.isSpeaking = action.payload;
    },
    addToSpeakingQueue: (state, action: PayloadAction<string>) => {
      state.speakingQueue.push(action.payload);
    },
    removeFromSpeakingQueue: (state) => {
      state.speakingQueue.shift();
    },
    clearSpeakingQueue: (state) => {
      state.speakingQueue = [];
    },
  },
});

export const {
  startVoiceCapture,
  stopVoiceCapture,
  addAudioChunk,
  setTranscription,
  setIsSpeaking,
  addToSpeakingQueue,
  removeFromSpeakingQueue,
  clearSpeakingQueue,
} = voiceSlice.actions;

export default voiceSlice.reducer;
