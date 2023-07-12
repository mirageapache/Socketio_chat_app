import "../styles/css/signin.css";
import { useUser } from "../contexts/userContext";

function SignIn(prop: { signin: () => void }) {
  const { signin } = prop;
  const { username, setUsername } = useUser();

  return (
    <div className="sign-in">
      <div className="sign-in-panel">
        <h1>Welcome to Live Chat</h1>
        <h2>Just sign in & chat with others!</h2>
        <div className="form-panel">
          <input
            className="user-name"
            type="text"
            value={username}
            placeholder="Your Nickname"
            onChange={(event) => setUsername(event.target.value)}
          />
          <button className="btn submit-btn" onClick={signin}>
            Start Chatting！
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
