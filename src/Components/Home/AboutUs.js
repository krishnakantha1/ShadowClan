import React, { useState, useRef, useEffect } from "react";

import styles from "./Home.module.css";
import img from "./img/aboutUs.png";

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
      <div className={styles.inner}>
        <img src={img} alt="" />
        <div>
          <h2>Games</h2>
          <p>
            Fire fire: <strong> _SHADOWCLAN_</strong>
          </p>
          <p>
            PUBG mobile: <strong> _SHADOW_CLAN_</strong>
          </p>
          <p>
            Clash of clans: <strong> SHADOW WARRIORS</strong>
          </p>
        </div>
      </div>
    </div>
  );
};
