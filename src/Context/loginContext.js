import React, { createContext, useState } from "react";

const loginDetails = {
  loggedIn: false,
  loggedInAs: null,
};

export const LoginContext = createContext(loginDetails);

export const LoginProvider = ({ children }) => {
  const [details, setDetails] = useState(loginDetails);

  const loggin = (name) => {
    if (!name) return;
    setDetails({ loggedIn: true, loggedInAs: name });
  };

  const loggout = () => {
    if (!details.loggedIn) return;
    setDetails({ loggedIn: false, loggedInAs: null });
  };

  return (
    <LoginContext.Provider value={{ LoginDetail: details, loggin, loggout }}>
      {children}
    </LoginContext.Provider>
  );
};
