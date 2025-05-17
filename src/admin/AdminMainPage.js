import StaticNavBar from "../components/StaticNavBar/StaticNavBar";
import WelcomeBackGround from "../components/WelcomeBackground/WelcomeBackGround";
import styles from "./AdminMainPage.module.css"
import logo from "../../src/resources/Logo.svg"
import navStyles from "./adminMainPageNavStyles.module.css"
import LoginPage from "./pages/LoginPage/LoginPage";
import { useLocation, useNavigate } from "react-router-dom";


function AdminMainPage() {
  let items = [
  { label: "Login", component: LoginPage,navigation:"/login" },
  { label: "Sign Up", component: LoginPage,navigation:"/signUp"},
  { label: "About Us", component: LoginPage,navigation:"/aboutUs" },
  { label: "Contact Us", component: LoginPage,navigation:"/contactUs" }
];



const changePageHandler=()=>{

}

  return (
  <WelcomeBackGround className={styles.welcomeBackground}>
    <div className={styles.topBarContainer}>
      <div className={styles.logoName}>
  <img src={logo} alt="Logo" style={{ height: "4vh" }} />
  <span>CodeSprint</span>
</div>
<div className={styles.navBarContainer}>
  <StaticNavBar items={items} className={styles.navBar} dynamicNavStyles={navStyles} onLinkClick={changePageHandler} />
</div>


</div>
<div className={styles.welcomeText}>
<div className={styles.heading}>Decode Success with Code</div>
<p className={styles.subHeading}>
  A platform for curious minds—practice, read, and prepare like never before.
</p>
<div className={styles.searchBar}>
<input type="Text" placeholder="Explore our website" className={styles.inputBox}></input>
<button className={styles.searchButton}>Search</button>
</div>
  </div>
  </WelcomeBackGround>
  );
}

export default AdminMainPage;