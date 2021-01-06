import React, { useState } from "react";
import { Container, Paper } from "@material-ui/core";
import useStyles from "./useStyles";
import Header from "../layout/Header";
import GameLineChart from "../charts/GameLineChart";
import GameBarChart from "../charts/GameBarChart";
import SideBar from "../layout/SideBar";
import UserGrid from "../grids/UserGrid";

export default function Dashboard() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => setOpen(true);

  const handleDrawerClose = () => setOpen(false);

  // const contentComponent = ({ children }) => <b>{children}</b>;

  return (
    <div className={classes.root}>
      <Header onDrawerOpen={handleDrawerOpen} />
      <SideBar onDrawerClose={handleDrawerClose} open={open} />

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Paper className={classes.paper}>
            <GameLineChart />
          </Paper>

          <Paper className={classes.paper}>
            <GameBarChart />
          </Paper>

          <Paper className={classes.paper}>
            <UserGrid />
          </Paper>
        </Container>
      </main>
    </div>
  );
}
