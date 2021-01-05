import React, { useState } from "react";
import { Drawer, List, Container, Paper } from "@material-ui/core";
import useStyles from "./useStyles";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import AssignmentIcon from "@material-ui/icons/Assignment";
import Header from "../header";
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  BarSeries,
  SplineSeries,
  Legend,
  Title,
  Tooltip,
} from "@devexpress/dx-react-chart-material-ui";

import { ValueScale, Animation } from "@devexpress/dx-react-chart";
import { SortingState, IntegratedSorting } from "@devexpress/dx-react-grid";
import {
  Grid,
  Table,
  TableHeaderRow,
} from "@devexpress/dx-react-grid-material-ui";

// import Loading from "../shared/loading";
import { sales as data } from "../../data";

export default function Dashboard() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => setOpen(true);

  const handleDrawerClose = () => setOpen(false);
  const [columns] = useState([
    { name: "month", title: "Name" },
    { name: "sale", title: "Gender" },
    { name: "total", title: "City" },
  ]);
  const [rows] = useState(data[2017]);

  const contentComponent = ({ children }) => <b>{children}</b>;

  return (
    <div className={classes.root}>
      <Header handleDrawerOpen={handleDrawerOpen} />
      <Drawer
        classes={{
          paper: classes.drawerPaper,
        }}
        open={open}
        onClose={handleDrawerClose}
      >
        <List>
          <ListSubheader inset>Saved reports</ListSubheader>
          <ListItem button>
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="User management" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Game management" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="For admin" />
          </ListItem>
        </List>
      </Drawer>

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Paper className={classes.paper}>
            <Chart data={data[2017]}>
              <ValueScale name="sale" />
              <ValueScale name="total" />
              <ArgumentAxis />
              <ValueAxis scaleName="sale" showGrid={false} showLine showTicks />
              <ValueAxis
                scaleName="total"
                position="right"
                showGrid={false}
                showLine
                showTicks
              />
              <SplineSeries
                name="Units Sold"
                valueField="sale"
                argumentField="month"
                scaleName="sale"
              />

              <SplineSeries
                name="Total Transactions"
                valueField="total"
                argumentField="month"
                scaleName="total"
              />
              <Animation />
              <Title text="Live online user counter" />
              <Tooltip />
              <Legend />
            </Chart>
          </Paper>

          <Paper className={classes.paper}>
            <Chart data={data[2017]}>
              <ArgumentAxis />
              <ValueAxis />
              <BarSeries
                name="Units Sold"
                valueField="sale"
                argumentField="month"
              />
              <Animation />
              <Title text="Online counter" />
            </Chart>
          </Paper>

          <Paper>
            <Grid rows={rows} columns={columns}>
              <SortingState
                defaultSorting={[{ columnName: "city", direction: "asc" }]}
              />
              <IntegratedSorting />
              <Table />
              <TableHeaderRow
                showSortingControls
                contentComponent={contentComponent}
              />
            </Grid>
          </Paper>
        </Container>
      </main>
    </div>
  );
}
