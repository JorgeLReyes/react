import { describe, expect, test } from "@jest/globals";
import {
  addNewEvent,
  calendarSlice,
  cleanEvents,
  deleteEvent,
  initialState,
  loadingEvents,
  setActiveEvent,
  updateEvent,
} from "../../../src/store/calendar/calendar";
import {
  calendarWithActiveEventsState,
  calendarWithEventsState,
  events,
} from "../../fixtures/calendarState";
import { Event } from "../../../src/types";

describe("CalendarSlice", () => {
  test("debe de regresar el estado por defecto", () => {
    expect(calendarSlice.getInitialState()).toEqual(initialState);
  });
  test("debe de regresar un evento activo", () => {
    const state = calendarSlice.reducer(
      calendarWithEventsState,
      setActiveEvent(calendarWithActiveEventsState.activeEvent!)
    );
    expect(state).toEqual(calendarWithActiveEventsState);
  });
  test("debe de agreagr un evento", () => {
    const newEvent: Event = {
      id: 3,
      title: "Birthday 2025!!!",
      notes: "Cumpleaños",
      start: new Date("2025-03-29T00:00:00.000Z"),
      end: new Date("2025-03-29T00:30:00.000Z"),
    };

    const state = calendarSlice.reducer(
      calendarWithEventsState,
      addNewEvent(newEvent)
    );
    expect(state.events).toEqual([...calendarWithEventsState.events, newEvent]);
    expect(state.events).toContainEqual(newEvent);
  });
  test("debe de actualizar un evento", () => {
    const event: Event = {
      id: 1,
      title: "Birthday actual!!!",
      notes: "Cumpleaños",
      start: new Date("2025-03-29T00:00:00.000Z"),
      end: new Date("2025-03-29T00:30:00.000Z"),
    };

    const state = calendarSlice.reducer(
      calendarWithEventsState,
      updateEvent(event)
    );
    // expect(state.events).toContain(event);
    expect(state.events).toContainEqual(event);
  });
  test("debe de eliminar el evento activo", () => {
    const state = calendarSlice.reducer(
      calendarWithActiveEventsState,
      deleteEvent()
    );
    expect(state.events).not.toContainEqual(
      calendarWithActiveEventsState.activeEvent
    );
  });
  test("debe de establecer los eventos", () => {
    const state = calendarSlice.reducer(initialState, loadingEvents(events));

    expect(calendarWithEventsState).toEqual(state);
  });
  test("debe de limpiar el estado", () => {
    const state = calendarSlice.reducer(calendarWithEventsState, cleanEvents());
    expect(state).toEqual(initialState);
  });
});
