export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  location?: string;
  allDay: boolean;
  createdAt: string;
  updatedAt: string;
}
