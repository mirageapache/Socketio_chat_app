import React from "react";
import { ReactComponent as IconSendBtn } from "../assets/icons/send.svg";
import { useChat } from "contexts/chatContext";
import { useUser } from "contexts/userContext";
import io from "socket.io-client";
import { serverUrl } from "api";

const socket = io(serverUrl);

function TypingBox() {
  const { content, setContent } = useChat();
  const { username } = useUser();

  const sendMessage = async (key: string) => {
    if (content !== "" && key === "Enter") {
      const messageData = {
        author: username,
        message: content,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setContent("");
      // setMessageList((list: any) => [...list, messageData]);
    }
  };

  return (
    <div className="typing-box">
      <input
        className="typing-input"
        type="text"
        value={content}
        placeholder="Say someting..."
        onChange={(event) => {
          setContent(event.target.value);
        }}
        onKeyUp={(event) => {
          sendMessage(event.key);
        }}
      />
      <button
        className="icon-btn send-btn"
        onClick={() => {
          sendMessage("Enter");
        }}
      >
        <IconSendBtn className="icon icon-send" />
      </button>
    </div>
  );
}

export default TypingBox;
