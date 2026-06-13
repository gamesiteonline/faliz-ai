import React from 'react';
import { motion } from 'framer-motion';

interface CenterPanelProps {
  children: React.ReactNode;
}

const CenterPanel: React.FC<CenterPanelProps> = ({ children }) => {
  return (
    <motion.main
      className="flex-1 flex flex-col bg-surface rounded-lg m-4 p-6 shadow-xl overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {children}
    </motion.main>
  );
};

export default CenterPanel;
