import React, { useState, useEffect } from "react";
import { fetchWelcomeApi } from "../../apiUtils/apiCalls";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import Logo from "../../components/Logo/Logo";
function WelcomePage() {
  const [response, setResponse] = useState(null);
  const navigate = useNavigate();

  // the welcome page api
  useEffect(() => {
    fetchWelcomeApi()
      .then((data) => setResponse(data))
      .catch((err) => {
        console.log("Error occurred:", err);
      });
  }, []);

  function onClickHandler() {
    navigate("/solve");
  }

  function onProblemsClickHandler() {
    navigate("/");
  }

  return (
    <div className={styles.background}>
      <div className={styles.logo}>
        <Logo></Logo>
      </div>
      <ul className={styles.list}>
        <li>
          <span className={styles.listItems}>Explore</span>
          <span className={styles.listItems} onClick={onProblemsClickHandler}>
            Problems
          </span>
          <span className={styles.listItems}>Sign In</span>
        </li>
      </ul>
      <div className={styles.welcomeText}>
        {response === null ? "..is Loading" : response.message}
      </div>
      <button className={styles.button} onClick={onClickHandler}>
        Lets get started
      </button>
    </div>
  );
}

export default WelcomePage;
