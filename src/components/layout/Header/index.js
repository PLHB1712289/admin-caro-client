import { AppBar, IconButton, Toolbar, Typography,Button } from "@material-ui/core";
import { Menu as MenuIcon } from "@material-ui/icons";
import React,{useEffect,useState} from "react";
import useStyles from "./useStyles";
import { Link ,useHistory} from "react-router-dom";
export default function Header({ onDrawerOpen }) {
  const classes = useStyles();
  const history=useHistory();

  const [token,setToken]=useState(null);
  
  const onClickSignOut=()=>{
    localStorage.removeItem("token");
    setToken(null);
    history.push("/sign-in");

  }
  useEffect(()=>{
    if(localStorage.getItem("token") !== "undefined"&&localStorage.getItem("token") !== null && token===null)
    {
      setToken(localStorage.getItem("token"));
    }
    
    
  },[token])
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
        <Button
            variant="button"
            
            onClick={onClickSignOut}

            >
            <Typography
              variant="subtitle1"
              style={{color:'white'}}
              
              
            >
              Sign out
            </Typography>        
          </Button>
        
      </Toolbar>

      
    </AppBar>
  );
}
