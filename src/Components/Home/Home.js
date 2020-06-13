import React from "react";

import styles from "./Home.module.css";

export const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.banner}>
        <h1>DARK DIMENSION</h1>
        <p>Join us and become a legand</p>
        <a className={styles.takeAtour} href="#aboutUs">
          Take A Tour
        </a>
      </div>
      <div className={styles.aboutUs} id="aboutUs">
        <div>
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
    </div>
  );
};
