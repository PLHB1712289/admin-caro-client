import { AppBar, IconButton, Toolbar, Typography } from "@material-ui/core";
import { Menu as MenuIcon } from "@material-ui/icons";
import React from "react";
import useStyles from "./useStyles";
import { Link } from "react-router-dom";

export default function Header({ onDrawerOpen }) {
  const classes = useStyles();

  return (
    <AppBar position="absolute" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={onDrawerOpen}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>

        <Typography
          variant="h6"
          color="inherit"
          noWrap
          className={classes.title}
          component={Link}
          style={{ textDecoration: "none" }}
          to="/"
        >
          Dashboard
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
