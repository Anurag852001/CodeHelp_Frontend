import { useEffect, useState } from "react";
import { fetchGenericListApi } from "../../../apiUtils/apiCalls";
import styles from "./ProblemSet.module.css";
import { useNavigate } from "react-router-dom";
import StaticNavBar from "../../../components/StaticNavBar/StaticNavBar";

function ProblemSet() {
  const [problemSet, setProblemSet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        setLoading(true);
        const data = await fetchGenericListApi(page, count, "QUESTION_LISTING");
        setProblemSet(data.data);
      } catch (error) {
        console.error("Error fetching problems:", error);
        setProblemSet(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProblems();
  }, [page, count]);

  function onProblemClickHandler(problemId) {
    console.log("Navigating to problem:", problemId);
    navigate(`/solve/${problemId}`);
  }

  function getDifficultyClass(difficulty) {
    if (!difficulty) return "";
    return difficulty.toLowerCase();
  }

  function renderLoadingState() {
    return (
      <div className={styles.loadingContainer}>
        <div>Loading problems...</div>
      </div>
    );
  }

  function renderEmptyState() {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyStateTitle}>No Problems Found</div>
        <div className={styles.emptyStateText}>
          There are no problems available at the moment. Please try again later.
        </div>
      </div>
    );
  }

  function renderProblemList() {
    if (!problemSet?.listing || problemSet.listing.length === 0) {
      return renderEmptyState();
    }

    return (
      <ol className={styles.problemList}>
        {problemSet.listing.map((item, index) => (
          <li
            key={item.id}
            className={styles.problemItem}
            onClick={() => onProblemClickHandler(item.id)}
          >
            <span className={styles.qNo}>{item.id}</span>
            <span className={styles.problemItemHeading}>
              {item.questionHeading}
            </span>
            <span 
              className={styles.problemItemDifficulty}
              data-difficulty={getDifficultyClass(item.difficulty)}
            >
              {item.difficulty}
            </span>
          </li>
        ))}
      </ol>
    );
  }

  // Create dynamic navbar styles object
  const dynamicNavStyles = {
    navbar: styles.navbar,
    navItem: styles.navItem,
    navItemSelected: styles.navItemSelected
  };

  return (
    <div className={styles.mainContainer}>
      <StaticNavBar 
        items={[
          {"label": "Data Structures & Algorithms"},
          {"label": "System Design"}
        ]}
        dynamicNavStyles={dynamicNavStyles}
      />
      
      <div className={styles.problemSetContainer}>
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>Problem Set</h1>
          <p className={styles.pageSubtitle}>
            Practice coding problems to improve your skills
          </p>
        </div>
        
        {loading ? renderLoadingState() : renderProblemList()}
      </div>
    </div>
  );
}

export default ProblemSet;
