import React from 'react';
import { Wifi, WifiOff } from 'lucide-react';
import { useAppSelector } from '@/store/hooks';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  type: 'online' | 'sync' | 'error';
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ type, className }) => {
  const isOnline = useAppSelector((state) => state.ui.isOnline);

  let icon;
  let text;
  let colorClass;

  switch (type) {
    case 'online':
      icon = isOnline ? <Wifi size={16} /> : <WifiOff size={16} />;
      text = isOnline ? 'Online' : 'Offline';
      colorClass = isOnline ? 'bg-success' : 'bg-danger';
      break;
    case 'sync':
      icon = <Wifi size={16} />;
      text = 'Syncing';
      colorClass = 'bg-cyber-DEFAULT';
      break;
    case 'error':
      icon = <WifiOff size={16} />;
      text = 'Error';
      colorClass = 'bg-danger';
      break;
    default:
      icon = null;
      text = '';
      colorClass = '';
  }

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
        colorClass,
        className
      )}
    >
      {icon && <span className="mr-1">{icon}</span>}
      {text}
    </div>
  );
};
