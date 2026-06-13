import React from 'react';
import { GlassCard } from '../shared/GlassCard';
import { Bell } from 'lucide-react';

interface Notification {
  id: string;
  message: string;
  timestamp: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  { id: '1', message: 'You have 3 back-to-back meetings tomorrow.', timestamp: '2023-10-27T09:00:00Z', read: false },
  { id: '2', message: 'Your task "Prepare Q3 Report" is due today.', timestamp: '2023-10-26T08:00:00Z', read: true },
];

const NotificationsFeed: React.FC = () => {
  const notifications = mockNotifications; // In a real app, this would come from Redux/API

  return (
    <GlassCard title="Notifications" icon={<Bell size={20} className="text-oracle-DEFAULT" />}>
      {notifications.length > 0 ? (
        <ul className="space-y-3">
          {notifications.map(notification => (
            <li key={notification.id} className={`border-b border-falizBorder pb-2 last:border-b-0 last:pb-0 ${notification.read ? 'opacity-60' : ''}`}>
              <p className="text-falizText text-sm">{notification.message}</p>
              <p className="text-falizMutedText text-xs">{new Date(notification.timestamp).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-falizMutedText">No new notifications.</p>
      )}
    </GlassCard>
  );
};

export default NotificationsFeed;
