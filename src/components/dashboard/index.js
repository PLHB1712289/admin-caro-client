import React from "react";
import { Paper } from "@material-ui/core";
import OnlineLineChart from "../charts/OnlineLineChart";

export default function Dashboard() {
  return (
    <Paper style={{ margin: 10, padding: 10 }} elevation={0}>
      <Paper elevation={5}>
        <OnlineLineChart />
      </Paper>
    </Paper>
  );
}
