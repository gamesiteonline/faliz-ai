import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import CenterPanel from './CenterPanel';
import RightPanel from './RightPanel';
import TitleBar from './TitleBar';
import { useAppSelector } from '@/store/hooks';

const AppLayout: React.FC = () => {
  const isSidebarOpen = useAppSelector((state) => state.ui.isSidebarOpen);
  const isRightPanelOpen = useAppSelector((state) => state.ui.isRightPanelOpen);

  return (
    <div className="flex flex-col h-screen bg-void text-falizText font-body">
      <TitleBar />
      <div className="flex flex-1 overflow-hidden">
        {isSidebarOpen && <Sidebar />}
        <CenterPanel>
          <Outlet /> {/* This is where the main content (views) will be rendered */}
        </CenterPanel>
        {isRightPanelOpen && <RightPanel />}
      </div>
    </div>
  );
};


export default AppLayout;
