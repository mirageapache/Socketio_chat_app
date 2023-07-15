import { serverUrl } from "api";
import { useChat } from "contexts/chatContext";
import { useEffect, useRef } from "react";
import io from "socket.io-client";
import MessageBox from "./MessageBox";
import SystemMessage from "./SystemMessage";
import { useUser } from "contexts/userContext";
const socket = io(serverUrl);

function MessagePanel() {
  const { username, setJoinState } = useUser();
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
      if (data.username !== username) {
        setMessageList((list: any) => [...list, data]);
      }
    });
    socket.off("user_leaved"); // 避免訊息重發
    // 監聽 - 其他使用者離開
    socket.on("user_leaved", (data) => {
      if (data.username !== username) {
        setMessageList((list: any) => [...list, data]);
      }
    });

    // 監聽 - 斷線
    socket.on("break_off", (data) => {
      if (data === "break_off") {
        setJoinState(false);
        setMessageList([]);
      }
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
