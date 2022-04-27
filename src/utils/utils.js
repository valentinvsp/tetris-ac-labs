export function getEmptyBoard() {
  return [
    [null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null],
  ];
}

/**
 *
 * @param {object} player has position and shape
 * @param {function} callback takes row, col and color as params
 */
export function forEachTile(player, callback) {
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

export function checkCollisions(player, board) {
  let isCollided = false;
  forEachTile(player, (row, col) => {
    if (col < 0 || col > 11 || row > 19 || board[row][col] !== null) {
      isCollided = true;
    }
  });
  return isCollided;
}

export const DIRECTION = {
  up: "UP",
  down: "DOWN",
  left: "LEFT",
  right: "RIGHT",
};

export const opposite = (direction) => {
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
