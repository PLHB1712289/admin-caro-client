import {
  Grid,
  Paper,
  List,
  ListItemIcon,
  ListItemText,
  ListItem,
} from "@material-ui/core";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Board from "./Board";
import httpClient from "../../httpClient";
import config from "../../config";
import Loading from "../shared/loading";
import { Pagination } from "@material-ui/lab";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import Moment from "react-moment";
import NoteIcon from "@material-ui/icons/Note";
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";
import MessageGrid from "../grids/MessageGrid";

const size = 20;
function generateDefaultBoard() {
  return Array(size).fill(Array(size).fill(null));
}

export default function Game() {
  const { id } = useParams();
  const [rowValues, setRowValues] = useState(generateDefaultBoard());
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);
  const [game, setGame] = useState({
    playerX: "Loading...",
    playerO: "Loading...",
  });
  const [loading, setLoading] = useState(true);
  const MOVES_URL = `${config.URL_SERVER}/games/${id}/moves`;
  const GAME_URL = `${config.URL_SERVER}/games/${id}`;
  function fetchBoard(page) {
    setLoading(true);
    const params = page ? { page: total - page + 1 } : {};
    httpClient.get(MOVES_URL, { params }).then((res) => {
      const board = res.data.moves[0].board;
      const currentPage = page ? page : res.data.total;
      const total = res.data.total;
      const rowValues = [];
      for (let i = 0, j = board.length; i < j; i += size) {
        rowValues.push(board.slice(i, i + size));
      }
      setRowValues(rowValues);
      setPage(currentPage);
      setTotal(total);
      setLoading(false);
    });
  }

  useEffect(() => {
    httpClient.get(GAME_URL).then((res) => {
      setGame(res.data.game);
    });
  }, [GAME_URL]);
  useEffect(fetchBoard, [MOVES_URL, total]);

  function handlePageChange(page) {
    fetchBoard(page);
  }

  return (
    <Paper style={{ margin: 10, padding: 10 }} elevation={0}>
      <Grid container spacing={2} style={{ marginBottom: 10 }} justify="center">
        <Grid item xs={12}>
          <Paper
            style={{
              paddingLeft: 20,
              paddingTop: 5,
              paddingBottom: 5,
            }}
            elevation={5}
          >
            <h1 style={{ fontSize: 20 }}>Match summary</h1>
            <List>
              <ListItem>
                <ListItemIcon>
                  <AccessTimeIcon />
                </ListItemIcon>
                <ListItemText>
                  Started at&nbsp;
                  <b>
                    <Moment format="HH:mm DD/MM/YYYY">{game.created_at}</Moment>
                  </b>
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <NoteIcon />
                </ListItemIcon>
                <ListItemText>
                  <b>{total}</b>&nbsp;moves
                </ListItemText>
              </ListItem>
              {game.winner && (
                <ListItem>
                  <ListItemIcon>
                    <EmojiPeopleIcon />
                  </ListItemIcon>
                  <ListItemText>
                    <b>{game.winner}</b>&nbsp;was the winner
                  </ListItemText>
                </ListItem>
              )}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper
            style={{
              backgroundColor: "#e34647",
              paddingLeft: 20,
              paddingTop: 5,
              paddingBottom: 5,
            }}
          >
            <p style={{ fontSize: 18, color: "white" }}>{game.playerX}</p>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper
            style={{
              backgroundColor: "#56b057",
              paddingLeft: 20,
              paddingTop: 5,
              paddingBottom: 5,
            }}
          >
            <p style={{ fontSize: 18, color: "white" }}>{game.playerO}</p>
          </Paper>
        </Grid>
      </Grid>
      {loading && <Loading />}
      <Board rowValues={rowValues} />
      <Grid container justify="center">
        <Pagination
          style={{ marginTop: 10 }}
          size="large"
          color="primary"
          showFirstButton
          showLastButton
          page={page}
          count={total}
          onChange={(e, page) => handlePageChange(page)}
        />
      </Grid>
      <Grid container justify="center" style={{ marginTop: 50 }}>
        <MessageGrid idGame={id} />
      </Grid>
    </Paper>
  );
}
