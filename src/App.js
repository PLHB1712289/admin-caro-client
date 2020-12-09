import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignIn from "./component/signIn";
import Page from "./component/page";
import NotFound from "./component/notFound";
import ForgotPassword from "./component/forgotPassword";

function App() {
  return (
    <Router>
      <Switch>
        <Route path={"/sign-in"}>
          <SignIn />
        </Route>

        <Route path={"/forgot-password"}>
          <ForgotPassword />
        </Route>

        <Route path={"/"}>
          <Page />
        </Route>

        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
