import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import SignIn from "./components/signIn";
import NotFound from "./components/notFound";
import Dashboard from "./components/dashboard";
import { CssBaseline } from "@material-ui/core";

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Router>
        <Switch>
          {/* <Route path={"/signin"}>
            <SignIn />
          </Route> */}

          <Route path={"/"}>
            <Dashboard />
          </Route>

          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
