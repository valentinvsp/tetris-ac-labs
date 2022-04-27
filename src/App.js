import React, { useState, useCallback, useEffect } from "react";

import { GameContainer } from "./components/GameContainer";
import { RightPanel } from "./components/RightPanel";
import { TileBoard } from "./components/TileBoard";
import { useGameTime } from "./hooks/useGameTime";
import { useBoard } from "./hooks/useBoard";
import "./App.css";
import { DIRECTION } from "./utils/utils";

function App() {
  const [speed, setSpeed] = useState(1000);

  const { attemptMove, attemptRotate, board, startNewTetro } = useBoard();

  const onTick = useCallback(() => {
    attemptMove(DIRECTION.down);
  }, [attemptMove]);

  const { isRunning, startTime, stopTime } = useGameTime({ onTick, speed });

  const keyPressHandler = useCallback(
    ({ key }) => {
      if (key === "ArrowLeft") {
        return attemptMove(DIRECTION.left);
      }
      if (key === "ArrowRight") {
        return attemptMove(DIRECTION.right);
      }
      if (key === "ArrowDown") {
        return attemptMove(DIRECTION.down);
      }
      if (key === "ArrowUp") {
        return attemptRotate();
      }
    },
    [attemptMove, attemptRotate]
  );

  const handleStart = () => {
    startNewTetro();
    startTime();
  };

  useEffect(() => {
    window.addEventListener("keydown", keyPressHandler);

    return () => {
      window.removeEventListener("keydown", keyPressHandler);
    };
  }, [keyPressHandler]);

  return (
    <GameContainer>
      <TileBoard board={board} />
      <RightPanel>
        <button onClick={handleStart} disabled={isRunning}>
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
