import { createContext, useContext, useState } from "react";
import io from "socket.io-client";
import { serverUrl } from "api";
import { useChat } from "./chatContext";

// 定義 Context 中 value 的型別
interface UserContextType {
  socketId: string;
  setSocketId: (mode: any) => void;
  username: string;
  setUsername: (mode: any) => void;
  joinState: boolean;
  setJoinState: (mode: any) => void;
  login: () => void;
  logout: () => void;
}

// 設定context變數的初始值
const defaultValue: UserContextType = {
  socketId: "",
  setSocketId: () => {},
  username: "",
  setUsername: () => {},
  joinState: false,
  setJoinState: () => {},
  login: () => {},
  logout: () => {},
};

// 定義 Provider 元件 Props 的型別
interface ProviderProps {
  children: React.ReactNode;
}

const UserContext = createContext<UserContextType>(defaultValue);
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: ProviderProps) => {
  const socket = io(serverUrl);
  const [socketId, setSocketId] = useState<string>(""); // 使用者id
  const [username, setUsername] = useState<string>(""); // 使用者名稱
  const [joinState, setJoinState] = useState<boolean>(false); //使用者(是否進入聊天室)的狀態
  const { setMessageList } = useChat();

  // 進入聊天室(登入)
  const login = (): void => {
    if (username !== "") {
      socket.emit("login", username);
      // 登入成功
      socket.on("login_success", (data) => {
        setSocketId(socket.id);
        setJoinState(true);
        // setMessageList([]);
      });
      // 登入失敗
      socket.on("login_failed", (data) => {
        alert(
          "Oops！This nickname is used by others, please use another nickname！"
        );
      });
    } else {
      alert("please typing your nickname!!");
    }
  };

  // 離開聊天室(登出)
  const logout = (): void => {
    setJoinState(false);
    socket.emit("logout", { socketId, username });
  };

  return (
    <UserContext.Provider
      value={{
        socketId,
        setSocketId,
        username,
        setUsername,
        joinState,
        setJoinState,
        login,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
