import { SidebarChatItem } from "./SidebarChatItem";
import { ReactNode, useContext } from "react";
import { ChatContext } from "../../context/chat/chatContext";
import { AuthContext } from "../../context/auth/authContext";

export const Sidebar = () => {
  const { chatState } = useContext(ChatContext);
  const { user } = useContext(AuthContext);
  return (
    <div className="inbox_chat">
      {chatState.users.reduce((acum, currentValue) => {
        if (currentValue.uid !== user.uid)
          acum.push(
            <SidebarChatItem key={currentValue.uid} {...currentValue} />
          );
        return acum;
      }, [] as ReactNode[])}
      <div className="extra_space"></div>
    </div>
  );
};
