import { CalendarEventProps } from "../../types";

export const CalendarEvent = (props: CalendarEventProps) => {
  const { title, user } = props.event;
  return (
    <>
      <strong>{title}</strong> - <strong>{user?.name}</strong>
    </>
  );
};
