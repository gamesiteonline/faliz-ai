import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ListTodo, CalendarDays, Mail, Book, BarChart2, Lightbulb, Settings, Brain, Mic, MessageSquare, Sun, Cloud, Wifi, Cpu, Memory } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { setActiveView, toggleSidebar } from '@/store/slices/ui.slice';
import { OracleButton } from '../shared/OracleButton';
import { StatusBadge } from '../shared/StatusBadge';

const navItems = [
  { name: 'Home', icon: Home, path: '/' },
  { name: 'Tasks', icon: ListTodo, path: '/tasks' },
  { name: 'Calendar', icon: CalendarDays, path: '/calendar' },
  { name: 'Email', icon: Mail, path: '/email' },
  { name: 'Notes', icon: Book, path: '/notes' },
  { name: 'Analytics', icon: BarChart2, path: '/analytics' },
  { name: 'Smart Home', icon: Lightbulb, path: '/smarthome' },
  { name: 'Settings', icon: Settings, path: '/settings' },
];

const Sidebar: React.FC = () => {
  const dispatch = useAppDispatch();
  const activeView = useAppSelector((state) => state.ui.activeView);
  const isSidebarOpen = useAppSelector((state) => state.ui.isSidebarOpen);
  const { cpuUsage, memoryUsage } = useAppSelector((state) => state.system.metrics);

  const sidebarVariants = {
    open: { width: 280, opacity: 1, transition: { duration: 0.3 } },
    closed: { width: 80, opacity: 1, transition: { duration: 0.3 } },
  };

  return (
    <motion.aside
      className="flex flex-col bg-surface border-r border-falizBorder p-4 shadow-lg"
      initial="open"
      animate={isSidebarOpen ? "open" : "closed"}
      variants={sidebarVariants}
    >
      <div className="flex items-center justify-between mb-8">
        {isSidebarOpen ? (
          <h1 className="text-2xl font-syne font-bold text-oracle-DEFAULT">FALIZ AI</h1>
        ) : (
          <Home size={24} className="text-oracle-DEFAULT" />
        )}
        <OracleButton onClick={() => dispatch(toggleSidebar())} className="p-2">
          {isSidebarOpen ? '<' : '>'}
        </OracleButton>
      </div>

      <nav className="flex-1">
        <ul>
          {navItems.map((item) => (
            <li key={item.name} className="mb-2">
              <Link
                to={item.path}
                onClick={() => dispatch(setActiveView(item.name.toLowerCase()))}
                className={`flex items-center p-3 rounded-lg transition-colors duration-200
                  ${activeView === item.name.toLowerCase()
                    ? 'bg-oracle-dim text-falizText'
                    : 'text-falizMutedText hover:bg-falizMuted hover:text-falizText'}
                `}
              >
                <item.icon size={20} className="mr-3" />
                {isSidebarOpen && <span className="font-inter text-sm">{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-auto pt-4 border-t border-falizBorder">
        {isSidebarOpen && (
          <div className="mb-4">
            <h3 className="text-xs text-falizMutedText uppercase mb-2">System Health</h3>
            <div className="flex items-center mb-1">
              <Cpu size={16} className="text-cyber-DEFAULT mr-2" />
              <span className="text-sm text-falizText">CPU: {cpuUsage ? cpuUsage.toFixed(1) : 'N/A'}%</span>
            </div>
            <div className="flex items-center">
              <Memory size={16} className="text-cyber-DEFAULT mr-2" />
              <span className="text-sm text-falizText">RAM: {memoryUsage ? memoryUsage.toFixed(1) : 'N/A'}%</span>
            </div>
          </div>
        )}
        <div className="flex items-center justify-between">
          <StatusBadge type="online" />
          {isSidebarOpen && <span className="text-xs text-falizMutedText">v1.0.0-production</span>}
        </div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
