import React from 'react';
import { GlassCard } from '../shared/GlassCard';
import { CalendarDays } from 'lucide-react';
import { useGetCalendarEventsQuery } from '@/store/api/calendar.api';

const UpcomingEvents: React.FC = () => {
  const { data: events, isLoading, isError } = useGetCalendarEventsQuery();

  if (isLoading) return <GlassCard title="Upcoming Events"><p>Loading events...</p></GlassCard>;
  if (isError) return <GlassCard title="Upcoming Events"><p className="text-danger">Failed to load events.</p></GlassCard>;

  const upcoming = events?.filter(event => new Date(event.endTime) > new Date()).sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime()).slice(0, 3);

  return (
    <GlassCard title="Upcoming Events" icon={<CalendarDays size={20} className="text-oracle-DEFAULT" />}>
      {upcoming && upcoming.length > 0 ? (
        <ul className="space-y-3">
          {upcoming.map(event => (
            <li key={event.id} className="border-b border-falizBorder pb-2 last:border-b-0 last:pb-0">
              <p className="text-falizText font-semibold">{event.title}</p>
              <p className="text-falizMutedText text-sm">{new Date(event.startTime).toLocaleString()} - {new Date(event.endTime).toLocaleTimeString()}</p>
              {event.location && <p className="text-falizMutedText text-xs">{event.location}</p>}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-falizMutedText">No upcoming events.</p>
      )}
    </GlassCard>
  );
};

export default UpcomingEvents;
