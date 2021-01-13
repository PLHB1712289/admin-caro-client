import Square from "./Square";
import React from "react";

export default function Row({ values, rowIndex }) {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {values.map((value, index) => (
        <Square value={value} key={rowIndex * values.length + index} />
      ))}
    </div>
  );
}
