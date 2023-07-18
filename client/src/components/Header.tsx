import { useEffect } from "react";
import "../styles/css/header.css";
// import { ReactComponent as IconSetting } from "../assets/icons/setting.svg";
import { ReactComponent as IconLougout } from "../assets/icons/logout.svg";
import { ReactComponent as IconUser } from "../assets/icons/user.svg";
import { useChat } from "contexts/chatContext";
import { serverUrl } from "api";
import io from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import { resetState } from "redux/userSlice";

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

function Header() {
  const userState = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const { userCount, setUserCount, setMessageList } = useChat();

  useEffect(() => {
    socket.off("user_count");
    // 顯示在線人數
    socket.on("user_count", (count) => {
      setUserCount(count);
    });
  });

  // 登出
  function Logout() {
    console.log(userState);
    socket.emit("logout", userState);
    dispatch(resetState());
  }

  return (
    <div id="header">
      <h2 className="header-title">Live Chat</h2>
      <div className="btn-group">
        <span className="online-user">
          <IconUser className="user-icon" />
          <p>{userCount}</p>
        </span>
        {/* <button className="icon-btn setting-btn">
          <IconSetting className="setting-icon" />
        </button> */}

        {userState.joinState === "joined" ? (
          <button
            className="icon-btn logout-btn"
            onClick={() => {
              Logout();
              setMessageList([]);
            }}
          >
            <IconLougout className="logout-icon" />
          </button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default Header;
