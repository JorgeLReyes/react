import { useContext } from "react";
import "../assets/css/chat.css";
import { ChatBox } from "../components/chat/ChatBox";
import { ChatSelect } from "../components/chat/ChatSelect";
import { Inbox } from "../components/chat/Inbox";
import { ChatContext } from "../context/chat/chatContext";

export const Chat = () => {
  const { chatState } = useContext(ChatContext);
  return (
    <div className="messaging">
      <div className="inbox_msg">
        <Inbox />
        {chatState.chatActive ? <ChatBox /> : <ChatSelect />}
      </div>
    </div>
  );
};
