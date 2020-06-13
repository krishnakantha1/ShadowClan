import React, { useEffect, useState } from "react";

import styles from "./Nav.module.css";

export const Nav = () => {
  const [fixed, setFixed] = useState(false);

  useEffect(() => {
    const navPlacemnt = (e) => {
      if (!fixed && window.scrollY > 60) {
        setFixed(true);
      } else if (fixed && window.scrollY < 60) {
        setFixed(false);
      }
    };

    window.addEventListener("scroll", navPlacemnt);

    return () => {
      window.removeEventListener("scroll", navPlacemnt);
    };
  });
  return (
    <div className={`${styles.nav} ${fixed ? styles.navFixed : styles.navAbs}`}>
      <div className={styles.name}>
        <h2>Shadow Clan</h2>
      </div>
      <ul className={styles.navLinks}>
        <li>Home</li>
        <li>About Us</li>
        <li>Merchendise</li>
        <li>Chat</li>
        <li>Login</li>
      </ul>
    </div>
  );
};
