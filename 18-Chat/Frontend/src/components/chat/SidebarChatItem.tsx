import { useContext, useEffect } from "react";
import { ChatContext } from "../../context/chat/chatContext";
import { fetchAPI } from "../../helpers/fetch";
import type { Message } from "../../context/chat/chatReducer";
import { scrollToBottom } from "../../helpers/scroll";

interface Props {
  name: string;
  online: boolean;
  uid: string;
}
export const SidebarChatItem = ({ name, online, uid }: Props) => {
  const { chatState, dispatch } = useContext(ChatContext);

  const onClick = async () => {
    dispatch({ type: "activeChat", payload: { userId: uid } });
    const res = await fetchAPI<{ messages: Message[] }>({
      endpoint: `messages/${uid}`,
      method: "GET",
    });
    dispatch({ type: "loadMessages", payload: { messages: res.messages } });
  };

  useEffect(() => {
    scrollToBottom("scroll");
  }, [chatState.messages]);

  return (
    <div
      className={`chat_list ${
        chatState.chatActive === uid ? "active_chat" : ""
      }`}
      onClick={onClick}
    >
      <div className="chat_people">
        <div className="chat_img">
          <img
            src="https://ptetutorials.com/images/user-profile.png"
            alt="sunil"
          />
        </div>
        <div className="chat_ib">
          <h5>{name}</h5>
          <span className={`text-${online ? "success" : "danger"}`}>
            {online ? "Online" : "Offline"}
          </span>
        </div>
      </div>
    </div>
  );
};
