import { useEffect } from "react";
import "../styles/css/header.css";
import { ReactComponent as IconSetting } from "../assets/icons/setting.svg";
import { ReactComponent as IconLougout } from "../assets/icons/logout.svg";
import { ReactComponent as IconUser } from "../assets/icons/user.svg";
import { useUser } from "contexts/userContext";
import { useChat } from "contexts/chatContext";
import io from "socket.io-client";
import { serverUrl } from "api";

const socket = io(serverUrl);

function Header() {
  const { logout, joinState } = useUser();
  const { userCount, setUserCount } = useChat();

  useEffect(() => {
    socket.off("user_count");
    socket.on("user_count", (count) => {
      setUserCount(count);
    });
  });

  return (
    <div id="header">
      <h2 className="header-title">Live Chat</h2>
      <div className="btn-group">
        <span className="online-user">
          <IconUser className="user-icon" />
          <p>{userCount}</p>
        </span>
        <button className="icon-btn setting-btn">
          <IconSetting className="setting-icon" />
        </button>

        {joinState ? (
          <button className="icon-btn logout-btn" onClick={logout}>
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
