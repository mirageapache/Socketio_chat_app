import { createContext, useContext, useState } from "react";

// 定義 Context 中 value 的型別
interface ChatContextType {
  content: string;
  setContent: (mode: any) => void;
  messageList: string[];
  setMessageList: (mode: any) => void;
}

// 設定context變數的初始值
const defaultValue: ChatContextType = {
  content: "",
  setContent: () => {},
  messageList: [],
  setMessageList: () => {},
};

// 定義 Provider 元件 Props 的型別
interface ProviderProps {
  children: React.ReactNode;
}

const ChatContext = createContext<ChatContextType>(defaultValue);
export const useChat = () => useContext(ChatContext);

export const ChatProvider = ({ children }: ProviderProps) => {
  const [content, setContent] = useState<string>(""); // 訊息框內容
  const [messageList, setMessageList] = useState<string[]>([]); // 聊天室訊息串

  return (
    <ChatContext.Provider
      value={{
        content,
        setContent,
        messageList,
        setMessageList,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
