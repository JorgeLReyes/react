import { FormEvent, useContext, useRef } from "react";
import { SocketContext } from "../../context/socket/socketContext";
import { AuthContext } from "../../context/auth/authContext";
import { ChatContext } from "../../context/chat/chatContext";

export const MessageSend = () => {
  const { user } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);
  const { chatState } = useContext(ChatContext);
  const refMessage = useRef<HTMLInputElement>(null);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const message = refMessage.current?.value;
    if (!message) return;
    socket?.emit("personal-message", {
      from: user.uid,
      to: chatState.chatActive,
      message,
    });
    refMessage.current!.value = "";
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="type_msg row">
        <div className="input_msg_write col-sm-9">
          <input
            type="text"
            className="write_msg"
            placeholder="Mensaje..."
            ref={refMessage}
          />
        </div>
        <div className="col-sm-3 text-center">
          <button className="msg_send_btn mt-3" type="submit">
            enviar
          </button>
        </div>
      </div>
    </form>
  );
};
