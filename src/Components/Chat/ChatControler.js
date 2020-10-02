import React from "react";

import styles from "./Chat.module.css";
import pubg from "./img/pubg.jpg";
import freefire from "./img/freefire.jpg";
import coc from "./img/coc.jpg";

export const ChatControler = ({ switchGroup }) => {
  const groups = [
    { name: "pubg", img: pubg },
    { name: "freefire", img: freefire },
    { name: "coc", img: coc },
  ];
  return (
    <div className={styles.chatControler}>
      {groups.map((group, i) => (
        <GroupBadge group={group} key={i} switchGroup={switchGroup} />
      ))}
    </div>
  );
};

const GroupBadge = ({ group: { name, img }, switchGroup }) => {
  return (
    <div className={styles.groupBadge}>
      <img
        className={styles.badge}
        src={img}
        alt="game-badge"
        onClick={() => switchGroup(name)}
      ></img>
    </div>
  );
};
