import React from 'react';
import { motion } from 'framer-motion';
import { ConversationMessage } from '@/types/chat.types';
import ToolCallBlock from './ToolCallBlock';
import StreamingText from './StreamingText';

interface MessageProps {
  message: ConversationMessage;
}

const Message: React.FC<MessageProps> = ({ message }) => {
  const isUser = message.role === 'user';
  const isFaliz = message.role === 'faliz';
  const isTool = message.role === 'tool';

  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
      variants={messageVariants}
      initial="hidden"
      animate="visible"
    >
      <div
        className={`max-w-[70%] p-3 rounded-lg shadow-md ${isUser
          ? 'bg-cyber-dim text-white' // User messages: right-aligned, dark glass bubble
          : isFaliz
            ? 'bg-surface border border-oracle-DEFAULT text-falizText' // FALIZ messages: left-aligned, amber-bordered bubble
            : 'bg-falizMuted text-falizMutedText' // Tool messages
        }`}
      >
        {isTool ? (
          <ToolCallBlock content={message.content} />
        ) : isFaliz ? (
          <StreamingText text={message.content} />
        ) : (
          <p>{message.content}</p>
        )}
        <span className="block text-right text-xs mt-1 opacity-70">
          {new Date(message.timestamp).toLocaleTimeString()}
        </span>
      </div>
    </motion.div>
  );
};

export default Message;
