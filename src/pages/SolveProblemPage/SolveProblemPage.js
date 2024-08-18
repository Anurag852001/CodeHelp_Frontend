import styles from "./SolveProblem.module.css";
import globalStyles from "../../GlobalStyles.module.css";

function SolveProblemPage() {
  return (
    <div className={styles.container}>
      <div className={styles.leftSection}>
        <div className={styles.problemHeading}>Problem Heading</div>
        <div className={styles.description}>Description</div>
      </div>
      <div className={styles.rightSection}>
        <div className={styles.compiler}>Compiler</div>
      </div>
    </div>
  );
}

export default SolveProblemPage;
