import { Event } from "../../src/types";

interface InitialState {
  events: Event[];
  activeEvent: Event | null;
  isLoadingEvents: boolean;
}

export const events: Event[] = [
  {
    id: 1,
    title: "Birthday 2025!!!",
    notes: "Cumpleaños",
    start: new Date("2025-03-29T00:00:00.000Z"),
    end: new Date("2025-03-29T00:30:00.000Z"),
  },
  {
    id: 2,
    title: "Birthday 2026!!!",
    notes: "Cumpleaños 2",
    start: new Date("2025-04-29T00:00:00.000Z"),
    end: new Date("2025-04-29T00:30:00.000Z"),
  },
];

export const inicialState: InitialState = {
  events: [],
  activeEvent: null,
  isLoadingEvents: false,
};

export const calendarWithEventsState: InitialState = {
  events: [...events],
  activeEvent: null,
  isLoadingEvents: false,
};

export const calendarWithActiveEventsState: InitialState = {
  events: [...events],
  activeEvent: { ...events[0] },
  isLoadingEvents: false,
};
