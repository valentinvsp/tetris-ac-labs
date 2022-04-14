import React from "react";

import "./style.css";

export function TileBoard({ board }) {
  const tiles = [];

  board.forEach((row, rowIdx) => {
    row.forEach((val, colIdx) => {
      if (val === "green") console.log("found green");

      tiles.push({
        row: rowIdx + 1,
        col: colIdx + 1,
        color: val || "lightgray",
      });
    });
  });

  console.log(tiles);

  return (
    <div className="tile-board">
      {tiles.map(({ row, col, color }) => (
        <div
          style={{
            gridRowStart: row,
            gridRowEnd: row + 1,
            gridColumnStart: col,
            gridColumnEnd: col + 1,
            background: color,
          }}
        ></div>
      ))}
    </div>
  );
}
