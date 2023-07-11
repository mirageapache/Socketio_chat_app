import React from "react";
import "../styles/css/header.css";
import { ReactComponent as IconSetting } from "../assets/icons/setting.svg";

function Header() {
  return (
    <div id="header">
      <h2 className="header-title">Live Chat</h2>
      <button className="btn setting-btn">
        <IconSetting className="setting-icon" />
      </button>
    </div>
  );
}

export default Header;
