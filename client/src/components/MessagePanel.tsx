import { serverUrl } from "api";
import { useEffect, useRef } from "react";
import io from "socket.io-client";
import MessageBox from "./MessageBox";
import SystemMessage from "./SystemMessage";
import { useSelector, useDispatch } from "react-redux";
import { setJoinState } from "redux/userSlice";
import { setMessageList, resetMessageList } from "redux/chatSlice";
const socket = io(serverUrl);

// 設定user型別
interface UserState {
  socketId: string;
  username: string;
  joinState: string;
}
// 設定chat型別
interface ChatState {
  userCount: number;
  content: string;
  messageList: string[];
}
// 設定reudcer型別
interface RootState {
  user: UserState;
  chat: ChatState;
}

function MessagePanel() {
  const userState = useSelector((state: RootState) => state.user);
  const chatState = useSelector((state: RootState) => state.chat);
  const dispatch = useDispatch();
  const msgPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    socket.off("receive_message"); // 避免訊息重發
    // 監聽 - 收到訊息
    socket.on("receive_message", (data) => {
      dispatch(setMessageList(data));
    });
    socket.off("user_joined"); // 避免訊息重發
    // 監聽 - 其他使用者加入
    socket.on("user_joined", (data) => {
      if (data.username !== userState.username) {
        dispatch(setMessageList(data));
      }
    });
    socket.off("user_leaved"); // 避免訊息重發
    // 監聽 - 其他使用者離開
    socket.on("user_leaved", (data) => {
      if (data.username !== userState.username) {
        dispatch(setMessageList(data));
      }
    });

    // 監聽 - 斷線
    socket.on("break_off", (data) => {
      if (data === "break_off") {
        dispatch(setJoinState("detach"));
        dispatch(resetMessageList());
      }
    });

    scrollMessageToBottom();
  });

  // 有新訊息時捲動至底部
  const scrollMessageToBottom = () => {
    const messagePanel = msgPanelRef.current;
    if (messagePanel) {
      messagePanel.scrollTop = messagePanel.scrollHeight;
    }
  };

  const showMessage = chatState.messageList.map(
    (message: any, index: number) => {
      if (message.type === "system") {
        return <SystemMessage key={index} data={message} />;
      } else {
        return <MessageBox key={index} data={message} />;
      }
    }
  );

  return (
    <div className="message-panel" ref={msgPanelRef}>
      {showMessage}
    </div>
  );
}

export default MessagePanel;
