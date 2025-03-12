import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Event } from "../../types";

interface InitialState {
  events: Event[];
  activeEvent: Event | null;
  isLoadingEvents: boolean;
}

export const initialState: InitialState = {
  events: [],
  activeEvent: null,
  isLoadingEvents: false,
};

export const calendarSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setActiveEvent: (state, action: PayloadAction<Event>) => {
      state.activeEvent = action.payload;
    },
    addNewEvent: (state, action: PayloadAction<Event>) => {
      state.events.push(action.payload);
      state.activeEvent = null;
    },
    updateEvent: (state, action: PayloadAction<Event>) => {
      state.events = state.events.map((event) =>
        event.id === action.payload.id ? action.payload : event
      );
      state.activeEvent = null;
    },
    deleteEvent: (state) => {
      state.events = state.events.filter(
        (event) => event.id !== state.activeEvent?.id
      );
      state.activeEvent = null;
    },
    loadingEvents: (state, { payload }: PayloadAction<Event[]>) => {
      // state.events = payload;
      state.isLoadingEvents = false;
      payload.forEach((event) => {
        const exists = state.events.some((dbEvent) => dbEvent.id === event.id);
        if (!exists) state.events.push(event);
      });
    },
    cleanEvents: (state) => {
      // state.isLoadingEvents=true
      state.activeEvent = null;
      state.events = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setActiveEvent,
  addNewEvent,
  updateEvent,
  deleteEvent,
  loadingEvents,
  cleanEvents,
} = calendarSlice.actions;
