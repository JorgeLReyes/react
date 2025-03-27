import { useDispatch, useSelector } from "react-redux";
import {
  addNewEvent,
  AppDispatch,
  cleanEvents,
  deleteEvent,
  loadingEvents,
  RootState,
  setActiveEvent,
  updateEvent,
} from "../store";
import { Event } from "../types";
import { api } from "../api/calendarApi";
import { parseISO } from "date-fns";
import Swal from "sweetalert2";

export const useCalendarStore = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { events, activeEvent, user } = useSelector((store: RootState) => ({
    ...store.calendar,
    user: store.auth.user,
  }));

  const onActiveEvent = (calendarEvent: Event) => {
    dispatch(setActiveEvent(calendarEvent));
  };
  const startDeletingEvent = async () => {
    try {
      await api.delete(`/events/${activeEvent?.id || activeEvent?._id}`);
      dispatch(deleteEvent());
    } catch (error) {
      console.log(error);
      Swal.fire("Error", "No puedes eliminar este evento", "error");
    }
  };

  const startSavingEvent = async (calendarEvent: Event) => {
    try {
      if (calendarEvent.id) {
        await api.put(`/events/${calendarEvent.id}`, calendarEvent);
        return dispatch(updateEvent({ ...calendarEvent, user: user! }));
      } else {
        const { data } = await api.post("/events", calendarEvent);
        const { id } = data.event;

        dispatch(
          addNewEvent({
            ...calendarEvent,
            id,
            user: user!,
          })
        );
      }
    } catch (error) {
      Swal.fire("Error", "No puedes editar este evento", "error");
    }
  };

  const startLoadingEvents = async () => {
    try {
      const { data } = await api.get("/events");
      const { events } = data;

      const dataEvents = (events as Event[]).map((event) => ({
        ...event,
        id: event._id,
        start: parseISO((<unknown>event.start) as string),
        end: parseISO((<unknown>event.end) as string),
      }));

      dispatch(loadingEvents(dataEvents));
    } catch (error) {
      console.log("Error cargando eventos");
      console.log(error);
    }
  };

  const startCleanEvents = () => {
    dispatch(cleanEvents());
  };

  return {
    events,
    activeEvent,
    onActiveEvent,
    startSavingEvent,
    startDeletingEvent,
    startLoadingEvents,
    startCleanEvents,
  };
};
