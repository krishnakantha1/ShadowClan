import React from "react";

import styles from "./Home.module.css";

export const Banner = () => {
  return (
    <div className={styles.banner}>
      <h1>DARK DIMENSION</h1>
      <p>Join us and become a legand</p>
      <a className={styles.takeAtour} href="#aboutUs">
        Take A Tour
      </a>
    </div>
  );
};
