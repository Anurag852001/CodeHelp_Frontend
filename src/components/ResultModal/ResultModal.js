// ResultModal.js
import React from "react";
import styles from "./ResultModal.module.css"; // Assume you have a separate CSS file for styling the modal.

function ResultModal({ isOpen, onClose, result }) {
  // Return null if the modal is not open
  console.log(result);
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          Close
        </button>
        <div className={styles.resultContent}>
          {/* Ensure the result text displays line breaks correctly */}
          <pre className={styles.resultText}>{result.result}</pre>
          <pre className={styles.resultText}>{result.expectedResult}</pre>
        </div>
      </div>
    </div>
  );
}

export default ResultModal;
