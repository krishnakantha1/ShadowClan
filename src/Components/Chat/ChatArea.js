import React, { useEffect, useState, useContext, useRef } from "react";

import socketIoClient from "socket.io-client";

import MessageArea from "./MessageArea";
import { MessageTypeField } from "./MessageTypeField";
import styles from "./Chat.module.css";
import { LoginContext } from "../../Context/loginContext";

let socket;

export const ChatArea = ({ group }) => {
  const [othersTyping, setOthersTyping] = useState([]);
  const [messageList, setMessageList] = useState([]);
  const [fetchingPreviousChat, setFetchingPreviousChat] = useState(false);

  const chatArea = useRef();
  const previousSize = useRef();

  const {
    LoginDetail: { username, token, id },
  } = useContext(LoginContext);

  //Initilizing the socket and other event handlers. also set the clean up.
  useEffect(() => {
    setMessageList([]);

    socket = socketIoClient("https://shadowclan-msg.herokuapp.com/");

    // {
    //   transports: [ 'websocket' ],
    //   upgrade: false
    // }

    socket.emit("getLatestChat", { group, username, token });

    socket.on("latestChat", (data) => {
      setMessageList((messages) => [...data, ...messages]);
      chatArea.current.scrollTop = chatArea.current.scrollHeight;
    });

    socket.on("previousChat", (data) => {
      setMessageList((messages) => [...data, ...messages]);
      chatArea.current.scrollTop =
        chatArea.current.scrollHeight - previousSize.current;
      setFetchingPreviousChat(false);
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

    socket.on("error", (msg) => {
      console.log(msg);
    });

    return () => {
      socket.emit("doneTyping", { username, id, group });
      socket.disconnect();
    };
  }, [group, username, token, id]);

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

  const getPreviousChat = (e) => {
    e.preventDefault();
    setFetchingPreviousChat(true);
    previousSize.current = chatArea.current.scrollHeight;
    socket.emit("getPreviousChat", {
      group,
      lastMessageId: messageList[0]._id,
    });
  };

  return (
    <div
      className={`${styles.innerChatContainer} ${slide ? styles.slide : ""}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      <div className={styles.chatHeading}>
        <h2>{`#${group}`}</h2>
        {othersTyping.length > 0 ? (
          <h3>{othersTyping[othersTyping.length - 1].username} is typing...</h3>
        ) : null}
      </div>
      <div className={styles.chatArea}>
        <div ref={chatArea} className={styles.chats}>
          <GetPreviousChatButton
            getPreviousChat={getPreviousChat}
            fetchingPreviousChat={fetchingPreviousChat}
          />
          <MessageArea messageList={messageList} />
        </div>
        <MessageTypeField
          socket={socket}
          group={group}
          setMessageList={setMessageList}
        />
      </div>
    </div>
  );
};

const GetPreviousChatButton = ({ getPreviousChat, fetchingPreviousChat }) => {
  return (
    <div
      className={`${
        fetchingPreviousChat
          ? styles.gettingPrevious
          : styles.getPreviousChatButton
      }`}
      onClick={getPreviousChat}
    >
      {!fetchingPreviousChat && (
        <div className={styles.previousBtn}>
          <span>^</span>
        </div>
      )}
      {fetchingPreviousChat && (
        <div className={styles.previousBtn}>
          <span style={{ "--i": "1" }}></span>
          <span style={{ "--i": "2" }}></span>
          <span style={{ "--i": "3" }}></span>
        </div>
      )}
    </div>
  );
};
