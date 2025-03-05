export interface CalendarEventProps {
  continuesAfter: boolean;
  continuesPrior: boolean;
  event: Event;
  isAllDay: null;
  localizer: Localizer;
  slotEnd: Date;
  slotStart: Date;
  title: string;
}

export interface Event {
  _id?: number;
  title?: string;
  notes?: string;
  start: Date;
  end: Date;
  bgColor?: string;
  user?: {
    id: string;
    name: string;
  };
}

export interface User {
  id: string;
  name: string;
}

export interface Localizer {
  formats: Formats;
  segmentOffset: number;
  messages: Messages;
}

export interface Formats {
  dateFormat: string;
  dayFormat: string;
  weekdayFormat: string;
  timeGutterFormat: string;
  monthHeaderFormat: string;
  dayHeaderFormat: string;
  agendaDateFormat: string;
  agendaTimeFormat: string;
}

export interface Messages {
  date: string;
  time: string;
  event: string;
  allDay: string;
  week: string;
  work_week: string;
  day: string;
  month: string;
  previous: string;
  next: string;
  yesterday: string;
  tomorrow: string;
  today: string;
  agenda: string;
  noEventsInRange: string;
}
