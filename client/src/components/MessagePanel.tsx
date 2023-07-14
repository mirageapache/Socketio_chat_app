import { serverUrl } from "api";
import { useChat } from "contexts/chatContext";
import { useEffect, useRef } from "react";
import io from "socket.io-client";
import MessageBox from "./MessageBox";
import SystemMessage from "./SystemMessage";
const socket = io(serverUrl);

function MessagePanel() {
  const { messageList, setMessageList } = useChat();
  const msgPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    socket.off("receive_message"); // 避免訊息重發
    // 監聽 - 收到訊息
    socket.on("receive_message", (data) => {
      setMessageList((list: any) => [...list, data]);
    });
    socket.off("user_joined"); // 避免訊息重發
    // 監聽 - 其他使用者加入
    socket.on("user_joined", (data) => {
      setMessageList((list: any) => [...list, data]);
    });
    socket.off("user_leaved"); // 避免訊息重發
    // 監聽 - 其他使用者離開
    socket.on("user_leaved", (data) => {
      setMessageList((list: any) => [...list, data]);
    });

    scrollMessageToBottom();
  });

  const scrollMessageToBottom = () => {
    const messagePanel = msgPanelRef.current;
    if (messagePanel) {
      messagePanel.scrollTop = messagePanel.scrollHeight;
    }
  };

  const showMessage = messageList.map((message: any, index: number) => {
    if (message.type === "system") {
      return <SystemMessage key={index} data={message} />;
    } else {
      return <MessageBox key={index} data={message} />;
    }
  });

  return (
    <div className="message-panel" ref={msgPanelRef}>
      {showMessage}
    </div>
  );
}

export default MessagePanel;
