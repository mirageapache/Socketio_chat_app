import "../styles/css/mainContain.css";
import Login from "./Login";
import ChatRoom from "./ChatRoom";
import Loading from "./Loading";
import { useSelector } from "react-redux";

interface UserState {
  socketId: string;
  username: string;
  joinState: string;
}

interface RootState {
  user: UserState;
}

function MainContain() {
  let view: JSX.Element | null = null;
  const userState = useSelector((state: RootState) => state.user);

  if (userState.joinState === "joined") {
    view = <ChatRoom />;
  } else if (userState.joinState === "loading") {
    view = <Loading />;
  } else {
    view = <Login />;
  }

  return <div id="main-contain">{view}</div>;
}

export default MainContain;
