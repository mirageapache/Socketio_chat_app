import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { produce } from "immer";

// 定義型別
interface UserState {
  socketId: string;
  username: string;
  joinState: string;
}

// 設定預設值
const initialState: UserState ={
  socketId: "",
  username: "",
  joinState: "detach",
}

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    // 設定 socket id
    setSocketId(state, action: PayloadAction<string>){
      state.socketId = action.payload;
    },
    // 設定 username
    setUsername(state, action: PayloadAction<string>){
      state.username = action.payload;
    },
    // 設定 joinState
    setJoinState(state, action: PayloadAction<string>){
      state.joinState = action.payload;
    },
    // 重設 userState
    resetState(state){
      state.socketId ="";
      state.username ="";
      state.joinState ="detach";
    }
  }
})

export const {setSocketId, setUsername, setJoinState, resetState} = userSlice.actions;
export default userSlice.reducer;