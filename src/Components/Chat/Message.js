import React, { useContext } from "react";

import { LoginContext } from "../../Context/loginContext";

import styles from "./Chat.module.css";

export const Message = ({ message,prevsame }) => {
  const {
    LoginDetail: { username },
  } = useContext(LoginContext);
  
  return (
    <div
      className={
        username === message.username ? styles.myMessage : styles.othersMessage
      }
      id={message._id}
    >
      <div className={`${styles.messageInner} ${prevsame?styles.sameUser:''}`}>
        {prevsame || username === message.username ? null : <p className={styles.userName}>{message.username}</p>}
        <p>{message.message}</p>
      </div>
    </div>
  );
};
