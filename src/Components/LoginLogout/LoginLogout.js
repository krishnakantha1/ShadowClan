import React, { useContext } from "react";

import { Login } from "./Login";

import { LoginContext } from "../../Context/loginContext";

export const LoginLogout = () => {
  const { LoginDetail } = useContext(LoginContext);

  return <>{LoginDetail.loggedIn ? "" : <Login />}</>;
};
