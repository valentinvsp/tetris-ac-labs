import { randomTetromino } from "../tetrominos";
import { DIRECTION } from "../utils/utils";

export class ActiveTetro {
  constructor(row, column) {
    this.currentPos = {
      row,
      column,
    };
    this.tetromino = randomTetromino();
  }

  /**
   *
   * @param {function} callback takes arguments row, column and color
   */
  forEachTile(callback) {
    this.tetromino.shape.forEach((row, rowIdx) => {
      row.forEach((val, colIdx) => {
        if (val === true) {
          const row = this.currentPos.row + rowIdx;
          const column = this.currentPos.column + colIdx;
          callback(row, column, this.tetromino.color);
        }
      });
    });
  }

  erase(board) {
    this.forEachTile((row, col) => (board[row][col] = null));
  }

  paint(board) {
    this.forEachTile((row, column, color) => (board[row][column] = color));
  }

  move(direction = DIRECTION.down) {
    const verticalAdjustment =
      direction === DIRECTION.down ? 1 : direction === DIRECTION.up ? -1 : 0;

    const horizontalAdjustment =
      direction === DIRECTION.right ? 1 : direction === DIRECTION.left ? -1 : 0;

    this.currentPos.row = this.currentPos.row + verticalAdjustment;
    this.currentPos.column = this.currentPos.column + horizontalAdjustment;
  }

  checkCollisions(board) {
    let isCollided = false;

    this.forEachTile((row, col) => {
      if (col < 0 || col > 11 || row > 19 || board[row][col] !== null) {
        isCollided = true;
      }
    });

    return isCollided;
  }

  rotate(direction) {
    this.tetromino.shape = rotateMatrix(this.tetromino.shape, direction);
  }
}

const rotateMatrix = (matrix, direction = DIRECTION.clockwise) => {
  if (direction === DIRECTION.clockwise) {
    const newMatrix = [];
    matrix.reverse().forEach((line) =>
      line.forEach((elem, idx) => {
        if (!newMatrix[idx]) newMatrix[idx] = [];
        newMatrix[idx].push(elem);
      })
    );
    return newMatrix;
  }

  if (direction === DIRECTION.counterClockwise) {
    const newMatrix = [];
    matrix.forEach((line) =>
      line.reverse().forEach((elem, idx) => {
        if (!newMatrix[idx]) newMatrix[idx] = [];
        newMatrix[idx].push(elem);
      })
    );
    return newMatrix;
  }

  throw new Error("invalid direction");
};
