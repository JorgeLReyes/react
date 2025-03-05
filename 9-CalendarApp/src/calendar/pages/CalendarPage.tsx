import { Calendar, View } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { localizer } from "../../helpers";
import { getMessageEs } from "../../helpers/getMessages";
import {
  CalendarEvent,
  CalendarModal,
  FabAddNew,
  FabDelete,
  Navbar,
} from "../components";
import { Event } from "../../types";
import { useState } from "react";
import { useCalendarStore, useUiStore } from "../../hooks";

export const CalendarPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { onOpenModal } = useUiStore();
  const { events, onActiveEvent, activeEvent } = useCalendarStore();

  const [view, setView] = useState<View>(
    (localStorage.getItem("lastView") as View) || "week"
  );

  const eventStyleGetter = (
    event: Event,
    start: Date,
    end: Date,
    isSelected: boolean
  ) => {
    const style = {
      backgroundColor: "#347cf7",
      borderRadius: "0px",
      opacity: 0.8,
      border: "0",
      color: "white",
    };

    return {
      style,
    };
  };

  const onDoubleClick = () => {
    onOpenModal();
  };
  const onSelect = (event: Event) => {
    onActiveEvent(event);
  };

  const onViewChange = (newView: View) => {
    setView(newView);
    localStorage.setItem("lastView", newView);
  };

  const onNavigate = (date: Date) => {
    setCurrentDate(date);
    // setView(view); // Actualiza la vista si es necesario
  };

  return (
    <>
      <Navbar />
      <div>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "calc(100vh - 80px)" }}
          culture="es"
          messages={getMessageEs()}
          eventPropGetter={eventStyleGetter}
          components={{
            event: CalendarEvent,
          }}
          onDoubleClickEvent={onDoubleClick}
          onSelectEvent={onSelect}
          defaultView="agenda"
          onView={onViewChange}
          view={view}
          onNavigate={onNavigate}
          date={currentDate}
        />
        <CalendarModal />
        <FabAddNew />
        <FabDelete />
      </div>
    </>
  );
};
