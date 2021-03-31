import React,{useState} from "react";

import styles from "./Chat.module.css";


export const ChatControler = ({ groupSet, setGroup, setGroupToggle }) => {

  return (
    <div className={styles.chatControler}>
      {
        Object.keys(groupSet).map((key,i)=>(
          <GroupBadge group={groupSet[key]} key={i} setGroup={setGroup}/>
        ))
      }
      <div className={styles.groupBadge}>
        <span className={styles.addBadge} onClick={()=> setGroupToggle((value)=>!value)}>
          <p className={styles.badgeText}>+</p>
        </span>
      </div>
    </div>
  );
};

const GroupBadge = ({ group, setGroup }) => {
  return (
    <div className={styles.groupBadge}>
      <span className={styles.badge} onClick = {()=>setGroup(group)}>
        <p className={styles.badgeText}>{group.g_name[0]}</p>
      </span>
    </div>
  );
};
