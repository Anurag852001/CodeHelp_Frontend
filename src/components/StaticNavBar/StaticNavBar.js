import { useEffect, useRef } from 'react';
import styles from './StaticNavBar.module.css';

const StaticNavBar = ({ items, onLinkClick,setShowNavBar,selectedItem }) => {

    return (
        <nav className={styles.navbar} >
            {items.map((item, index) => (
                <div
                    key={index}
                    className={item==selectedItem ? styles.navItemSelected : styles.navItem}
                    onClick={() => onLinkClick(item)}
                >
                    {item}
                </div>
            ))}
        </nav>
    );
};

export default StaticNavBar;
