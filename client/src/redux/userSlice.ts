import { createSlice,PayloadAction  } from "@reduxjs/toolkit";
import { serverUrl } from "api";
import io from "socket.io-client";
const socket = io(serverUrl);
// import { produce } from "immer";

interface UserState {
  socketId: string;
  username: string;
  joinState: string;
}

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
    setSocketId(state, action){
      state.socketId = action.payload;
    },
    // 設定 username
    setUsername(state, action){
      state.username = action.payload;
    },
    // 設定 joinState
    setJoinState(state, action: PayloadAction<string>){
      state.joinState = action.payload;
    },
    // 登入function
    setLogin(state){
      if (state.username !== "") {
        socket.emit("login", state.username);
        console.log("logining - wait for server ... ");
        state.joinState = "loading";
      } else {
        alert("please typing your nickname!!");
      }
    },
    // 登出function
    resetState(state){
      
      state.socketId ="";
      state.username ="";
      state.joinState ="detach";
    }
  }
})


export const {setSocketId, setUsername, setJoinState, resetState} = userSlice.actions;
export default userSlice.reducer;