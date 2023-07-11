import React from "react";
import "./App.css";
import HomePage from "./pages/HomePage";
import Header from "./components/Header";
import "./styles/css/reset.css";
import "./styles/css/base.css";

function App() {
  return (
    <div className="App">
      <Header />
      <HomePage />
    </div>
  );
}

export default App;
