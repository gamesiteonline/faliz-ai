import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface StreamingTextProps {
  text: string;
  delay?: number;
  speed?: number;
}

const StreamingText: React.FC<StreamingTextProps> = ({ text, delay = 0, speed = 20 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setDisplayedText('');
    setCurrentIndex(0);
  }, [text]);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed + delay);
      return () => clearTimeout(timeout);
    }
  }, [text, currentIndex, speed, delay]);

  return (
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.1 }}
      className="whitespace-pre-wrap"
    >
      {displayedText}
    </motion.p>
  );
};

export default StreamingText;
