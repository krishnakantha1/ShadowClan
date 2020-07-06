import React, { useState, useContext } from "react";
import axios from "axios";

import styles from "./LogReg.module.css";

import { LoginContext } from "../../Context/loginContext";

export const Login = () => {
  //user credientials for login.
  const [credential, setCredential] = useState({ email: "", password: "" });

  //flags
  const [wrongCred, setWrongCred] = useState(false);
  const [fetching, setFetching] = useState(false);

  //this is the function for setting context value on login.
  const { loggin } = useContext(LoginContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (credential.email.length === 0 || credential.password.length === 0)
      return;
    setFetching(true);
    const {
      data: { status, data },
    } = await axios({
      method: "POST",
      url: "https://shadowclan-auth.herokuapp.com/login",
      data: {
        email: credential.email,
        password: credential.password,
      },
    });
    if (status) {
      loggin(data);
      localStorage.setItem("LogDetail", JSON.stringify(data));
    } else {
      setWrongCred(true);
      setFetching(false);
    }
  };

  const onchange = (e) => {
    if (wrongCred) setWrongCred(false);
    const { name, value } = e.target;
    setCredential({ ...credential, [name]: value });
  };

  return (
    <div className={styles.container}>
      <div className={styles.arc}></div>
      <div className={styles.loginContainer}>
        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <div className={fetching ? styles.loader : styles.displayOff}></div>
          <h1>Shadow Clan</h1>
          <input
            className={styles.textField}
            type="text"
            value={credential.email}
            onChange={onchange}
            name="email"
            placeholder="Email"
          ></input>
          <input
            className={styles.textField}
            type="password"
            value={credential.password}
            onChange={onchange}
            name="password"
            placeholder="Password"
          ></input>

          <input
            className={styles.submitBtn}
            type="submit"
            value="Login"
            disabled={fetching ? true : false}
          ></input>
          <p className={wrongCred ? styles.danger : styles.displayOff}>
            Sorry, your credentials provieded was wrong.
          </p>
          <p>Dont have an account?? well... just register!</p>
          <button value="Register">Register</button>
        </form>
      </div>
    </div>
  );
};
