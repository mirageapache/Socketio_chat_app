import { ReactComponent as IconSendBtn } from "../assets/icons/send.svg";
import { useChat } from "contexts/chatContext";
import io from "socket.io-client";
import { serverUrl } from "api";
import { useSelector } from "react-redux";

const socket = io(serverUrl);

interface UserState {
  socketId: string;
  username: string;
  joinState: string;
}

interface RootState {
  user: UserState;
}

function TypingBox() {
  const { content, setContent } = useChat();
  const userState = useSelector((state: RootState) => state.user);

  const sendMessage = (key: string) => {
    if (content !== "" && key === "Enter") {
      const messageData = {
        id: userState.socketId,
        author: userState.username,
        message: content,
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
