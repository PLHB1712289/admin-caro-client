import {
  Avatar,
  Divider,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Chart,
  PieSeries,
  Tooltip,
} from "@devexpress/dx-react-chart-material-ui";
import { Animation, EventTracker } from "@devexpress/dx-react-chart";
import { Legend } from "@devexpress/dx-react-chart-material-ui";
import config from "../config";
import httpClient from "../httpClient";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import UserGameGrid from "./grids/UserGameGrid";

export default function Game() {
  const { username } = useParams();
  const USER_URL = `${config.URL_SERVER}/users/${username}`;

  const [user, setUser] = useState({});
  useEffect(() => {
    httpClient.get(USER_URL).then((res) => setUser(res.data.user));
  }, [username, USER_URL]);

  function toggleBlockUser() {
    if (user.active === "blocked") {
      httpClient
        .put(USER_URL, { active: "activated" })
        .then((res) => setUser(res.data.user));
    } else {
      httpClient
        .put(USER_URL, { active: "blocked" })
        .then((res) => setUser(res.data.user));
    }
  }

  return (
    <Paper style={{ margin: 10, padding: 10 }} elevation={0}>
      <Grid container justify="center">
        <Grid item xs={5} style={{ marginRight: 20 }}>
          <Paper
            style={{
              paddingLeft: 20,
              paddingTop: 12,
              paddingBottom: 12,
            }}
            elevation={5}
          >
            <Grid container justify="center" style={{ padding: 10 }}>
              <Grid container justify="center">
                <Avatar
                  alt={user.fullname}
                  src={user.avatarUrl}
                  style={{ width: 200, height: 200 }}
                />
              </Grid>
              <Grid container justify="center">
                <h1 style={{ fontSize: 20 }}>{user.fullname}</h1>
              </Grid>
              <Grid container justify="center">
                <p style={{ fontSize: 16, color: "gray" }}>{user.email}</p>
              </Grid>
            </Grid>
            <Divider />
            <List>
              <ListItem>
                <ListItemIcon>
                  <SentimentVerySatisfiedIcon />
                </ListItemIcon>
                <ListItemText>
                  Won&nbsp;
                  <b style={{ color: "green" }}>{user.totalGameWin}&nbsp;</b>
                  times
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <SentimentVeryDissatisfiedIcon />
                </ListItemIcon>
                <ListItemText>
                  Lose&nbsp;
                  <b style={{ color: "red" }}>{user.totalGameLose}&nbsp;</b>
                  times
                </ListItemText>
              </ListItem>
            </List>
            <Grid container justify="center">
              <Button
                variant="outlined"
                color="secondary"
                onClick={toggleBlockUser}
              >
                {user.active === "blocked" ? (
                  <>Unblock this user</>
                ) : (
                  <>Block this user</>
                )}
              </Button>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={5} style={{ marginLeft: 20 }}>
          <Paper elevation={5} style={{ paddingLeft: 60, paddingRight: 60 }}>
            <Chart
              data={[
                { name: "Win", count: user.totalGameWin },
                { name: "Lose", count: user.totalGameLose },
              ]}
            >
              <PieSeries valueField="count" argumentField="name" />
              <Legend />
              <EventTracker />
              <Tooltip />

              <Animation />
            </Chart>
          </Paper>
        </Grid>
      </Grid>
      <Grid container justify="center" style={{ marginTop: 50 }}>
        <UserGameGrid username={username} />
      </Grid>
    </Paper>
  );
}
