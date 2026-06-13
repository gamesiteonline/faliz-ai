import React, { useRef, useEffect } from 'react';
import { useAppSelector } from '@/store/hooks';
import Message from './Message';
import VoiceBar from './VoiceBar';

const ChatView: React.FC = () => {
  const conversationHistory = useAppSelector((state) => state.faliz.conversationHistory);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversationHistory]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {conversationHistory.map((msg, index) => (
          <Message key={index} message={msg} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 border-t border-falizBorder">
        <VoiceBar />
      </div>
    </div>
  );
};

export default ChatView;
