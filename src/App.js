import React, { useEffect, useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Nav } from "./Components/Nav/Nav";
import { Home } from "./Components/Home/Home";
import { Merchendise } from "./Components/Merchendise/Merchendise";
import { Chat } from "./Components/Chat/Chat";
import { LogReg } from "./Components/LogReg/LogReg";
import { LoginContext } from "./Context/loginContext";

export const App = () => {
  const { loggin } = useContext(LoginContext);

  useEffect(() => {
    if (localStorage.getItem("LogDetail") !== null) {
      loggin(JSON.parse(localStorage.getItem("LogDetail")));
    }
  }, []);

  return (
    <>
      <Router>
        <Nav />
        <Switch>
          <Route path="/" exact component={Home}></Route>
          <Route path="/merchendise" exact component={Merchendise}></Route>
          <Route path="/chat" exact component={Chat}></Route>
          <Route path="/login" exact component={LogReg}></Route>
        </Switch>
      </Router>
    </>
  );
};
