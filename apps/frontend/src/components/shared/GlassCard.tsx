import React from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  title: string;
  icon?: React.ReactNode;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, title, icon }) => {
  return (
    <motion.div
      className="bg-surface/70 backdrop-blur-lg border border-falizBorder rounded-lg shadow-xl p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center mb-3">
        {icon && <div className="mr-2">{icon}</div>}
        <h3 className="text-lg font-syne font-semibold text-falizText">{title}</h3>
      </div>
      {children}
    </motion.div>
  );
};
