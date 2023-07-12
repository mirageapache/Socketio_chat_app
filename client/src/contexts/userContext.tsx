import { createContext, useContext, useState } from "react";

// 定義 Context 中 value 的型別
interface UserContextType {
  username: string;
  setUsername: (mode: any) => void;
  joinState: boolean;
  setJoinState: (mode: any) => void;
}

// 設定context變數的初始值
const defaultValue: UserContextType = {
  username: "",
  setUsername: () => {},
  joinState: false,
  setJoinState: () => {},
};

// 定義 Provider 元件 Props 的型別
interface ProviderProps {
  children: React.ReactNode;
}

const UserContext = createContext<UserContextType>(defaultValue);
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: ProviderProps) => {
  const [username, setUsername] = useState<string>(""); // 使用者名稱
  const [joinState, setJoinState] = useState<boolean>(false); //使用者(是否進入聊天室)的狀態

  return (
    <UserContext.Provider
      value={{
        username,
        setUsername,
        joinState,
        setJoinState,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
