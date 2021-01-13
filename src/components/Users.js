import { Paper } from "@material-ui/core";
import React from "react";
import UserGrid from "./grids/UserGrid";

export default function Games() {
  return (
    <Paper style={{ margin: 10, padding: 10 }} elevation={0}>
      <UserGrid />
    </Paper>
  );
}
