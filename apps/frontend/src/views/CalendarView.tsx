import React, { useState } from 'react';
import { CalendarDays, PlusCircle } from 'lucide-react';
import { GlassCard } from '@/components/shared/GlassCard';
import { useGetCalendarEventsQuery, useAddCalendarEventMutation } from '@/store/api/calendar.api';
import { CalendarEvent } from '@/types/calendar.types';
import { OracleButton } from '@/components/shared/OracleButton';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const eventSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
  location: z.string().optional(),
});

type EventFormInputs = z.infer<typeof eventSchema>;

const CalendarView: React.FC = () => {
  const { data: events, isLoading, isError, refetch } = useGetCalendarEventsQuery();
  const [addCalendarEvent] = useAddCalendarEventMutation();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<EventFormInputs>({
    resolver: zodResolver(eventSchema),
  });

  const onSubmit = async (data: EventFormInputs) => {
    try {
      await addCalendarEvent(data).unwrap();
      reset();
      refetch();
    } catch (error) {
      console.error("Failed to add event:", error);
    }
  };

  if (isLoading) return <p>Loading calendar...</p>;
  if (isError) return <p className="text-danger">Error loading calendar.</p>;

  // Group events by date for display
  const groupedEvents = events?.reduce((acc, event) => {
    const date = new Date(event.startTime).toDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(event);
    return acc;
  }, {} as Record<string, CalendarEvent[]>) || {};

  return (
    <div className="p-4">
      <h1 className="text-3xl font-syne font-bold text-falizText mb-6">Your Calendar</h1>

      <GlassCard title="Add New Event" icon={<PlusCircle size={20} className="text-cyber-DEFAULT" />}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Event Title"
              {...register("title")}
              className="w-full p-2 rounded bg-void border border-falizBorder focus:outline-none focus:ring-1 focus:ring-oracle-DEFAULT"
            />
            {errors.title && <p className="text-danger text-sm mt-1">{errors.title.message}</p>}
          </div>
          <div>
            <textarea
              placeholder="Description (optional)"
              {...register("description")}
              rows={2}
              className="w-full p-2 rounded bg-void border border-falizBorder focus:outline-none focus:ring-1 focus:ring-oracle-DEFAULT"
            ></textarea>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-falizMutedText mb-1">Start Time</label>
              <input
                type="datetime-local"
                {...register("startTime")}
                className="w-full p-2 rounded bg-void border border-falizBorder focus:outline-none focus:ring-1 focus:ring-oracle-DEFAULT"
              />
              {errors.startTime && <p className="text-danger text-sm mt-1">{errors.startTime.message}</p>}
            </div>
            <div>
              <label className="block text-sm text-falizMutedText mb-1">End Time</label>
              <input
                type="datetime-local"
                {...register("endTime")}
                className="w-full p-2 rounded bg-void border border-falizBorder focus:outline-none focus:ring-1 focus:ring-oracle-DEFAULT"
              />
              {errors.endTime && <p className="text-danger text-sm mt-1">{errors.endTime.message}</p>}
            </div>
          </div>
          <div>
            <input
              type="text"
              placeholder="Location (optional)"
              {...register("location")}
              className="w-full p-2 rounded bg-void border border-falizBorder focus:outline-none focus:ring-1 focus:ring-oracle-DEFAULT"
            />
          </div>
          <OracleButton type="submit" className="w-full">
            <PlusCircle size={18} className="mr-2" /> Add Event
          </OracleButton>
        </form>
      </GlassCard>

      <GlassCard title="Upcoming Events" icon={<CalendarDays size={20} className="text-oracle-DEFAULT" />} className="mt-6">
        {Object.keys(groupedEvents).length > 0 ? (
          <div className="space-y-6">
            {Object.entries(groupedEvents).map(([date, eventsOnDate]) => (
              <div key={date}>
                <h3 className="text-xl font-semibold text-falizText mb-3 border-b border-falizBorder pb-2">{date}</h3>
                <ul className="space-y-3">
                  {eventsOnDate.map(event => (
                    <li key={event.id} className="bg-elevated p-3 rounded-lg border border-falizBorder">
                      <p className="text-falizText font-semibold">{event.title}</p>
                      {event.description && <p className="text-falizMutedText text-sm mt-1">{event.description}</p>}
                      <p className="text-falizMutedText text-xs mt-1">
                        {new Date(event.startTime).toLocaleTimeString()} - {new Date(event.endTime).toLocaleTimeString()}
                      </p>
                      {event.location && <p className="text-falizMutedText text-xs">Location: {event.location}</p>}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-falizMutedText">No calendar events found. Add one above!</p>
        )}
      </GlassCard>
    </div>
  );
};

export default CalendarView;
