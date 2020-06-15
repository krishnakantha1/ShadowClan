import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Nav } from "./Components/Nav/Nav";
import { Home } from "./Components/Home/Home";
import { Merchendise } from "./Components/Merchendise/Merchendise";
import { Chat } from "./Components/Chat/Chat";
import { LoginLogout } from "./Components/LoginLogout/LoginLogout";

import { LoginProvider } from "./Context/loginContext";

export const App = () => {
  return (
    <>
      <LoginProvider>
        <Router>
          <Nav />
          <Switch>
            <Route path="/" exact component={Home}></Route>
            <Route path="/merchendise" exact component={Merchendise}></Route>
            <Route path="/chat" exact component={Chat}></Route>
            <Route path="/login" exact component={LoginLogout}></Route>
          </Switch>
        </Router>
      </LoginProvider>
    </>
  );
};
