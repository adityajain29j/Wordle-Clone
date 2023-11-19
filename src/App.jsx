import React from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Board from "./components/Board/Board";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Board />
    </div>
  );
}

export default App;
