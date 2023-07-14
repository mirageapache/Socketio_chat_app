import React from "react";
import "./App.css";
import HomePage from "./pages/HomePage";
import Header from "./components/Header";
import "./styles/css/reset.css";
import "./styles/css/base.css";
import { UserProvider } from "contexts/userContext";
import { ChatProvider } from "contexts/chatContext";
import { BrowserRouter, Route, Routes } from "react-router-dom"; //import套件

function App() {
  const basename = process.env.PUBLIC_URL;
  return (
    <div className="App">
      <BrowserRouter basename={basename}>
        <UserProvider>
          <ChatProvider>
            <Header />
            <Routes>
              <Route path="*" element={<HomePage />} />
            </Routes>
          </ChatProvider>
        </UserProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
