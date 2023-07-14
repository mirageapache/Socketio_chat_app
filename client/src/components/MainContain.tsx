import "../styles/css/mainContain.css";
import Login from "./Login";
import { useUser } from "contexts/userContext";
import ChatRoom from "./ChatRoom";

function MainContain() {
  const { joinState, login } = useUser();

  return (
    <div id="main-contain">
      {!joinState ? <Login login={login} /> : <ChatRoom />}
    </div>
  );
}

export default MainContain;
