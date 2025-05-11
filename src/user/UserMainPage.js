import { useState, useEffect, useRef } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import NavigationBar from "../components/NavigationBar/";
import SolveProblemPage from "../user/pages/SolveProblemPage/SolveProblemPage";
import WelcomePage from "../user/pages/WelocmePage/WelcomePage";
import ProblemSet from "../user/pages/ProblemSetPage/ProblemSet";
import styles from "../user/MainPage.module.css";
import ChatPage from "../user/pages/ChatPage/ChatPage";
import ReportPage from "../user/pages/ReportPage/ReportPage"

function UserMainPage() {
  const items = [
    { label: "Problems", link: "/" },
    { label: "Welcome", link: "/welcome" },
    { label: "Reports", link: "/report" },
  ];

  const location = useLocation();
  
  return (
    <div>
      <NavigationBar items={items} />
      <div className={styles.mainContainer}>
        <div className={styles.content}>
          <Routes>
            <Route path="/welcome" element={<WelcomePage />} />
            <Route path="/solve/:index" element={<SolveProblemPage />} />
            <Route path="/" element={<ProblemSet />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/report" element={<ReportPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default UserMainPage;
