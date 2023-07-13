import { serverUrl } from "api";
import { useChat } from "contexts/chatContext";
import { useEffect, useRef } from "react";
import io from "socket.io-client";
import MessageBox from "./MessageBox";
const socket = io(serverUrl);

function MessagePanel() {
  const { messageList, setMessageList } = useChat();
  const msgPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    socket.off("receive_message");
    socket.on("receive_message", (data) => {
      setMessageList((list: any) => [...list, data]);
    });
    scrollMessageToBottom();
  });

  const scrollMessageToBottom = () => {
    const messagePanel = msgPanelRef.current;
    if (messagePanel) {
      messagePanel.scrollTop = messagePanel.scrollHeight - 585;
    }
  };

  const showMessage = messageList.map((message: any, index: number) => {
    return (
      <MessageBox
        key={index}
        author={message.author}
        content={message.message}
        time={message.time}
      />
    );
  });

  return (
    <div className="message-panel" ref={msgPanelRef}>
      {showMessage}
    </div>
  );
}

export default MessagePanel;
