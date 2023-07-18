import { ReactComponent as IconSendBtn } from "../assets/icons/send.svg";
import io from "socket.io-client";
import { serverUrl } from "api";
import { useSelector } from "react-redux";
import { setContent } from "redux/chatSlice";

const socket = io(serverUrl);

interface UserState {
  socketId: string;
  username: string;
}

interface ChatState {
  content: string;
}

interface RootState {
  user: UserState;
  chat: ChatState;
}

function TypingBox() {
  const userState = useSelector((state: RootState) => state.user);
  const chatState = useSelector((state: RootState) => state.chat);

  const sendMessage = (key: string) => {
    if (chatState.content !== "" && key === "Enter") {
      const messageData = {
        id: userState.socketId,
        author: userState.username,
        message: chatState.content,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      socket.emit("send_message", messageData);
      setContent("");
    }
  };

  return (
    <div className="typing-box">
      <input
        className="typing-input"
        type="text"
        value={chatState.content}
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
