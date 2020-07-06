import React, { useContext } from "react";

import { LoginContext } from "../../Context/loginContext";

import styles from "./Chat.module.css";

export const Message = ({ message }) => {
  const {
    LoginDetail: { username },
  } = useContext(LoginContext);

  return (
    <div
      className={
        username === message.username ? styles.myMessage : styles.othersMessage
      }
    >
      <div className={styles.messageInner}>
        <h3>{username === message.username ? null : message.username}</h3>
        <h4>{message.message}</h4>
      </div>
    </div>
  );
};
