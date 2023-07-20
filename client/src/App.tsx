import "./App.css";
import HomePage from "./pages/HomePage";
import Header from "./components/Header";
import "./styles/css/reset.css";
import "./styles/css/base.css";
import { BrowserRouter, Route, Routes } from "react-router-dom"; //import套件
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import userSlice from "redux/userSlice";
import chatSlice from "redux/chatSlice";

// 宣告reudx sotre
const store = configureStore({
  reducer: {
    user: userSlice,
    chat: chatSlice,
  },
});

function App() {
  const basename = process.env.PUBLIC_URL;
  return (
    <div className="App">
      <BrowserRouter basename={basename}>
        {/* 設定 redux Proivder*/}
        <Provider store={store}>
          <Header />
          <Routes>
            <Route path="*" element={<HomePage />} />
          </Routes>
        </Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
