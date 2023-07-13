import { serverUrl } from "api";
import { useChat } from "contexts/chatContext";
import { useEffect } from "react";
import io from "socket.io-client";
import MessageBox from "./MessageBox";
const socket = io(serverUrl);

function MessagePanel() {
  const { messageList, setMessageList } = useChat();

  useEffect(() => {
    socket.off("receive_message");
    socket.on("receive_message", (data) => {
      console.log(data);
      setMessageList((list: any) => [...list, data]);
    });
  });

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

  return <div className="message-panel">{showMessage}</div>;
}

export default MessagePanel;
