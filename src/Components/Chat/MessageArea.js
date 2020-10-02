import React from "react";

import { Message } from "./Message";

const MessageArea = ({ messageList }) => {
  return (
    <>
      {messageList.map((message, i) => (
        <Message key={message._id ? message._id : i} message={message} />
      ))}
    </>
  );
};

export default React.memo(MessageArea);
