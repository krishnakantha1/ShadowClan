import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";

import styles from "./Nav.module.css";

import { LoginContext } from "../../Context/loginContext";

export const Nav = () => {
  const [fixed, setFixed] = useState(false);
  const [promptLogout, setPromptOut] = useState(false);

  const { LoginDetail, loggout } = useContext(LoginContext);

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

  const doLogout = () => {
    setPromptOut(!promptLogout);
    loggout();
  };

  return (
    <>
      <nav className={`${styles.nav} ${fixed ? styles.navFixed : ""}`}>
        <div className={styles.logo}>
          <h2>Shadow Clan</h2>
        </div>
        <ul className={styles.navLinks}>
          <li className={styles.activeLink}>
            <Link to="/" className={styles.link}>
              Home
            </Link>
          </li>
          <li>
            <a href="/#aboutUs" className={styles.link}>
              About Us
            </a>
          </li>
          <li>
            <Link to="/merchendise" className={styles.link}>
              Merchendise
            </Link>
          </li>
          <li>
            <Link to="/chat" className={styles.link}>
              Chat
            </Link>
          </li>

          {LoginDetail.loggedIn ? (
            <li onClick={() => setPromptOut(!promptLogout)}>Logout</li>
          ) : (
            <li>
              <Link to="/login" className={styles.link}>
                Login
              </Link>
            </li>
          )}
        </ul>
        <div className={styles.burger}>
          <div className={styles.line1}></div>
          <div className={styles.line2}></div>
          <div className={styles.line3}></div>
        </div>
      </nav>
      {promptLogout && (
        <div
          className={styles.promptBackground}
          onClick={() => setPromptOut(!promptLogout)}
        >
          <div
            className={styles.prompt}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <p>Are you sure you want to logout?</p>
            <button onClick={doLogout}>Logout</button>
          </div>
        </div>
      )}
    </>
  );
};
