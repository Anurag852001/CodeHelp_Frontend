import React from "react";
import { Link } from "react-router-dom";
import styles from "./NavigationBar.module.css";
import logo from "../../resources/Logo.svg"; // adjust path if needed

function NavigationBar({ items, onToggleSidebar }) {
  return (
    <nav className={styles.NavigationBar}>
      <div className={styles.LogoSection}>
        <img src={logo} alt="Logo" className={styles.Logo} />
     
      </div>
      <ul className={styles.NavList}>
        {items.map((item, index) => (
          <li key={index} className={styles.NavItem}>
            <Link to={item.link} className={styles.NavLink} onClick={onToggleSidebar}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default NavigationBar;
