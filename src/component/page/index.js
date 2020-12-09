import React, { useEffect } from "react";
import { Switch, Route, useRouteMatch, useHistory } from "react-router-dom";

import Header from "../header";
import NotFound from "../notFound";

const Page = () => {
  // React router hook
  const match = useRouteMatch();
  const history = useHistory();

  // component didmount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      history.push("/sign-in");
      return;
    }
  }, [history]);

  return (
    <>
      <Header />
      <Switch>
        <Route path={`${match.url}profile`}>
          <div>Profile</div>
        </Route>

        <Route path={`${match.url}`} exact>
          <div>Home Page</div>
        </Route>

        <Route>
          <NotFound />
        </Route>
      </Switch>
    </>
  );
};

export default Page;
