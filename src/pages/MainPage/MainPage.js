import { useState, useEffect, useRef } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import SolveProblemPage from "../SolveProblemPage/SolveProblemPage";
import WelcomePage from "../WelocmePage/WelcomePage";
import ProblemSet from "../ProblemSetPage/ProblemSet";
import styles from "./MainPage.module.css"; // Import the CSS module

function MainPage() {
  const items = [
    { label: "Problems", link: "/" },
    { label: "Welcome", link: "/welcome" },
  ];

  const location = useLocation();
  const shouldShowNavBar = !(
    location.pathname.startsWith("/solve") ||
    location.pathname.startsWith("/welcome")
  );

  return (
    <div>
      <div className={styles.mainContainer}>
        {shouldShowNavBar && <NavigationBar items={items} />}
        <div className={styles.content}>
          <Routes>
            <Route path="/welcome" element={<WelcomePage />} />
            <Route path="/solve/:index" element={<SolveProblemPage />} />
            <Route path="/" element={<ProblemSet />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
