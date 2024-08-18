import React, { useState, useEffect } from "react";
import { fetchWelcomeApi } from "../../apiUtils/apiCalls";
import styles from "./styles.module.css";
function WelcomePage() {
  const [response, setResponse] = useState(null);

  // the welcome page api
  useEffect(() => {
    fetchWelcomeApi()
      .then((data) => setResponse(data))
      .catch((err) => {
        console.log("Error occurred:", err);
      });
  }, []);

  return (
    <div className={styles.background}>
      <div className={styles.welcomeText}>
        {response === null ? "..is Loading" : response.message}
      </div>
    </div>
  );
}

export default WelcomePage;
