import { useEffect, useState } from "react";
import { fetchGenericListApi } from "../../apiUtils/apiCalls";
import styles from "./ProblemSet.module.css"; // Import the CSS module
import { useNavigate } from "react-router-dom";

function ProblemSet() {
  const [problemSet, setProblemSet] = useState();
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(10);
  const navigate = useNavigate();
  useEffect(() => {
    fetchGenericListApi(page, count, "QUESTION_LISTING").then((data) =>
      setProblemSet(data.data)
    );
  }, [page, count]);

  function onProblemClickHandler(index) {
    console.log("INDEX" + parseInt(index, 10));
    navigate(`/solve/${index}`);
  }

  return (
    <div className={styles.problemSetContainer}>
      <ol className={styles.problemList}>
        {problemSet != null &&
          problemSet.listing.map((item, index) => (
            <li
              key={item.id}
              className={styles.problemItem}
              onClick={() => onProblemClickHandler(item.id)}
            >
              <span className={styles.qNo}>{item.id}</span>
              <span className={styles.problemItemHeading}>
                {item.questionHeading}
              </span>
              <span className={styles.problemItemDifficulty}>
                {item.difficulty}
              </span>
            </li>
          ))}
      </ol>
    </div>
  );
}

export default ProblemSet;
