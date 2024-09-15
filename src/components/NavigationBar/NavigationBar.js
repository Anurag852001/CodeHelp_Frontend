import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./NavigationBar.module.css";

function NavigationBar({ items, onToggleSidebar }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (event.clientY < 50) {
        // Show the navbar if the mouse is near the top (within 100px of the top)
        setIsVisible(true);
      } else {
        // Hide the navbar if the mouse moves away from the top
        setIsVisible(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <nav
      className={`${styles.NavigationBar} ${
        isVisible ? styles.Visible : styles.Hidden
      }`}
    >
      <ul className={styles.NavList}>
        {items.map((item, index) => (
          <li key={index} className={styles.NavItem}>
            <Link
              to={item.link}
              className={styles.NavLink}
              onClick={onToggleSidebar}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default NavigationBar;
