import styles from "./SolveProblem.module.css";
import { useEffect, useRef, useState } from "react";
import {
  compileCodeApi,
  fetchDefaultCodeApi,
  fetchQuestionApi,
  getMainCodeVariables,
  submitCodeApi,
} from "../../../apiUtils/apiCalls";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import Editor from "@monaco-editor/react";
import { AutoComplete } from "../../../components/AutoComplete/AutoComplete";
import ResultModal from "../../../components/ResultModal/ResultModal";
import { useNavigate, useParams } from "react-router-dom";
import starImage from "../../../resources/star.svg";
import testCaseComplianceChecker from "../../../utils/testCaseComplainceChecker";
import StaticNavBar from "../../../components/StaticNavBar/StaticNavBar";

const allLanguages = ["c++", "java", "python"];

function SolveProblemPage() {
  const [response, setResponse] = useState(null);
  const [language, setLanguage] = useState("java");
  const [code, setCode] = useState("");
  const [submitCodeResponse, setSubmitCodeResponse] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [defaultCode, setDefaultCode] = useState("");
  const [qNo, setQNo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  let { index } = useParams();
  const navigate = useNavigate();
  const [showTestCaseSubmitter, setShowTestCaseSubmitter] = useState(false);
  const [heightOfEditor, setHeightOfEditor] = useState("calc(100vh - 120px)");
  const [heightOfTestCaseInput, setHeightOfTestCaseInput] = useState("10px");
  const [marginOfButtons, setMarginsOfButtons] = useState("10px");
  const [testCaseText, setTestCaseText] = useState("");
  const [mainCodeVariables, setMainCodeVariables] = useState(null);
  const [errorInTestCase, setErrorInTestCase] = useState("");
  const [selectedItem, setSelectedItem] = useState("Description");
  const [leftSectionWidth, setLeftSectionWidth] = useState(700);
  const leftSectionRef = useRef(null);

  function onChangeHandler(event) {
    setCode(event);
  }

  function onTestCaseTextAreaChangeHandler(event) {
    setTestCaseText(event.target.value);
  }

  function onLanguageChangehandler(event) {
    setLanguage(event);
  }

  function onRunCode() {
    if (!testCaseText.trim()) {
      setErrorInTestCase("Please enter test case input");
      setIsModalOpen(true);
      return;
    }

    let testcase = [];
    let errorFound = false;

    setErrorInTestCase("");
    setSubmitCodeResponse(null);
    setIsRunning(true);

    const splittedTestCaseText = testCaseText
      .split("\n")
      .filter((line) => line.trim() !== "");

    // Check if the number of lines matches expected variables
    if (mainCodeVariables && splittedTestCaseText.length !== mainCodeVariables.variables.length) {
      setErrorInTestCase("Invalid testcase, check the number of inputs");
      errorFound = true;
      setIsModalOpen(true);
      setIsRunning(false);
      return;
    }

    // Check each test case line for compliance
    if (mainCodeVariables) {
      for (let i = 0; i < mainCodeVariables.variables.length; i++) {
        const testCaseComplianceError = testCaseComplianceChecker(
          mainCodeVariables.variables[i].type,
          splittedTestCaseText[i]
        );

        if (testCaseComplianceError.length > 0) {
          setErrorInTestCase(testCaseComplianceError);
          errorFound = true;
          break;
        }
      }
    }

    testcase.push({
      qid: qNo,
      testCase: splittedTestCaseText,
    });

    if (errorFound) {
      setIsModalOpen(true);
      setIsRunning(false);
      return;
    }

    // Call API and handle response or errors
    compileCodeApi(language, code, false, testcase, qNo)
      .then((data) => {
        setSubmitCodeResponse(data);
        setIsModalOpen(true);
      })
      .catch((err) => {
        setErrorInTestCase(
          "Error while compiling code: " + (err.message || "Unknown error")
        );
        setIsModalOpen(true);
      })
      .finally(() => {
        setIsRunning(false);
      });
  }

  const startResize = (e) => {
    let isResizing = true;
    const initialMouseX = e.clientX;
    const initialWidth = leftSectionWidth;

    const onMouseMove = (moveEvent) => {
      if (isResizing) {
        const newWidth = initialWidth + (moveEvent.clientX - initialMouseX);
        setLeftSectionWidth(Math.max(300, Math.min(800, newWidth))); // Min 300px, Max 800px
      }
    };

    const onMouseUp = () => {
      isResizing = false;
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  useEffect(() => {
    const questionIndex = isNaN(index) ? 1 : parseInt(index, 10);
    setQNo(questionIndex);
    setLoading(true);
    setError(null);

    fetchQuestionApi(questionIndex)
      .then((data) => {
        if (data && data.success && data.data) {
          setResponse(data.data);
        } else {
          setError("Failed to load question data");
        }
      })
      .catch((err) => {
        setError("Error occurred while fetching question");
      });
  }, [index]);

  function onAiSectionClickHandler() {
    navigate("/chat");
  }

  function toggleShowTestCaseSubmitter() {
    setShowTestCaseSubmitter(!showTestCaseSubmitter);
    if (!showTestCaseSubmitter) {
      setHeightOfEditor("calc(100vh - 320px)");
    } else {
      setHeightOfEditor("calc(100vh - 120px)");
    }
  }

  useEffect(() => {
    if (qNo && language) {
      getMainCodeVariables(qNo, language)
        .then((data) => {
          if (data) {
            setMainCodeVariables(data);
          }
        })
        .catch((err) => {
          setError("Error while getting code variables");
        });
    }
  }, [qNo, language]);

  useEffect(() => {
    const questionIndex = isNaN(index) ? 1 : parseInt(index, 10);
    setLoading(true);

    fetchDefaultCodeApi(questionIndex)
      .then((data) => {
        if (data && data.data && data.data.defaultCode) {
          setDefaultCode(data.data.defaultCode);
          setCode(data.data.defaultCode);
        } else {
          setCode("// Write your code here");
        }
      })
      .catch((err) => {
        setError("Error occurred while fetching default code");
        setCode("// Write your code here");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [index]);

  function onCodeSubmitHandler() {
    setSubmitCodeResponse(null);
    setIsSubmitting(true);

    submitCodeApi(language, code, true, null, qNo)
      .then((data) => {
        setSubmitCodeResponse(data);
        setIsModalOpen(true);
      })
      .catch((err) => {
        setError("Error while submitting code: " + (err.message || "Unknown error"));
        setIsModalOpen(true);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  const onNavClickHandler = (item) => {
    navigate(item.link);
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Loading problem...</p>
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
    <div className={styles.mainContainer}>
      <div className={styles.leftSection} ref={leftSectionRef} style={{ width: `${leftSectionWidth}px` }}>
        <div className={styles.questionContainer}>
          <div className={styles.questionHeader}>
            <div className={styles.questionTitle}>
              {response?.questionBody?.questionHeading || "Question"}
            </div>
            <div className={styles.questionDifficulty}>
              {response?.questionBody?.difficulty || "Easy"}
            </div>
          </div>
          <div className={styles.questionContent}>
            <div className={styles.questionDescription}>
              {response?.questionBody?.description || "No description available"}
            </div>
            {response?.questionConstraints && response.questionConstraints.length > 0 && (
              <div className={styles.constraintsSection}>
                <h4>Constraints:</h4>
                <ul>
                  {response.questionConstraints.map((constraint, index) => (
                    <li key={index}>{constraint.constraintDescription}</li>
                  ))}
                </ul>
              </div>
            )}
            {response?.questionExamples && response.questionExamples.length > 0 && (
              <div className={styles.examplesSection}>
                <h4>Examples:</h4>
                {response.questionExamples.map((example, index) => (
                  <div key={index} className={styles.example}>
                    <h5>{example.exampleName}</h5>
                    <p><strong>Input:</strong> {example.exampleInput}</p>
                    <p><strong>Output:</strong> {example.exampleOutput}</p>
                    {example.explanation && (
                      <p><strong>Explanation:</strong> {example.explanation}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={styles.resizeHandle} onMouseDown={startResize}></div>

      <div className={styles.rightSection}>
        <div className={styles.editorContainer}>
          <div className={styles.editorHeader}>
            <div className={styles.languageSelector}>
              <AutoComplete
                values={allLanguages}
                defaultValue={language}
                onOptionChangeHandler={onLanguageChangehandler}
              />
            </div>
          </div>

          {<Editor
            defaultLanguage="java"
            width="100%"
            height={heightOfEditor}
            top ={"-20px"}
            defaultValue={response?.defaultCode || "// Write your code here"}
            onChange={onChangeHandler}
            theme="vs-dark"
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              lineNumbers: "on",
              roundedSelection: false,
              scrollBeyondLastLine: false,
              automaticLayout: true,
            }}
          />}

          {showTestCaseSubmitter && (
            <div className={styles.testCaseContainer}>
              <div className={styles.testCaseHeader}>
                <h4>Test Case Input</h4>
                <button 
                  className={styles.closeTestCaseButton}
                  onClick={toggleShowTestCaseSubmitter}
                >
                  ×
                </button>
              </div>
              <textarea
                className={styles.testCaseInput}
                placeholder="Enter test case input (one value per line)"
                value={testCaseText}
                onChange={onTestCaseTextAreaChangeHandler}
                style={{ height: heightOfTestCaseInput }}
              />
              <div className={styles.testCaseActions}>
                <button
                  className={`${styles.actionButton} ${isRunning ? styles.disabled : ''}`}
                  onClick={!isRunning ? onRunCode : undefined}
                  disabled={isRunning}
                >
                  {isRunning ? 'Running...' : 'Run Code'}
                </button>
                <button
                  className={`${styles.actionButton} ${isSubmitting ? styles.disabled : ''}`}
                  onClick={!isSubmitting ? onCodeSubmitHandler : undefined}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </div>
          )}

          {!showTestCaseSubmitter && (
            <div className={styles.testCaseToggle}>
              <button onClick={toggleShowTestCaseSubmitter}>
                Custom Run/Submit
              </button>
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <ResultModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          result={submitCodeResponse}
          error={errorInTestCase}
        />
      )}
    </div>
  );
}

export default SolveProblemPage;
