import React from "react";

import { l } from "./tetrominos";

export default function Tetromino() {
  const lShape = [];

  l.forEach((row, rowIdx) => {
    row.forEach((val, colIdx) => {
      if (val === true) {
        lShape.push({ row: rowIdx + 1, col: colIdx + 1 });
      }
    });
  });
  return (
    <>
      {lShape.map(({ row, col }) => (
        <div
          style={{
            gridRowStart: row,
            gridRowEnd: row + 1,
            gridColumnStart: col,
            gridColumnEnd: col + 1,
            background: "blue",
          }}
        ></div>
      ))}
    </>
  );
}
