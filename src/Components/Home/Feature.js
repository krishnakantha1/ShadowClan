import React from "react";

import styles from "./Home.module.css";

export const Feature = ({ image, title, note }) => {
  return (
    <section className={styles.featureContainer}>
      <img src={image} alt="message bubble" />
      <div>
        <h2>{title}</h2>
        <p>
          <span>Shadowclan</span> {note}
        </p>
      </div>
    </section>
  );
};
