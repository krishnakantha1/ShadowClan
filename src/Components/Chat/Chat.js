import React, { useContext, useState, useEffect } from "react";

import styles from "./Chat.module.css";

import { ChatControler } from "./ChatControler";
import { ChatArea } from "./ChatArea";

import { LoginContext } from "../../Context/loginContext";

import socketIoClient from "socket.io-client";
import GroupManagement from "./GroupManagement";
let socket;

export const Chat = () => {
  const [chatLoad,setChatLoad] = useState(true);
  const [MGTgroupToggle,setGroupToggle] = useState(false);
 
  const {
    LoginDetail
  } = useContext(LoginContext);

  const { id,username } = LoginDetail;

  const [groupSet,setGroupSet] = useState({});
  const [group, setGroup] = useState({});

  const getGroup = async ()=>{
      //https://shadowclan-msg.herokuapp.com/
      socket = socketIoClient("http://localhost:4000/");

      socket.emit("getGroups",{userId:id,username});

      socket.on("userGroups", data => {
        const {group_list} = data;
        const group_set = {}
        if(group_list.length===0) setGroup(null);
        else setGroup(group_list[0]);
        group_list.forEach(group => {
          group_set[group.g_id] = group;
        });
        setGroupSet(group_set);
        setChatLoad(false);
      });

      socket.on("highError", data => console.log(data));
  }

  useEffect(() => {

    getGroup();

    return () => {
      socket.disconnect();
    }
  },[]);

  return (
    <div className={styles.chatContainer}>
      {LoginDetail.loggedIn ? 
        chatLoad ? (
          <ChatLoader/>
        ) : (
        <>
          <ChatControler groupSet={groupSet} setGroup={setGroup} socket={socket} setGroupToggle={setGroupToggle}/>
          {group!==null && (<ChatArea group={group} socket={socket} />)}
          {group===null && (<JoinOrCreateGroupPrompt/>)}
          {MGTgroupToggle && <GroupManagement setGroup={setGroup} setGroupSet={setGroupSet} setGroupToggle={setGroupToggle} socket={socket}/>}
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

function ChatLoader(){
  return (
    <div className={styles.notLoggedIn}>
      <div className={styles.previousBtn}>
          <span style={{ "--i": "1" }}></span>
          <span style={{ "--i": "2" }}></span>
          <span style={{ "--i": "3" }}></span>
        </div>
    </div>
  )
}

function JoinOrCreateGroupPrompt(){
  const containerStyle = {
    width:'100%',
    height:'90vh',
    'background-color':'black',
    display:'flex',
    'flex-direction':'column',
    'align-items':'center',
    'justify-content':'center',
    position:'absolute',
    transition: 'all ease-in-out 0.5s',
  }

  //Sliding for mobile*******************
  const [slide, setSlide] = useState(false);
  var xDown = null;
  var yDown = null;
  function getTouches(evt) {
    return evt.touches || evt.originalEvent.touches;
  }
  const handleTouchStart = (evt) => {
    const firstTouch = getTouches(evt)[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
  };
  const handleTouchMove = (evt) => {
    if (!xDown || !yDown) {
      return;
    }

    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      if (xDiff > 0) {
        if (slide) setSlide(false);
      } else {
        if (!slide) setSlide(true);
      }
    }

    xDown = null;
    yDown = null;
  };
  //************************************* */

  return (
    <div className={`${styles.xyz} ${slide ? styles.slide : ""}`} 
    onTouchStart={handleTouchStart}
    onTouchMove={handleTouchMove}
    >
      <p>You Arent In Any Group.</p>
      <p>Join Or Create A Group By Pressing The '+' Icon On The Left</p>
    </div>
  )
}
