import StaticNavBar from "../components/StaticNavBar/StaticNavBar";
import WelcomeBackGround from "../components/WelcomeBackground/WelcomeBackGround";
import styles from "./AdminMainPage.module.css"
function AdminMainPage() {
  let items =["Login", "Sign Up", "About Us", "Contact Us"]
  return (
  <WelcomeBackGround>
<StaticNavBar items={items} className={styles.navBar} ></StaticNavBar>

  </WelcomeBackGround>
  );
}

export default AdminMainPage;