import React from "react";

import { Message } from "./Message";

const MessageArea = ({ messageList }) => {
  var prev = "";
  return (
    <>
      {
      messageList.map((message, i) =>{
        var prevsame = false;
        if(prev===message.username) prevsame = true;
        prev = message.username;
        return <Message key={message._id ? message._id : i} message={message} prevsame={prevsame}/>
      })}
    </>
  );
};

export default React.memo(MessageArea);
