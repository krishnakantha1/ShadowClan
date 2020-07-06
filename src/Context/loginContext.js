import React, { createContext, useState } from "react";

const loginDetails = {
  loggedIn: false,
  username: null,
  token: null,
  id: null,
};

export const LoginContext = createContext(loginDetails);

export const LoginProvider = ({ children }) => {
  const [details, setDetails] = useState(loginDetails);

  const loggin = (data) => {
    if (!data) return;
    setDetails({
      loggedIn: true,
      username: data.username,
      token: data.token,
      id: data.id,
    });
  };

  const loggout = () => {
    if (!details.loggedIn) return;
    setDetails({
      loggedIn: false,
      username: null,
      token: null,
      id: null,
    });
    localStorage.removeItem("LogDetail");
  };

  return (
    <LoginContext.Provider value={{ LoginDetail: details, loggin, loggout }}>
      {children}
    </LoginContext.Provider>
  );
};
