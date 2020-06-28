import React, { useState, useContext } from "react";

import styles from "./LogReg.module.css";

import { LoginContext } from "../../Context/loginContext";

export const Login = () => {
  //user credientials for login.
  const [credential, setCredential] = useState({ email: "", password: "" });

  //this is the function for setting context value on login.
  const { loggin } = useContext(LoginContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (credential.email.length === 0 || credential.password.length === 0)
      return;
    loggin(credential.email);
  };

  const onchange = (e) => {
    const { name, value } = e.target;
    setCredential({ ...credential, [name]: value });
  };

  return (
    <div className={styles.container}>
      <div className={styles.arc}></div>
      <div className={styles.loginContainer}>
        <form onSubmit={handleSubmit} className={styles.loginForm}>
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
          ></input>
          <p>Dont have an account?? well... just register!</p>
          <button value="Register">Register</button>
        </form>
      </div>
    </div>
  );
};
