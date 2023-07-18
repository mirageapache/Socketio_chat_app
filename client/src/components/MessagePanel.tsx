import { serverUrl } from "api";
import { useChat } from "contexts/chatContext";
import { useEffect, useRef } from "react";
import io from "socket.io-client";
import MessageBox from "./MessageBox";
import SystemMessage from "./SystemMessage";
import { useSelector, useDispatch } from "react-redux";
import { setJoinState } from "redux/userSlice";
const socket = io(serverUrl);

// 設定user型別
interface UserState {
  socketId: string;
  username: string;
  joinState: string;
}
// 設定reudcer型別
interface RootState {
  user: UserState;
}

function MessagePanel() {
  const userState = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
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
      if (data.username !== userState.username) {
        setMessageList((list: any) => [...list, data]);
      }
    });
    socket.off("user_leaved"); // 避免訊息重發
    // 監聽 - 其他使用者離開
    socket.on("user_leaved", (data) => {
      if (data.username !== userState.username) {
        setMessageList((list: any) => [...list, data]);
      }
    });

    // 監聽 - 斷線
    socket.on("break_off", (data) => {
      if (data === "break_off") {
        dispatch(setJoinState("detach"));
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
