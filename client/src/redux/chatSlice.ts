import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type MessateType = {
  type: string;
  author: string;
  username: string;
  message: string;
  date: string;
  time: string;
  state: string;
}

// 定義型別
interface ChatState {
  userCount: number;
  content: string;
  messageList: MessateType[];
}

// 設定預設值
const initialState: ChatState ={
  userCount: 0,
  content: "",
  messageList: [],
}

const chatSlice = createSlice({
  name: "chat",
  initialState: initialState,
  reducers: {
    // 設定 userCount
    setUserCount(state,action: PayloadAction<number>){
      state.userCount = action.payload;
    },
    // 設定 content
    setContent(state, action: PayloadAction<string>){
      state.content = action.payload; 
    },
    // 設定 messageList
    setMessageList(state, action: PayloadAction<MessateType>){
      state.messageList.push(action.payload);
    },
    // 重新設定 messageList
    resetMessageList(state, ){
      state.messageList = [];
    },
  }
});

export const {setUserCount, setContent, setMessageList, resetMessageList} = chatSlice.actions;
export default chatSlice.reducer;