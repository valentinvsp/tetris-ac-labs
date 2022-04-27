import { useState, useRef, useCallback, useEffect } from "react";
import { randomTetromino } from "../tetrominos";
import {
  checkCollisions,
  DIRECTION,
  forEachTile,
  getEmptyBoard,
  opposite,
} from "../utils/utils";

export const useBoard = () => {
  const [board, setBoard] = useState(getEmptyBoard());

  // Q: how about making the player a class instance with a forEachTile method?
  // could also have erase() and paint() methods, which would only need a board to be passed
  // maybe call it tetromino instead of player? or active tetromino?
  const player = useRef({
    currentPos: { row: 0, column: 5 },
    tetromino: randomTetromino(),
  });

  useEffect(() => {
    forEachTile(player.current, (row, column, color) => {
      board[row][column] = color;
    });
    // TODO -> passing the board in the deps array would make this effect run ad infintum
  }, []);

  const movePlayer = useCallback((direction = DIRECTION.down) => {
    const verticalAdjustment =
      direction === DIRECTION.down ? 1 : direction === DIRECTION.up ? -1 : 0;

    const horizontalAdjustment =
      direction === DIRECTION.right ? 1 : direction === DIRECTION.left ? -1 : 0;

    player.current = {
      currentPos: {
        row: player.current.currentPos.row + verticalAdjustment,
        column: player.current.currentPos.column + horizontalAdjustment,
      },
      tetromino: player.current.tetromino,
    };
  }, []);

  const attemptMove = useCallback(
    (direction = DIRECTION.down) => {
      // render current position null
      forEachTile(player.current, (row, col) => {
        board[row][col] = null;
      });

      movePlayer(direction);
      const isCollided = checkCollisions(player.current, board);

      if (isCollided) {
        movePlayer(opposite(direction));
      }

      forEachTile(player.current, (row, column, color) => {
        board[row][column] = color;
      });

      if (isCollided && direction === DIRECTION.down) {
        // reset player
        player.current = {
          currentPos: { row: 0, column: 5 },
          tetromino: randomTetromino(),
        };

        forEachTile(player.current, (row, column, color) => {
          board[row][column] = color;
        });
      }

      setBoard([...board]);
    },
    // TODO -> make this NOT depend on the board in the callback
    [movePlayer]
  );

  return [attemptMove, board];
};
