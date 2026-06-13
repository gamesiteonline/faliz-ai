import { Routes, Route } from 'react-router-dom';
import HomeView from './views/HomeView';
import TasksView from './views/TasksView';
import CalendarView from './views/CalendarView';
import EmailView from './views/EmailView';
import NotesView from './views/NotesView';
import AnalyticsView from './views/AnalyticsView';
import SmartHomeView from './views/SmartHomeView';
import SettingsView from './views/SettingsView';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeView />} />
      <Route path="/tasks" element={<TasksView />} />
      <Route path="/calendar" element={<CalendarView />} />
      <Route path="/email" element={<EmailView />} />
      <Route path="/notes" element={<NotesView />} />
      <Route path="/analytics" element={<AnalyticsView />} />
      <Route path="/smarthome" element={<SmartHomeView />} />
      <Route path="/settings" element={<SettingsView />} />
      {/* Add more routes for other plugins/views as they are implemented */}
    </Routes>
  );
};

export default AppRouter;
