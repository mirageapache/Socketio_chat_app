import "../styles/css/mainContain.css";
import SignIn from "./SignIn";
import io from "socket.io-client";
import { useUser } from "contexts/userContext";

const server_url: string = "http://localhost:3001";
const socket = io(server_url);

function MainContain() {
  const { username, joinState, setJoinState } = useUser();

  // 進入聊天室
  const signIn = (): void => {
    if (username !== "") {
      socket.emit("signin", { username });
      setJoinState(true);
    } else {
      alert("please typing your nickname!!");
    }
  };

  // 離開聊天室
  const logout = (): void => {
    setJoinState(false);
    socket.emit("logout", { username });
  };

  return (
    <div id="main-contain">
      {!joinState ? (
        <SignIn signin={signIn} />
      ) : (
        <div>
          <h2>Hi '{username}', welcome join the chat!</h2>
          <button className="btn logout-btn" onClick={logout}>
            logout
          </button>
        </div>
      )}
    </div>
  );
}

export default MainContain;
