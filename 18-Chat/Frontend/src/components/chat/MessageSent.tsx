interface Props {
  message: string;
  date: string;
}
export const MessageSent = ({ message, date }: Props) => {
  return (
    <div className="outgoing_msg">
      <div className="sent_msg">
        <p>{message}</p>
        <span className="time_date">{date}</span>
      </div>
    </div>
  );
};
