import React from 'react';
import { motion } from 'framer-motion';
import UpcomingEvents from '../widgets/UpcomingEvents';
import TaskSummary from '../widgets/TaskSummary';
import WeatherWidget from '../widgets/WeatherWidget';
import SystemMetrics from '../widgets/SystemMetrics';
import NotificationsFeed from '../widgets/NotificationsFeed';
import { useAppSelector } from '@/store/hooks';

const RightPanel: React.FC = () => {
  const isRightPanelOpen = useAppSelector((state) => state.ui.isRightPanelOpen);

  const panelVariants = {
    open: { width: 320, opacity: 1, transition: { duration: 0.3 } },
    closed: { width: 0, opacity: 0, transition: { duration: 0.3 } },
  };

  return (
    <motion.aside
      className="flex flex-col bg-surface border-l border-falizBorder p-4 shadow-lg overflow-y-auto"
      initial="open"
      animate={isRightPanelOpen ? "open" : "closed"}
      variants={panelVariants}
    >
      {isRightPanelOpen && (
        <div className="space-y-6">
          <h2 className="text-xl font-syne font-bold text-falizText mb-4">Contextual Insights</h2>
          <UpcomingEvents />
          <TaskSummary />
          <WeatherWidget />
          <SystemMetrics />
          <NotificationsFeed />
          {/* Quick actions can be added here */}
        </div>
      )}
    </motion.aside>
  );
};

export default RightPanel;
