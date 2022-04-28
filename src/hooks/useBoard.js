import { useState, useEffect, useRef, useCallback } from "react";
import { randomTetromino } from "../tetrominos";
import { DIRECTION, getEmptyBoard } from "../utils/utils";

export const useBoard = () => {
  const [board, setBoard] = useState(getEmptyBoard());

  const player = useRef({
    currentPos: { row: 0, column: 5 },
    tetromino: randomTetromino(),
  });

  useEffect(() => {
    console.log("test");
    // updateBoard();
  }, []);

  const updatePosition = useCallback((direction = DIRECTION.down) => {
    let verticalAdjustment = 0;
    if (direction === DIRECTION.down) {
      verticalAdjustment = 1;
    } else if (direction === DIRECTION.up) {
      verticalAdjustment = -1;
    }

    player.current = {
      currentPos: {
        row: player.current.currentPos.row + verticalAdjustment,
        column: player.current.currentPos.column,
      },
      tetromino: player.current.tetromino,
    };
  }, []);

  const updateBoard = () => {
    // 1. sterge vechea pozitie
    player.current.tetromino.shape.forEach((row, rowIdx) => {
      row.forEach((val, colIdx) => {
        const row = player.current.currentPos.row + rowIdx;
        const column = player.current.currentPos.column + colIdx;
        // update column as well when moving pieces
        board[row][column] = null;
      });
    });

    // 2. muta mai jos
    updatePosition(DIRECTION.down);

    // 3. vertifica daca exista coliziuni
    let isCollided = false;
    player.current.tetromino.shape.forEach((row, rowIdx) => {
      row.forEach((val, colIdx) => {
        if (val === true) {
          const row = player.current.currentPos.row + rowIdx;
          const column = player.current.currentPos.column + colIdx;
          if (
            row > 19 ||
            row < 0 ||
            column < 0 ||
            column > 11 ||
            board[row][column] !== null
          ) {
            isCollided = true;
          }
        }
      });
    });

    // 4. if (coliziuni) intoarce piesa innapoi + log
    if (isCollided) {
      updatePosition(DIRECTION.up);
      console.log("colizune auch");
    }
    // 5. deseneaza piesa
    player.current.tetromino.shape.forEach((row, rowIdx) => {
      row.forEach((val, colIdx) => {
        const row = player.current.currentPos.row + rowIdx;
        const column = player.current.currentPos.column + colIdx;

        if (val === true) {
          board[row][column] = player.current.tetromino.color;
        }
      });
    });

    if (isCollided) {
      player.current = {
        currentPos: { row: 0, column: 5 },
        tetromino: randomTetromino(),
      };
    }

    setBoard([...board]);
  };

  return [updateBoard, board];
};
