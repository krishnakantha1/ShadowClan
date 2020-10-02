import React, { useContext, useState } from "react";

import { LoginContext } from "../../Context/loginContext";

export const MessageTypeField = ({ socket, group, setMessageList }) => {
  const [message, setMessage] = useState("");
  const {
    LoginDetail: { username, token, id },
  } = useContext(LoginContext);

  const isTyping = () => {
    socket.emit("typing", { username, id, group });
  };

  const isDoneTyping = () => {
    socket.emit("doneTyping", { username, id, group });
  };

  const handleMessageSend = (e) => {
    e.preventDefault();
    if (message.length === 0) return;

    socket.emit("NewMessage", { message, group, username, token });
    setMessage("");
  };

  return (
    <form onSubmit={handleMessageSend}>
      <input
        type="text"
        value={message}
        onFocus={(e) => isTyping()}
        onBlur={(e) => isDoneTyping()}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message here..."
      ></input>
      <input type="submit" value="send" />
    </form>
  );
};
