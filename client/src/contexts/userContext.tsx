import { createContext, useContext, useState } from "react";
import io from "socket.io-client";
import { serverUrl } from "api";

// 定義 Context 中 value 的型別
interface UserContextType {
  username: string;
  setUsername: (mode: any) => void;
  joinState: boolean;
  setJoinState: (mode: any) => void;
  login: () => void;
  logout: () => void;
}

// 設定context變數的初始值
const defaultValue: UserContextType = {
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
  const [username, setUsername] = useState<string>(""); // 使用者名稱
  const [joinState, setJoinState] = useState<boolean>(false); //使用者(是否進入聊天室)的狀態

  // 進入聊天室(登入)
  const login = (): void => {
    console.log(username);
    if (username !== "") {
      socket.emit("login", { username });
      setJoinState(true);
    } else {
      alert("please typing your nickname!!");
    }
  };

  // 離開聊天室(登出)
  const logout = (): void => {
    setJoinState(false);
    socket.emit("logout", { username });
  };

  return (
    <UserContext.Provider
      value={{
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
