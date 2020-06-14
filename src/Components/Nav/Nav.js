import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
    <div className={`${styles.nav} ${fixed ? styles.navFixed : ""}`}>
      <div className={styles.name}>
        <h2 className={styles.title}>Shadow Clan</h2>
      </div>
      <ul className={styles.navLinks}>
        <Link to="/" className={styles.link}>
          <li>Home</li>
        </Link>
        <a href="#aboutUs" className={styles.link}>
          <li>About Us</li>
        </a>
        <Link to="/merchendise" className={styles.link}>
          <li>Merchendise</li>
        </Link>
        <Link to="/chat" className={styles.link}>
          <li>Chat</li>
        </Link>
        <Link to="/login" className={styles.link}>
          <li>Login</li>
        </Link>
      </ul>
    </div>
  );
};
