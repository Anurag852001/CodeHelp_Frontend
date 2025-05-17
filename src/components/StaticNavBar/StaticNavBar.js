import { useEffect, useRef } from 'react';
import defaultNavStyles from './StaticNavBar.module.css';
import { useNavigate } from 'react-router-dom';

const StaticNavBar = ({ items, onLinkClick,setShowNavBar,selectedItem,dynamicNavStyles }) => {
    console.log("DynamicNavStyles",dynamicNavStyles);
    const styles = dynamicNavStyles == null || dynamicNavStyles ==undefined? defaultNavStyles : dynamicNavStyles;
    const navigate = useNavigate();

    return (
    <nav className={styles.navbar} >
            {items.map((item, index) => (
                <div
                    key={index}
                    className={item==selectedItem? styles.navItemSelected : styles.navItem}
                    onClick={() => {
                        onLinkClick(item);
                            navigate(item.navigation);
                            console.log(item.navigation)
                        }
                    }
                >
                    {item.label}
                </div>
            ))}
        </nav>
    );
};

export default StaticNavBar;
