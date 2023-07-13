import { useUser } from "contexts/userContext";

function MessageBox(prop: { author: string; content: string; time: string }) {
  const { author, content, time } = prop;
  const { username } = useUser();

  return (
    <>
      {author === username ? (
        <div className="message-box-self">
          <p className="content">{content}</p>
          <span className="time">{time}</span>
        </div>
      ) : (
        <div className="message-box-other">
          <h4 className="author">{author}</h4>
          <p className="content">{content}</p>
          <span className="time">{time}</span>
        </div>
      )}
    </>
  );
}

export default MessageBox;
