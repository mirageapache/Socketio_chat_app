import React from "react";
import "../styles/css/header.css";
import { ReactComponent as IconSetting } from "../assets/icons/setting.svg";
import { ReactComponent as IconLougout } from "../assets/icons/logout.svg";
import { useUser } from "contexts/userContext";

function Header() {
  const { logout, joinState } = useUser();

  return (
    <div id="header">
      <h2 className="header-title">Live Chat</h2>
      <div className="btn-group">
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
