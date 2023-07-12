import { useUser } from "contexts/userContext";
import React from "react";
import "../styles/css/chatroom.css";
import MessagePanel from "./MessagePanel";
import TypingBox from "./TypingBox";

function ChatRoom(prop: { logout: () => void }) {
  const { logout } = prop;
  const { username } = useUser();

  return (
    <div className="chat-room">
      <div className="chat-room-panel">
        <MessagePanel />
        <TypingBox />
        {/* <h2>Hi '{username}', welcome join the chat!</h2> */}
        {/* <button className="btn logout-btn" onClick={logout}>
          logout
        </button> */}
      </div>
    </div>
  );
}

export default ChatRoom;
