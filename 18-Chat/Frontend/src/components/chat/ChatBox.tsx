import { useContext } from "react";
import { MessageReceived } from "./MessageReceived";
import { MessageSend } from "./MessageSend";
import { MessageSent } from "./MessageSent";
import { ChatContext } from "../../context/chat/chatContext";
import { AuthContext } from "../../context/auth/authContext";
import { dateFormat } from "../../helpers/date";

export const ChatBox = () => {
  const { chatState } = useContext(ChatContext);
  const { user } = useContext(AuthContext);

  return (
    <div className="mesgs">
      <div className="msg_history" id={"scroll"}>
        {chatState.messages.map((msg) =>
          msg.from === user.uid ? (
            <MessageSent
              key={msg.uid}
              message={msg.message}
              date={dateFormat(msg.createdAt)}
            />
          ) : (
            <MessageReceived
              key={msg.uid}
              message={msg.message}
              date={dateFormat(msg.createdAt)}
            />
          )
        )}
      </div>
      <MessageSend />
    </div>
  );
};
