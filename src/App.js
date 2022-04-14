import React, { useState } from "react";

import { getEmptyBoard } from "./utils/utils";
import { GameContainer } from "./components/GameContainer";
import { RightPanel } from "./components/RightPanel";
import { TileBoard } from "./components/TileBoard";
import { useGameTime } from "./hooks/useGameTime";

import "./App.css";

function App() {
  const onTick = () => {
    console.log("tic tic");
  };
  const [speed, setSpeed] = useState(1000);
  const [board] = useState(getEmptyBoard());

  const { isRunning, startTime, stopTime } = useGameTime({ onTick, speed });

  return (
    <GameContainer>
      <TileBoard board={board} />
      <RightPanel>
        <button onClick={startTime} disabled={isRunning}>
          START
        </button>
        <button onClick={stopTime} disabled={!isRunning}>
          STOP
        </button>
        <button onClick={() => setSpeed((prev) => prev - 100)}>
          GO FASTER
        </button>
        <span>time is {isRunning ? "curge" : "not curge"}</span>
      </RightPanel>
    </GameContainer>
  );
}

export default App;
