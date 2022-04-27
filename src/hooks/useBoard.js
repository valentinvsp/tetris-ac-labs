import { useState, useRef, useCallback } from "react";
import { ActiveTetro } from "../classes/ActiveTetro";
import { DIRECTION, getEmptyBoard, opposite } from "../utils/utils";

export const useBoard = () => {
  const [board, setBoard] = useState(getEmptyBoard());
  const player = useRef(new ActiveTetro(0, 5));

  const startNewTetro = useCallback(() => {
    player.current = new ActiveTetro(0, 5);
    player.current.paint(board);
    setBoard([...board]);
  }, [board]);

  const attemptMove = useCallback(
    (direction = DIRECTION.down) => {
      player.current.erase(board);

      player.current.move(direction);
      const isCollided = player.current.checkCollisions(board);

      if (isCollided) {
        player.current.move(opposite(direction));
      }

      player.current.paint(board);

      if (isCollided && direction === DIRECTION.down) {
        player.current = new ActiveTetro(0, 5);
        player.current.paint(board);
      }

      setBoard([...board]);
    },
    // TODO -> make this NOT depend on the board in the callback
    // beacuse it will cause the clock to constantly restart (due to linked dependencies)
    []
  );

  const attemptRotate = useCallback(() => {
    player.current.erase(board);

    player.current.rotate(DIRECTION.clockwise);
    const isCollided = player.current.checkCollisions(board);

    if (isCollided) {
      player.current.rotate(DIRECTION.counterClockwise);
    }

    player.current.paint(board);
    setBoard([...board]);
  }, [board]);

  return { attemptMove, attemptRotate, board, startNewTetro };
};
