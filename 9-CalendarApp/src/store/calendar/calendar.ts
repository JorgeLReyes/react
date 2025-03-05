import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Event } from "../../types";
import { addHours } from "date-fns";

const event: Event = {
  _id: 21367913267312,
  title: "Meeting",
  notes: "Reunion",
  start: new Date(),
  end: addHours(new Date(), 2),
  bgColor: "#fafafa",
  user: {
    id: "123",
    name: "Ingi",
  },
};

interface InitialState {
  events: Event[];
  activeEvent: Event | null;
}

export const initialState: InitialState = {
  events: [event],
  activeEvent: null,
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
        event._id === action.payload._id ? action.payload : event
      );
      state.activeEvent = null;
    },
    deleteEvent: (state) => {
      state.events = state.events.filter(
        (event) => event._id !== state.activeEvent?._id
      );
      state.activeEvent = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setActiveEvent, addNewEvent, updateEvent, deleteEvent } =
  calendarSlice.actions;
