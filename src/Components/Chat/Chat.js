import React, { useContext, useState } from "react";

import styles from "./Chat.module.css";
import { LoginContext } from "../../Context/loginContext";

import { ChatControler } from "./ChatControler";
import { ChatArea } from "./ChatArea";

export const Chat = () => {
  const { LoginDetail } = useContext(LoginContext);

  const [group, setGroup] = useState("general");

  return (
    <div className={styles.chatContainer}>
      {LoginDetail.loggedIn ? (
        <>
          <ChatControler switchGroup={setGroup} />
          <ChatArea group={group} />
        </>
      ) : (
        <NotLoggedIn />
      )}
    </div>
  );
};

function NotLoggedIn() {
  return (
    <div className={styles.notLoggedIn}>
      <h1>Please log in to use the chat feature!</h1>
    </div>
  );
}
