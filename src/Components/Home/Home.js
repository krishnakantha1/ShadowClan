import React from "react";

import styles from "./Home.module.css";
import { Banner } from "./Banner";
import { AboutUs } from "./AboutUs";

export const Home = () => {
  return (
    <div className={styles.container}>
      <Banner />
      <AboutUs />
    </div>
  );
};
