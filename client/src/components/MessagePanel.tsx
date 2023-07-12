import React from "react";

function MessagePanel() {
  return (
    <div className="message-panel">
      <div className="message-box-other">
        <p>訊息1訊息1</p>
        <span className="hint">12:00 jhon</span>
      </div>
      <div className="message-box-self">
        <p>訊息2訊息2</p>
        <span className="hint">12:00</span>
      </div>
      <div className="message-box-other">
        <p>訊息3訊息3</p>
      </div>
      <div className="message-box-self">
        <p>訊息4訊息4</p>
      </div>
    </div>
  );
}

export default MessagePanel;
