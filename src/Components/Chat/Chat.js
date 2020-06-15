import React, { useContext } from "react";

import { LoginContext } from "../../Context/loginContext";

export const Chat = () => {
  const { LoginDetail } = useContext(LoginContext);

  return (
    <div>{LoginDetail.loggedIn ? <h1>Chat</h1> : <h1>Please log in</h1>}</div>
  );
};
