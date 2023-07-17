import "../styles/css/mainContain.css";
import Login from "./Login";
import { useUser } from "contexts/userContext";
import ChatRoom from "./ChatRoom";
import Loading from "./Loading";

function MainContain() {
  const { joinState, login } = useUser();
  let view: JSX.Element | null = null;

  if (joinState === "joined") {
    view = <ChatRoom />;
  } else if (joinState === "loading") {
    view = <Loading />;
  } else {
    view = <Login login={login} />;
  }

  return (
    <div id="main-contain">
      {view}
      {/* {!joinState ? <Login login={login} /> : <ChatRoom />} */}
    </div>
  );
}

export default MainContain;
