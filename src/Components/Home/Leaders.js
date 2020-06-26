import React from "react";

import styles from "./Home.module.css";
import dark from "./img/Dark.png";
import ninjastar from "./img/NinjaStar.png";

export const Leaders = () => {
  return (
    <div className={styles.leader}>
      <div className={styles.inner}>
        <section>
          <img src={dark} alt="" />
          <div></div>
        </section>
        <section>
          <img src={ninjastar} alt="" />
          <div></div>
        </section>
      </div>
    </div>
  );
};
