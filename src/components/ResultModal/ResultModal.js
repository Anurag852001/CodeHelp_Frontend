import React from "react";
import styles from "./ResultModal.module.css";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import TimerIcon from "@mui/icons-material/Timer";
import BugReportIcon from "@mui/icons-material/BugReport";

function ResultModal({ isOpen, onClose, result, error }) {
  // Return null if the modal is not open
  if (!isOpen) return null;

  // Handle error case
  if (error) {
    return (
      <div className={styles.modalOverlay}>
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <h2 className={styles.modalTitle}>Error</h2>
            <button className={styles.closeButton} onClick={onClose}>
              ✕
            </button>
          </div>
          <div className={styles.errorContent}>
            <BugReportIcon className={styles.errorIcon} />
            <p className={styles.errorMessage}>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  // Handle result case
  if (!result || typeof result.data === 'string' || result.success === false) {

    return (
      <div className={styles.modalOverlay}>
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <h2 className={styles.modalTitle}>Result</h2>
            <button className={styles.closeButton} onClick={onClose}>&times;</button>
          </div>
          <div className={styles.resultContent}>
            {/* Show error prop if present */}
            {error && (
              <div className={styles.errorMessage} style={{marginBottom: '1rem'}}>
                {error}
              </div>
            )}
            {/* Show API error if present in result */}
            {result && result.success === false && (
              <div className={styles.errorMessage} style={{marginBottom: '1rem'}}>
                {result.data}
              </div>
            )}
            {/* Show result.error if present */}
            {result  && (
              <div className={styles.errorMessage} style={{marginBottom: '1rem'}}>
                {result.error}
              </div>
            )}
            {/* Only show 'No result data available' if there is no error */}
            {!error && !(result && result.success === false && typeof result.data === 'string') && !(result && typeof result.error === 'string') && (
              <p>No result data available</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  const { testCasesPassed, totalTestCases, failed, timeTake, expectedLastTestCaseResultBeforeFailure } = result.data;
  const success = !failed;
  const passRate = totalTestCases > 0 ? Math.round((testCasesPassed / totalTestCases) * 100) : 0;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Test Results</h2>
          <button className={styles.closeButton} onClick={onClose}>
            ✕
          </button>
        </div>
        
        <div className={styles.resultContent}>
          {/* Status Section */}
          <div className={styles.statusSection}>
            {success ? (
              <div className={styles.successStatus}>
                <CheckCircleIcon className={styles.successIcon} />
                <span>All Test Cases Passed!</span>
              </div>
            ) : (
              <div className={styles.failureStatus}>
                <CancelIcon className={styles.failureIcon} />
                <span>Test Cases Failed</span>
              </div>
            )}
          </div>

          {/* Test Results Grid */}
          <div className={styles.resultsGrid}>
            <div className={styles.resultCard}>
              <div className={styles.resultLabel}>Test Cases Passed</div>
              <div className={styles.resultValue}>
                {testCasesPassed} / {totalTestCases}
              </div>
              <div className={styles.resultPercentage}>
                {passRate}%
              </div>
            </div>

            <div className={styles.resultCard}>
              <div className={styles.resultLabel}>Time Taken</div>
              <div className={styles.resultValue}>
                <TimerIcon className={styles.timerIcon} />
                {timeTake}ms
              </div>
            </div>
          </div>

          {/* Expected Result (if failed) */}
          {!success && expectedLastTestCaseResultBeforeFailure && (
            <div className={styles.expectedResultSection}>
              <h4>Expected Result for Last Test Case:</h4>
              <div className={styles.expectedResult}>
                {expectedLastTestCaseResultBeforeFailure}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className={styles.actionButtons}>
            <button className={styles.primaryButton} onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultModal;
