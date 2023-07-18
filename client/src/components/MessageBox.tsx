import { useSelector } from "react-redux";

interface MessageType {
  type: string;
  author: string;
  username: string;
  message: string;
  date: string;
  time: string;
  state: string;
}

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

function MessageBox(prop: { data: MessageType }) {
  const { author, message, time } = prop.data;
  const userState = useSelector((state: RootState) => state.user);

  return (
    <>
      {author === userState.username ? (
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
