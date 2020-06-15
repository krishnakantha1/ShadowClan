import React, { useState, useContext } from "react";

import styles from "./LoginLogout.module.css";

import { LoginContext } from "../../Context/loginContext";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loggin } = useContext(LoginContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.length === 0 || password.length === 0) return;
    loggin(email);
  };
  return (
    <div className={styles.loginContainer}>
      <h1>Shadow Clan</h1>
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <input
          className={styles.textField}
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        ></input>
        <input
          className={styles.textField}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        ></input>
        <input className={styles.submitBtn} type="submit" value="Login"></input>
      </form>
    </div>
  );
};
