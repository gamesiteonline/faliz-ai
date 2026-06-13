import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type OrbState = 'IDLE' | 'LISTENING' | 'THINKING' | 'SPEAKING' | 'ERROR';

interface FalizState {
  orbState: OrbState;
  conversationHistory: { role: 'user' | 'faliz' | 'tool', content: string, timestamp: string }[];
  currentInput: string;
  isSpeaking: boolean;
  isListening: boolean;
  isThinking: boolean;
  proactiveSuggestions: string[];
}

const initialState: FalizState = {
  orbState: 'IDLE',
  conversationHistory: [],
  currentInput: '',
  isSpeaking: false,
  isListening: false,
  isThinking: false,
  proactiveSuggestions: [],
};

const falizSlice = createSlice({
  name: 'faliz',
  initialState,
  reducers: {
    setOrbState: (state, action: PayloadAction<OrbState>) => {
      state.orbState = action.payload;
    },
    addMessageToHistory: (state, action: PayloadAction<{ role: 'user' | 'faliz' | 'tool', content: string }>) => {
      state.conversationHistory.push({ ...action.payload, timestamp: new Date().toISOString() });
    },
    setCurrentInput: (state, action: PayloadAction<string>) => {
      state.currentInput = action.payload;
    },
    setIsSpeaking: (state, action: PayloadAction<boolean>) => {
      state.isSpeaking = action.payload;
    },
    setIsListening: (state, action: PayloadAction<boolean>) => {
      state.isListening = action.payload;
    },
    setIsThinking: (state, action: PayloadAction<boolean>) => {
      state.isThinking = action.payload;
    },
    addProactiveSuggestion: (state, action: PayloadAction<string>) => {
      state.proactiveSuggestions.push(action.payload);
    },
    clearConversationHistory: (state) => {
      state.conversationHistory = [];
    },
  },
});

export const { 
  setOrbState, 
  addMessageToHistory, 
  setCurrentInput, 
  setIsSpeaking, 
  setIsListening, 
  setIsThinking, 
  addProactiveSuggestion, 
  clearConversationHistory 
} = falizSlice.actions;

export default falizSlice.reducer;
