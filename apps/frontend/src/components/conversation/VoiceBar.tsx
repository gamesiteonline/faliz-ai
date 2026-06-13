import React, { useState } from 'react';
import { Mic, Send, Paperclip, StopCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { setCurrentInput, addMessageToHistory, setIsListening, setIsSpeaking, setIsThinking } from '@/store/slices/faliz.slice';
import { useSendMessageMutation } from '@/store/api/chat.api';
import { OracleButton } from '../shared/OracleButton';

const VoiceBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentInput = useAppSelector((state) => state.faliz.currentInput);
  const isListening = useAppSelector((state) => state.faliz.isListening);
  const isSpeaking = useAppSelector((state) => state.faliz.isSpeaking);
  const isThinking = useAppSelector((state) => state.faliz.isThinking);
  const [sendMessage, { isLoading }] = useSendMessageMutation();

  const [isVoiceMode, setIsVoiceMode] = useState(true);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setCurrentInput(e.target.value));
  };

  const handleSendMessage = async () => {
    if (currentInput.trim() === '') return;

    dispatch(addMessageToHistory({ role: 'user', content: currentInput }));
    dispatch(setCurrentInput(''));
    dispatch(setIsThinking(true));

    try {
      const result = await sendMessage({ message: currentInput }).unwrap();
      dispatch(addMessageToHistory({ role: 'faliz', content: result.response }));
      // Assuming result also contains tool calls or other info
      if (result.history) {
        // Update conversation history with potential tool calls from backend
        // This might need more sophisticated merging logic depending on backend response structure
      }
    } catch (error) {
      console.error('Failed to send message:', error);
      dispatch(addMessageToHistory({ role: 'faliz', content: 'I apologize, but I encountered an error while processing your request.' }));
    } finally {
      dispatch(setIsThinking(false));
    }
  };

  const handleVoiceToggle = () => {
    setIsVoiceMode(!isVoiceMode);
    // Stop any ongoing voice processes if mode changes
    dispatch(setIsListening(false));
    dispatch(setIsSpeaking(false));
  };

  const handleMicClick = () => {
    if (isListening) {
      dispatch(setIsListening(false));
      // Trigger speech-to-text processing here
      // For now, simulate sending the captured text
      if (currentInput.trim() !== '') {
        handleSendMessage();
      }
    } else {
      dispatch(setIsListening(true));
      dispatch(setCurrentInput('')); // Clear input when starting voice
      // Start voice capture service
      if (window.faliz && window.faliz.voice) {
        window.faliz.voice.startCapture();
      }
    }
  };

  // Placeholder for waveform visualization
  const WaveformVisualizer = () => (
    <div className="flex items-center justify-center h-8 w-full bg-void rounded-md px-2">
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="w-1 h-4 bg-cyber-DEFAULT mx-[1px] rounded-full"
          animate={{ scaleY: isListening ? [0.5, 1, 0.5] : 0.5 }}
          transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.05 }}
        />
      ))}
    </div>
  );

  return (
    <div className="flex items-center space-x-3">
      <OracleButton onClick={handleVoiceToggle} className="p-2">
        {isVoiceMode ? <Mic size={20} /> : <Paperclip size={20} />}
      </OracleButton>

      {isVoiceMode ? (
        <div className="flex-1 flex items-center space-x-3">
          {isListening ? (
            <div className="flex-1">
              <WaveformVisualizer />
            </div>
          ) : (
            <input
              type="text"
              value={currentInput}
              onChange={handleInputChange}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Say 'Hey Faliz' or type a message..."
              className="flex-1 p-3 rounded-lg bg-surface border border-falizBorder focus:outline-none focus:ring-1 focus:ring-oracle-DEFAULT"
              disabled={isLoading || isSpeaking || isThinking}
            />
          )}
          <OracleButton onClick={handleMicClick} className="p-2" disabled={isLoading || isSpeaking || isThinking}>
            {isListening ? <StopCircle size={20} /> : <Mic size={20} />}
          </OracleButton>
        </div>
      ) : (
        <div className="flex-1 flex items-center space-x-3">
          <input
            type="text"
            value={currentInput}
            onChange={handleInputChange}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type a message..."
            className="flex-1 p-3 rounded-lg bg-surface border border-falizBorder focus:outline-none focus:ring-1 focus:ring-oracle-DEFAULT"
            disabled={isLoading || isSpeaking || isThinking}
          />
          <OracleButton onClick={handleSendMessage} className="p-2" disabled={isLoading || isSpeaking || isThinking}>
            <Send size={20} />
          </OracleButton>
        </div>
      )}
    </div>
  );
};

export default VoiceBar;
