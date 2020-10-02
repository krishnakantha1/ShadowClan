import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";

import { Nav } from "./Components/Nav/Nav";
import { Home } from "./Components/Home/Home";
import { Chat } from "./Components/Chat/Chat";
import { LogReg } from "./Components/LogReg/LogReg";
import { LoginContext } from "./Context/loginContext";

export const App = () => {
  const [verifyToken, setVerifyToken] = useState(true);

  const { loggin } = useContext(LoginContext);

  useEffect(() => {
    alwaysLogin();
  }, []);

  const alwaysLogin = async () => {
    if (localStorage.getItem("LogDetail") !== null) {
      const token = JSON.parse(localStorage.getItem("LogDetail"));
      const {
        data: { data, error, message, deleteToken },
      } = await axios({
        method: "POST",
        url: "https://shadowclan-auth.herokuapp.com/login/verify",
        data: { token },
      });
      if (error) {
        console.log(message);
        setVerifyToken(false);
        if (deleteToken) localStorage.removeItem("LogDetail");
      } else {
        loggin(data);
        setVerifyToken(false);
      }
    } else {
      setVerifyToken(false);
    }
  };
  return (
    <>
      {verifyToken ? (
        <div className="block"></div>
      ) : (
        <Router>
          <Nav />
          <Switch>
            <Route path="/" exact component={Home}></Route>
            <Route path="/chat" exact component={Chat}></Route>
            <Route
              path="/login"
              exact
              render={(props) => <LogReg {...props} isLogin={true} />}
            ></Route>
            <Route
              path="/register"
              exact
              render={(props) => <LogReg {...props} isLogin={false} />}
            ></Route>
          </Switch>
        </Router>
      )}
    </>
  );
};
