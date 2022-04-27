import { useState, useRef, useCallback, useEffect } from "react";
import { ActiveTetro } from "../classes/ActiveTetro";
import { DIRECTION, getEmptyBoard, opposite } from "../utils/utils";

export const useBoard = () => {
  const [board, setBoard] = useState(getEmptyBoard());
  const player = useRef(new ActiveTetro(0, 5));

  useEffect(() => {
    player.current.paint(board);
    // TODO -> passing the board in the deps array would make this effect run ad infintum
  }, []);

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

  return [attemptMove, board];
};
