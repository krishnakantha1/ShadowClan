import React from "react";

import styles from "./Home.module.css";
import { Banner } from "./Banner";
import { Tour } from "./Tour";
import { AboutUs } from "./AboutUs";
import { Leaders } from "./Leaders";

export const Home = () => {
  return (
    <div className={styles.container}>
      <Banner />
      <Tour />
      <AboutUs />
      <Leaders />
    </div>
  );
};
