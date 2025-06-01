import defaultStyles from './SideNav.module.css';
import LeftArrow from '../../resources/LeftArrow.png';
import RightArrow from '../../resources/RightArrow.png';
import { useState } from 'react';

function SideNav({items,onItemClick,customStyles}){
  const [navOpen, setNavOpen] = useState(false);
   let styles = customStyles;
    if(customStyles === undefined){
        styles = defaultStyles;
    }

    const onArrowToggleHandler = () =>{
        setNavOpen(!navOpen)
    }
    return (<div className={navOpen ? styles.mainContainer:styles.mainContainerClosed}>
        <ul className={styles.list}>
            <img src={navOpen ? LeftArrow:RightArrow} className={styles.arrow} onClick={onArrowToggleHandler}></img>
            {items.map((item,index)=>{
                return <li key = {index} onClick={onItemClick} className={styles.listItem}><img src={item.icon} className={styles.listIcon}>
                    </img> <div className={navOpen?styles.itemNameOpen:styles.itemNameClosed}> {item.name} </div></li>
            })}
        </ul>

    </div>)
}
export default SideNav;