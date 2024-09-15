import React from "react";
import logoImage from "../../resources/Logo.svg";
import styles from "./Logo.module.css";

function Logo() {
  return (
    <div className={styles.container}>
      <img src={logoImage} alt="Logo" className={styles.image} />
      <div className={styles.textContainer}>
        <div className={styles.mainLogoText}>CODEHELP</div>
        <div className={styles.Slogan}>MANIPULATE BITS NOT PEOPLE</div>
      </div>
    </div>
  );
}

export default Logo;
