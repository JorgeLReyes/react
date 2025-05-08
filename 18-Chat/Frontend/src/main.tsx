// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./router/App.tsx";
import { AuthProvider } from "./context/auth/authContext.tsx";
import { SocketProvider } from "./context/socket/socketContext.tsx";
import { ChatProvider } from "./context/chat/chatContext.tsx";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <ChatProvider>
    <AuthProvider>
      <SocketProvider>
        <App />
      </SocketProvider>
    </AuthProvider>
  </ChatProvider>
  // </StrictMode>
);
