import StaticNavBar from "../components/StaticNavBar/StaticNavBar";
import WelcomeBackGround from "../components/WelcomeBackground/WelcomeBackGround";
import styles from "./AdminMainPage.module.css"
import logo from "../../src/resources/Logo.svg"
import navStyles from "./adminMainPageNavStyles.module.css"
import LoginPage from "./pages/LoginPage/LoginPage";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { checkToken } from "../apiUtils/apiCalls";


function AdminMainPage() {
const [authVerified, setAuthVerified] = useState(false);
let [items,setItems] = useState([
  { label: "About Us", component: LoginPage,navigation:"/aboutUs" },
  { label: "Contact Us", component: LoginPage,navigation:"/contactUs" }
]);


useEffect(() => {
  const token = localStorage.getItem('token');
  console.log("Token from localStorage:", token);
  if(token!=null) {
  checkToken(token).then((response)=>{
    console.log("Response from checkToken:", response);
    if(response.success === false){
      localStorage.removeItem('token');
      setItems ([  
        { label: "Login", component: LoginPage,navigation:"/login" },
        { label: "Sign Up", component: LoginPage,navigation:"/signUp"},
        ...items]);
    } 
    console.log("Items after checkToken:", items);
    setAuthVerified(true);
  }
  );
  } else {
    setItems( [  
      { label: "Login", component: LoginPage,navigation:"/login" },
      { label: "Sign Up", component: LoginPage,navigation:"/signUp"},
      ...items]);
      setAuthVerified(true);
  }
    
 } , []);

const changePageHandler=()=>{

}

return (
  authVerified ? (
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
  ) : <div>Loading</div>
);
}

export default AdminMainPage;