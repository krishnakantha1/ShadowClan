import React, { useState, useRef, useEffect } from "react";

import styles from "./Home.module.css";

export const Banner = () => {
  const [visible, setVisible] = useState(false);

  const box = useRef();

  useEffect(() => {
    const display = () => {
      const bound = box.current.getBoundingClientRect();
      if (!visible && bound.top < window.innerHeight * 0.7) {
        setVisible(true);
      } else if (visible && bound.top > window.innerHeight * 0.7) {
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
    <div
      className={`${styles.banner} ${
        visible ? styles.bannerVisible : styles.bannerInvisible
      }`}
      ref={box}
    >
      <h1>DARK DIMENSION</h1>
      <p>Join us and become a legand</p>
      <a className={styles.takeAtour} href="#aboutUs">
        Take A Tour
      </a>
    </div>
  );
};
