import React from "react";

import { GameContainer } from "./components/GameContainer";

import Tetromino from "./Tetromino";
import "./App.css";

function App() {
  return (
    <GameContainer>
      <div className="board">
        <div className="item" />
        <Tetromino />
      </div>
    </GameContainer>
  );
}

export default App;
