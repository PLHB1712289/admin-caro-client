import React, { useState } from "react";
import { Paper } from "@material-ui/core";
import useStyles from "./useStyles";
import Header from "../layout/Header";
// import GameLineChart from "../charts/GameLineChart";
// import GameBarChart from "../charts/GameBarChart";
import SideBar from "../layout/SideBar";
// import UserGrid from "../grids/UserGrid";
import AdminGrid from "../grids/AdminGrid";

export default function Dashboard() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => setOpen(true);

  const handleDrawerClose = () => setOpen(false);

  return (
    <div className={classes.root}>
      <Header onDrawerOpen={handleDrawerOpen} />
      <SideBar onDrawerClose={handleDrawerClose} open={open} />

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        {/* <Container maxWidth="lg" className={classes.container}> */}
        {/* <Paper className={classes.paper}>
            <GameLineChart />
          </Paper>

          <Paper className={classes.paper}>
            <GameBarChart />
          </Paper> */}

        <Paper className={classes.paper}>
          <AdminGrid />
        </Paper>
        {/* </Container> */}
      </main>
    </div>
  );
}
