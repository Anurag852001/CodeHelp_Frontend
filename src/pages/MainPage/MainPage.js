import { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import SolveProblemPage from "../SolveProblemPage/SolveProblemPage";
import WelcomePage from "../WelocmePage/WelcomePage";
import ProblemSet from "../ProblemSetPage/ProblemSet";
import styles from "./MainPage.module.css"; // Import the CSS module

function MainPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  // Close sidebar when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Router>
      <div className={styles.mainContainer}>
        <NavigationBar
          items={[{ label: "Problems", link: "/problems" }]}
          onToggleSidebar={toggleSidebar}
        />
        <div className={styles.content}>
          <Routes>
            <Route path="/welcome" element={<WelcomePage />} />
            <Route path="/solve/:index" element={<SolveProblemPage />} />
          </Routes>
        </div>
        {isSidebarOpen && (
          <div
            ref={sidebarRef}
            className={`${styles.slidePanel} ${
              isSidebarOpen ? styles.open : styles.closed
            }`}
          >
            <ProblemSet />
          </div>
        )}
      </div>
    </Router>
  );
}

export default MainPage;
