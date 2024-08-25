import React, { useState, useEffect } from "react";
import { fetchWelcomeApi } from "../../apiUtils/apiCalls";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
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

  return (
    <div className={styles.background}>
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
