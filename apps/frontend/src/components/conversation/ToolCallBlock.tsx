import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ToolCallBlockProps {
  content: string;
}

const ToolCallBlock: React.FC<ToolCallBlockProps> = ({ content }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-falizMuted rounded-md p-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full text-left text-falizText hover:text-oracle-DEFAULT"
      >
        <span className="font-semibold">Tool Use: {isOpen ? 'Details' : 'Summary'}</span>
        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden mt-2"
      >
        <pre className="bg-void p-2 rounded-md text-xs overflow-x-auto text-falizMutedText">
          <code>{content}</code>
        </pre>
      </motion.div>
    </div>
  );
};

export default ToolCallBlock;
