import { useState, useRef, useCallback, useEffect } from "react";
import { randomTetromino } from "../tetrominos";
import { getEmptyBoard } from "../utils/utils";

const DIRECTION = {
  up: "UP",
  down: "DOWN",
  left: "LEFT",
  right: "RIGHT",
};

const opposite = (direction) => {
  const result =
    direction === DIRECTION.up
      ? DIRECTION.down
      : direction === DIRECTION.down
      ? DIRECTION.up
      : direction === DIRECTION.left
      ? DIRECTION.right
      : direction === DIRECTION.right
      ? DIRECTION.left
      : null;

  if (!result) throw new Error(`Could not get opposite of ${direction}`);

  return result;
};

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
    [board, movePlayer]
  );

  return [attemptMove, board];
};

/**
 *
 * @param {object} player has position and shape
 * @param {function} callback takes row, col and color as params
 */
function forEachTile(player, callback) {
  player.tetromino.shape.forEach((row, rowIdx) => {
    row.forEach((val, colIdx) => {
      if (val === true) {
        const row = player.currentPos.row + rowIdx;
        const column = player.currentPos.column + colIdx;
        callback(row, column, player.tetromino.color);
      }
    });
  });
}

function checkCollisions(player, board) {
  let isCollided = false;
  forEachTile(player, (row, col) => {
    if (col < 0 || col > 11 || row > 19 || board[row][col] !== null) {
      isCollided = true;
    }
  });
  return isCollided;
}
