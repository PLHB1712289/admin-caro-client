import { Paper } from "@material-ui/core";
import React from "react";
import GameGrid from "./grids/GameGrid";

export default function Games() {
  return (
    <Paper style={{ margin: 10, padding: 10 }} elevation={0}>
      <GameGrid />
    </Paper>
  );
}
