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
          <div>
            <h2>Leader</h2>
            <p>Mr Dark MS</p>
            <p>Fire fire: MR_DarkMS7</p>
            <p>PUBG mobile:MR_DarkMS7</p>
            <p>Clash of clans: DarkLord</p>
          </div>
        </section>
        <section>
          <img src={ninjastar} alt="" />
          <div>
            <h2>Co Leader</h2>
            <p>Ninjastar</p>
            <p>Fire fire: _Ninja$tar_</p>
            <p>PUBG mobile:Ninja$tar</p>
            <p>Clash of clans: Ninjatar</p>
          </div>
        </section>
      </div>
    </div>
  );
};
