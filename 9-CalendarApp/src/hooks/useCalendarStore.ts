import { useDispatch, useSelector } from "react-redux";
import {
  addNewEvent,
  AppDispatch,
  deleteEvent,
  RootState,
  setActiveEvent,
  updateEvent,
} from "../store";
import { Event } from "../types";

export const useCalendarStore = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { events, activeEvent } = useSelector(
    (store: RootState) => store.calendar
  );

  const onActiveEvent = (calendarEvent: Event) => {
    dispatch(setActiveEvent(calendarEvent));
  };
  const startDeletingEvent = async () => {
    dispatch(deleteEvent());
  };

  const startSavingEvent = async (calendarEvent: Event) => {
    if (calendarEvent._id) {
      dispatch(updateEvent(calendarEvent));
    } else {
      dispatch(
        addNewEvent({
          ...calendarEvent,
          _id: new Date().getTime(),
        })
      );
    }
  };

  return {
    events,
    activeEvent,
    onActiveEvent,
    startSavingEvent,
    startDeletingEvent,
  };
};
