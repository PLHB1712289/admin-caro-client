import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import AssignmentIcon from "@material-ui/icons/Assignment";
import { Drawer, List } from "@material-ui/core";
import { Link } from "react-router-dom";
import useStyles from "./useStyles";

export default function SideBar({ open, onDrawerClose }) {
  const classes = useStyles();

  return (
    <Drawer
      classes={{
        paper: classes.drawerPaper,
      }}
      open={open}
      onClose={onDrawerClose}
    >
      <List>
        <ListSubheader inset>Admin management</ListSubheader>
        <ListItem button component={Link} to="/users" onClick={onDrawerClose}>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="User management" />
        </ListItem>
        <ListItem button component={Link} to="/games" onClick={onDrawerClose}>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="Game management" />
        </ListItem>
        <ListItem button component={Link} to="/admins" onClick={onDrawerClose}>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText
            style={{ color: "red" }}
            primary="Admin authorization"
          />
        </ListItem>
      </List>
    </Drawer>
  );
}
