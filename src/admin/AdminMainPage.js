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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  let [items, setItems] = useState([
    { label: "About Us", component: LoginPage, navigation: "/aboutUs" },
    { label: "Contact Us", component: LoginPage, navigation: "/contactUs" }
  ]);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (token) {
          const response = await checkToken(token);
          
          if (response && response.success === false) {
            localStorage.removeItem('token');
            setItems([
              { label: "Login", component: LoginPage, navigation: "/login" },
              { label: "Sign Up", component: LoginPage, navigation: "/signUp" },
              ...items
            ]);
          }
        } else {
          setItems([
            { label: "Login", component: LoginPage, navigation: "/login" },
            { label: "Sign Up", component: LoginPage, navigation: "/signUp" },
            ...items
          ]);
        }
        
        setAuthVerified(true);
      } catch (err) {
        setError("Failed to verify authentication. Please try again.");
        setItems([
          { label: "Login", component: LoginPage, navigation: "/login" },
          { label: "Sign Up", component: LoginPage, navigation: "/signUp" },
          ...items
        ]);
        setAuthVerified(true);
      } finally {
        setIsLoading(false);
      }
    };

    verifyAuth();
  }, []);

  const changePageHandler = () => {
    // Navigation handler if needed
  };

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <h3>Error</h3>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
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
            <StaticNavBar 
              items={items} 
              className={styles.navBar} 
              dynamicNavStyles={navStyles} 
              onLinkClick={changePageHandler} 
            />
          </div>
        </div>
        <div className={styles.welcomeText}>
          <div className={styles.heading}>Decode Success with Code</div>
          <p className={styles.subHeading}>
            A platform for curious minds—practice, read, and prepare like never before.
          </p>
          <div className={styles.searchBar}>
            <input 
              type="text" 
              placeholder="Explore our website" 
              className={styles.inputBox}
            />
            <button className={styles.searchButton}>Search</button>
          </div>
        </div>
      </WelcomeBackGround>
    ) : null
  );
}

export default AdminMainPage;