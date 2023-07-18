import { serverUrl } from "api";
import "../styles/css/login.css";
import { useSelector, useDispatch } from "react-redux";
import { setSocketId, setUsername, setJoinState } from "redux/userSlice";
import io from "socket.io-client";
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

function Login() {
  const userState = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  // 登入
  function Login() {
    if (userState.username !== "") {
      socket.emit("login", userState.username);
      // console.log("logining - wait for server ... ");
      dispatch(setJoinState("loading"));
      // 登入成功
      socket.on("login_success", (data) => {
        // console.log("login successed!");
        dispatch(setSocketId(data.id));
        dispatch(setJoinState("joined"));
      });
      // 登入失敗
      socket.on("login_failed", (data) => {
        dispatch(setJoinState("detach"));
        alert(
          "Oops！This nickname is used by others, please use another nickname！"
        );
      });
    } else {
      alert("please typing your nickname!!");
    }
  }

  return (
    <div className="sign-in">
      <div className="sign-in-panel">
        <h1>Welcome to Live Chat</h1>
        <h2>Just sign in & chat with others!</h2>
        <div className="form-panel">
          <input
            className="user-name"
            type="text"
            value={userState.username}
            placeholder="Your Nickname"
            onChange={(event) => dispatch(setUsername(event.target.value))}
          />
          <button className="btn submit-btn" onClick={Login}>
            Start Chatting！
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
