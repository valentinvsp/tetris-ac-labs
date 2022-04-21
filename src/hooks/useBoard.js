import { useState, useEffect, useRef, useCallback } from 'react'
import { randomTetromino } from "../tetrominos"; import { getEmptyBoard } from "../utils/utils";

export const useBoard = () => {
  const [board, setBoard] = useState(getEmptyBoard());

  const player = useRef({
    currentPos: { row: 0, column: 5 },
    tetromino: randomTetromino()
  });

  useEffect(()=> {
    console.log('test');
    // updateBoard();
  }, [])

   const updatePosition = useCallback(()=> {
     player.current = {
                currentPos: { row: player.current.currentPos.row + 1, column: player.current.currentPos.column },
                tetromino: player.current.tetromino
              }
   }, []);

   const updateBoard = () => {
     updatePosition();
     player.current.tetromino.shape.forEach((row, rowIdx) => {
         row.forEach((val, colIdx) => {
           const row = player.current.currentPos.row + rowIdx
           const column = player.current.currentPos.column + colIdx
           // update column as well when moving pieces
           if(row > 0) {
             board[row - 1][column] = null
           }
         });
       });

     player.current.tetromino.shape.forEach((row, rowIdx) => {
         row.forEach((val, colIdx) => {
           const row = player.current.currentPos.row + rowIdx
           const column = player.current.currentPos.column + colIdx

          if(val === true) {
            board[row][column] = player.current.tetromino.color
          }
         });
       });

     setBoard([...board]);
   }


  return [updateBoard, board];
}