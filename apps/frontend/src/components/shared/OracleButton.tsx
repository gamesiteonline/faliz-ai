import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface OracleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const OracleButton: React.FC<OracleButtonProps> = ({ children, className, ...props }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
        "bg-oracle-DEFAULT text-primary-foreground hover:bg-oracle-dim",
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
};
