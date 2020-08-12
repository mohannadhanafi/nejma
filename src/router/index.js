import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectLoading } from "store/selectors";
import { bootstrap } from "./bootstrap";
import { BootstrapLoading } from "components";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import talentRoutes from "./talent";
import customerRoutes from "./customer";
import guestRoutes from "./guest";
import commonRoutes from "./common";
import Socket from '../socket';

import { Header, Footer } from "../layout";

const Main = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);

  useEffect(() => bootstrap(dispatch), []);

  const routes = [
    ...talentRoutes(),
    ...customerRoutes(),
    ...guestRoutes(),
    ...commonRoutes(),
  ];

  if (isLoading) return <BootstrapLoading />;
  return (
    <>
    <Socket />
    <BrowserRouter>
      <Header />
      <Switch>
        {routes.map((route, index) => (
          <Route key={index} {...route} />
        ))}
        <Route path={"*"} component={() => <Redirect path={"/"} />} />
      </Switch>
      <Footer />
    </BrowserRouter>
    </>
  );
};

export default Main;
