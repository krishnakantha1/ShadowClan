import React, { useEffect, useState, useContext, useRef } from "react";

import socketIoClient from "socket.io-client";
import { Message } from "./Message";
import styles from "./Chat.module.css";
import { LoginContext } from "../../Context/loginContext";

let socket;

export const ChatArea = ({ group }) => {
  const [message, setMessage] = useState("");
  const [othersTyping, setOthersTyping] = useState([]);
  const [messageList, setMessageList] = useState([]);

  const input = useRef();
  const chatArea = useRef();

  const {
    LoginDetail: { username, token, id },
  } = useContext(LoginContext);

  useEffect(() => {
    setMessageList((messages) => []);
    input.current.value = "";
    socket = socketIoClient("https://shadowclan-msg.herokuapp.com");
    socket.emit("getLatestChat", { group, username, token });

    socket.on("latestChats", (data) => {
      setMessageList((messages) => [...data, ...messages]);
      chatArea.current.scrollTop = chatArea.current.scrollHeight;
    });

    socket.on("typing", (user) => {
      setOthersTyping((othersTyping) => [...othersTyping, user]);
    });

    socket.on("NewMessage", (data) => {
      setMessageList((messages) => [...messages, data]);
      chatArea.current.scrollTop = chatArea.current.scrollHeight;
    });

    socket.on("doneTyping", (user) => {
      setOthersTyping((othersTyping) => {
        const index = othersTyping.findIndex((typers) => typers.id === user.id);
        if (index === -1) return [...othersTyping];
        else {
          othersTyping.splice(index, 1);
          return [...othersTyping];
        }
      });
    });

    return () => {
      socket.emit("doneTyping", { username, id, group });
      socket.disconnect();
    };
  }, [group, username, token]);

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
    <div className={styles.innerChatContainer}>
      <div className={styles.chatHeading}>
        <h2>{`#${group}`}</h2>
        {othersTyping.length > 0 ? (
          <h3>{othersTyping[othersTyping.length - 1].username} is typing...</h3>
        ) : null}
      </div>
      <div className={styles.chatArea}>
        <div ref={chatArea} className={styles.chats}>
          {messageList.map((message, i) => (
            <Message key={i} message={message} />
          ))}
        </div>
        <form onSubmit={handleMessageSend}>
          <input
            ref={input}
            type="text"
            value={message}
            onFocus={(e) => isTyping()}
            onBlur={(e) => isDoneTyping()}
            onChange={(e) => setMessage(e.target.value)}
          ></input>
          <input type="submit" />
        </form>
      </div>
    </div>
  );
};
