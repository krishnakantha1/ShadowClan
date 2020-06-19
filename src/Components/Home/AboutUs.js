import React, { useState, useRef, useEffect } from "react";

import styles from "./Home.module.css";

export const AboutUs = () => {
  const [visible, setVisible] = useState(false);

  const box = useRef();

  useEffect(() => {
    const display = () => {
      const bound = box.current.getBoundingClientRect();
      if (!visible && bound.top < window.innerHeight * 0.3) {
        setVisible(true);
      } else if (visible && bound.top > window.innerHeight * 0.3) {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", display);

    display();

    return () => {
      window.removeEventListener("scroll", display);
    };
  });
  return (
    <div className={styles.aboutUs} id="aboutUs" ref={box}>
      <div className={visible ? styles.aboutVisLeft : styles.aboutInvLeft}>
        <h2>Wlcome to shadow clan</h2>
        <p>"An opportunity to give the starting point for noob tobe pro"</p>
        <p>
          Kishkinda is the kingdom of the vanara King Sugriva. The younger
          brother Bali, in the Sanskrit epic Ramayan. According to the
          historical account india, this was the kningdom where Sugriva ruled
          with the
        </p>
      </div>
      <div className={visible ? styles.aboutVisRight : styles.aboutInvRight}>
        <h2>Wlcome to shadow clan</h2>
        <p>"An opportunity to give the starting point for noob tobe pro"</p>
        <p>
          Kishkinda is the kingdom of the vanara King Sugriva. The younger
          brother Bali, in the Sanskrit epic Ramayan. According to the
          historical account india, this was the kningdom where Sugriva ruled
          with the
        </p>
      </div>
    </div>
  );
};
