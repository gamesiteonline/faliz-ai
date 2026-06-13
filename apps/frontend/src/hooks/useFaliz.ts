import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { addMessageToHistory, setIsListening, setIsSpeaking, setIsThinking, setOrbState } from '@/store/slices/faliz.slice';
import { useSendMessageMutation } from '@/store/api/chat.api';

export const useFaliz = () => {
  const dispatch = useAppDispatch();
  const { isListening, isSpeaking, isThinking } = useAppSelector((state) => state.faliz);
  const [sendMessage] = useSendMessageMutation();

  // Effect to manage orb state based on other states
  useEffect(() => {
    if (isListening) {
      dispatch(setOrbState('LISTENING'));
    } else if (isThinking) {
      dispatch(setOrbState('THINKING'));
    } else if (isSpeaking) {
      dispatch(setOrbState('SPEAKING'));
    } else {
      dispatch(setOrbState('IDLE'));
    }
  }, [isListening, isSpeaking, isThinking, dispatch]);

  const sendUserMessage = async (message: string) => {
    if (message.trim() === '') return;

    dispatch(addMessageToHistory({ role: 'user', content: message }));
    dispatch(setIsThinking(true));

    try {
      const result = await sendMessage({ message }).unwrap();
      dispatch(addMessageToHistory({ role: 'faliz', content: result.response }));
      // Handle tool calls or other structured responses here if needed
    } catch (error) {
      console.error('Failed to send message:', error);
      dispatch(addMessageToHistory({ role: 'faliz', content: 'I apologize, but I encountered an error while processing your request.' }));
      dispatch(setOrbState('ERROR'));
    } finally {
      dispatch(setIsThinking(false));
    }
  };

  const startVoiceInput = () => {
    dispatch(setIsListening(true));
    // Integrate with Electron IPC for actual voice capture
    if (window.faliz && window.faliz.voice) {
      window.faliz.voice.startCapture();
    }
  };

  const stopVoiceInput = () => {
    dispatch(setIsListening(false));
    // Integrate with Electron IPC to stop voice capture and get transcription
    if (window.faliz && window.faliz.voice) {
      window.faliz.voice.stopCapture();
      // Assuming a mechanism to get transcription back, e.g., via IPC event
      // For now, we'll simulate it or rely on a separate hook/service
    }
  };

  const speakText = (text: string) => {
    dispatch(setIsSpeaking(true));
    // Integrate with TTS service (e.g., ElevenLabs via backend)
    // For now, simulate speaking
    console.log('FALIZ speaking:', text);
    setTimeout(() => {
      dispatch(setIsSpeaking(false));
    }, text.length * 50); // Simulate speaking time
  };

  return {
    sendUserMessage,
    startVoiceInput,
    stopVoiceInput,
    speakText,
    isListening,
    isSpeaking,
    isThinking,
  };
};
