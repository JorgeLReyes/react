import { EventProps } from "react-big-calendar";
import { Event } from "../../types";

export const CalendarEvent = (props: EventProps<Event>) => {
  const { title, user } = props.event;
  return (
    <>
      <strong>{title}</strong> - <strong>{user?.name}</strong>
    </>
  );
};
