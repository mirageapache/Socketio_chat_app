import { useUser } from "contexts/userContext";

interface MessageType {
  type: string;
  author: string;
  username: string;
  message: string;
  date: string;
  time: string;
  state: string;
}

function MessageBox(prop: { data: MessageType }) {
  const { author, message, time } = prop.data;
  const { username } = useUser();

  return (
    <>
      {author === username ? (
        <div className="message-box-self">
          <p className="content">{message}</p>
          <span className="time">{time}</span>
        </div>
      ) : (
        <div className="message-box-other">
          <h4 className="author">{author}</h4>
          <p className="content">{message}</p>
          <span className="time">{time}</span>
        </div>
      )}
    </>
  );
}

export default MessageBox;
