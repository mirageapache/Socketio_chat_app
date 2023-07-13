import React from "react";
import "./App.css";
import HomePage from "./pages/HomePage";
import Header from "./components/Header";
import "./styles/css/reset.css";
import "./styles/css/base.css";
import { UserProvider } from "contexts/userContext";
import { ChatProvider } from "contexts/chatContext";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <ChatProvider>
          <Header />
          <HomePage />
        </ChatProvider>
      </UserProvider>
    </div>
  );
}

export default App;
