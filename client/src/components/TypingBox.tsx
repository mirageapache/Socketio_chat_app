import React from "react";
import { ReactComponent as IconSendBtn } from "../assets/icons/send.svg";

function TypingBox() {
  return (
    <div className="typing-box">
      <input
        className="typing-input"
        type="text"
        placeholder="Say someting..."
      />
      <button className="icon-btn send-btn">
        <IconSendBtn className="icon icon-send" />
      </button>
    </div>
  );
}

export default TypingBox;
