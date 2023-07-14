import { useUser } from "contexts/userContext";
interface MessageBox {
  author: string;
  message: string;
  time: string;
}

function MessageBox(prop: { data: MessageBox }) {
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
