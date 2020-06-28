import React, { useContext, useState } from "react";

import { Login } from "./Login";

import { LoginContext } from "../../Context/loginContext";

export const LogReg = () => {
  const { LoginDetail } = useContext(LoginContext);

  //to toggle between login and register component.
  const [logReg, setLogReg] = useState(true);

  return <>{LoginDetail.loggedIn ? "" : <Login />}</>;
};
