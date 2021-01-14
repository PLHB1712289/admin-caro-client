import React, { useState,useEffect } from "react";
import { BrowserRouter as Router, Switch, Route,Redirect,useHistory } from "react-router-dom";
// import SignIn from "./components/signIn";
import NotFound from "./components/notFound";
import Dashboard from "./components/dashboard";
import { CssBaseline } from "@material-ui/core";
import Game from "./components/Game";
import Games from "./components/Games";
import Admins from "./components/Admins";
import Users from "./components/Users";
import useStyles from "./components/dashboard/useStyles";
import Header from "./components/layout/Header";
import SideBar from "./components/layout/SideBar";
import SignIn from "./components/authentication/signIn";

function App() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const history=useHistory();
  const handleDrawerOpen = () => setOpen(true);

  const handleDrawerClose = () => setOpen(false);

  const [token,setToken]=useState(null);
  useEffect(()=>{
    if (localStorage.getItem("token")!==null && localStorage.getItem("token")!== "undefined" && token===null) {
      setToken(localStorage.getItem("token"));
    }
   
  },[token])
  // if(token===null)
  // {
  //   return(
      // <Router>
      //   <Switch>
      //           <Route path={"/sign-in"}>
      //                     <SignIn />
      //             </Route>
      //             <Route >
      //               <Redirect to="/sign-in"/>

      //             </Route>
      //   </Switch>
      // </Router>
      
  //   );
  // }
  return (
    <React.Fragment>
      <CssBaseline />

      <div className={classes.root}>
        <Router>
          <Header onDrawerOpen={handleDrawerOpen} />
          <SideBar onDrawerClose={handleDrawerClose} open={open} />
          
          

          <main className={classes.content}>
            
            <div className={classes.appBarSpacer} />
   
            <Switch>
              
              <Route path={"/sign-in"}>
                  <SignIn />
              </Route>

              <Route path={"/games"}>
                <Games />
              </Route>
              
              <Route path={"/users"}>
                <Users />
              </Route>

              <Route path={"/admins"}>
                <Admins />
              </Route>

              <Route path={"/game/:id"}>
                <Game />
              </Route>
              
              <Route path={"/"}>
                <Dashboard />
              </Route>

              <Route>
                <NotFound />
              </Route>
            </Switch>
          </main>
        </Router>
      </div>
    
      
    </React.Fragment>
  );
  
}

export default App;
