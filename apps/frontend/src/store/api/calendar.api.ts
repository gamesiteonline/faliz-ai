import { baseApi } from './base.api';
import { CalendarEvent } from '../../types/calendar.types';

export const calendarApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCalendarEvents: builder.query<CalendarEvent[], void>({
      query: () => '/calendar/events',
      providesTags: ['CalendarEvent'],
    }),
    addCalendarEvent: builder.mutation<CalendarEvent, Partial<CalendarEvent>>({
      query: (newEvent) => ({
        url: '/calendar/events',
        method: 'POST',
        body: newEvent,
      }),
      invalidatesTags: ['CalendarEvent'],
    }),
    updateCalendarEvent: builder.mutation<CalendarEvent, { id: string; updates: Partial<CalendarEvent> }>({
      query: ({ id, updates }) => ({
        url: `/calendar/events/${id}`,
        method: 'PUT',
        body: updates,
      }),
      invalidatesTags: ['CalendarEvent'],
    }),
    deleteCalendarEvent: builder.mutation<void, string>({
      query: (id) => ({
        url: `/calendar/events/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['CalendarEvent'],
    }),
  }),
});

export const { useGetCalendarEventsQuery, useAddCalendarEventMutation, useUpdateCalendarEventMutation, useDeleteCalendarEventMutation } = calendarApi;
