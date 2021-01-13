import React from "react";
import { Paper } from "@material-ui/core";
import useStyles from "./useStyles";
import GameGrid from "../grids/GameGrid";

export default function Dashboard() {
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <GameGrid />
    </Paper>
  );
}
