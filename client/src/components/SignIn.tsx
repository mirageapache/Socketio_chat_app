import React from "react";
import "../styles/css/signin.css";

function SignIn() {
  return (
    <div className="sign-in">
      <div className="sign-in-panel">
        <h1>Welcome to Live Chat</h1>
        <h2>Just sign in & chat with others!</h2>
        <div className="form-panel">
          <input
            className="user-name"
            type="text"
            placeholder="Your Nickname"
          />
          <button className="btn submit-btn">Getting Start！</button>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
