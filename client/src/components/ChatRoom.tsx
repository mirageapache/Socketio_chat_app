import React from "react";
import "../styles/css/chatroom.css";
import MessagePanel from "./MessagePanel";
import TypingBox from "./TypingBox";

function ChatRoom() {
  return (
    <div className="chat-room">
      <div className="chat-room-panel">
        <MessagePanel />
        <TypingBox />
      </div>
    </div>
  );
}

export default ChatRoom;
