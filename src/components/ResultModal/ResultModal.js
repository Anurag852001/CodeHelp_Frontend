import React from "react";
import styles from "./ResultModal.module.css";
import { ColorLens } from "@mui/icons-material";

function ResultModal({ isOpen, onClose, result }) {
  // Return null if the modal is not open
  if (!isOpen) return null;

  // Default content in case result or properties are missing
  const resultText = result?.result ?? "No result provided";
  const expectedResultText =
    result?.expectedResult ?? "No expected result provided";
  const success = result?.result ?? false;
  const correctAns = result?.success ?? false;
  const timeTaken = result?.timeTaken ?? 0;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          Close
        </button>
        <div className={styles.resultContent}>
          {!success && (
            <pre className={styles.resultText}>
              {JSON.stringify(result, null, 2)}
            </pre>
          )}
          {success && (
            <div styles={ColorLens}>{correctAns ? "Correct" : "Wrong"}</div>
          )}
          {success && (
            <pre className={styles.resultText}>
              result: {JSON.stringify(resultText, null, 2)}
            </pre>
          )}
          {success && (
            <pre className={styles.resultText}>
              expected result: {JSON.stringify(expectedResultText, null, 2)}
            </pre>
          )}
          {success && (
            <pre className={styles.resultText}>
              time took: {JSON.stringify(timeTaken, null, 2)}ms
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}

export default ResultModal;
