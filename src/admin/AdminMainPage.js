import StaticNavBar from "../components/StaticNavBar/StaticNavBar";
import WelcomeBackGround from "../components/WelcomeBackground/WelcomeBackGround";
import styles from "./AdminMainPage.module.css"
import logo from "../../src/resources/Logo.svg"
import navStyles from "./adminMainPageNavStyles.module.css"

function AdminMainPage() {
  let items =["Login", "Sign Up", "About Us", "Contact Us"]
  return (
  <WelcomeBackGround>
    <div className={styles.topBarContainer}>
      <div className={styles.logoName}></div>
<StaticNavBar items={items} className={styles.navBar} dynamicNavStyles={navStyles} ></StaticNavBar>

</div>
<div className={styles.portal}>
  <div className={styles.mainPortal}>
    <input type="text" placeholder="Enter phone or email"></input>
     <input type="text" placeholder="Enter password"></input>
     <button className={styles.loginButton}>Login</button>
  </div>
  
  </div> 
  </WelcomeBackGround>
  );
}

export default AdminMainPage;