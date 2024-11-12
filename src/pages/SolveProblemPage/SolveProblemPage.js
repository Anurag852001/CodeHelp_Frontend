import styles from "./SolveProblem.module.css";
import globalStyles from "../../GlobalStyles.module.css";
import { useEffect, useState } from "react";
import {
  fetchDefaultCodeApi,
  fetchQuestionApi,
  getMainCodeVariables,
  submitCodeApi,
} from "../../apiUtils/apiCalls";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import Editor from "@monaco-editor/react";
import { AutoComplete } from "../../components/AutoComplete/AutoComplete";
import ResultModal from "../../components/ResultModal/ResultModal";
import { useNavigate, useParams } from "react-router-dom";
import starImage from "../../resources/star.svg";
import testCaseComplianceChecker from "../../utils/testCaseComplainceChecker";

const allLanguages = ["c++", "java", "python"];

function SolveProblemPage() {
  const [response, setResponse] = useState(null);
  const [language, setLanguage] = useState("java");
  const [code, setCode] = useState("");
  const [submitCodeResponse, setSubmitCodeResponse] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [defaultCode, setDefaultCode] = useState("");
  const [qNo, setQNo] = useState(5);
  const [loading, setLoading] = useState(true);
  let { index } = useParams();
  const navigate = useNavigate();
  const [showTestCaseSubmitter, setShowTestCaseSubmitter] = useState(false);
  const [heightOfEditor, setHeightOfEditor] = useState("1000px");
  const [heightOfTestCaseInput, setHeightOfTestCaseInput] = useState("10px");
  const [marginOfButtons, setMarginsOfButtons] = useState("10px");
  const [testCaseText, setTestCaseText] = useState(null);
  const [mainCodeVariables, setMainCodeVariables] = useState(null);
  const [errorInTestCase, setErrorInTestCase] = useState("");
  // Extract the index from state

  function onChangeHandler(event) {
    setCode(event);
  }

  function onTestCaseTextAreaChangeHandler(event) {
    console.log(event.target.value);
    setTestCaseText(event.target.value);
  }

  function onLanguageChangehandler(event) {
    console.log(event);
  }

  function onRunCode() {
    let testcase = []; // Initialize as an empty array
    let errorFound = false;
    setErrorInTestCase(null);
    setSubmitCodeResponse(null);

    const splittedTestCaseText = testCaseText
      .split("\n")
      .filter((line) => line.trim() !== "");

    console.log(splittedTestCaseText.length);

    if (splittedTestCaseText.length != mainCodeVariables.variables.length) {
      setErrorInTestCase("Invalid testcase, check the number of inputs");
      errorFound = true;
      setIsModalOpen(true);
      return;
    }

    for (let i = 0; i < mainCodeVariables.variables.length; i++) {
      const testCaseComplianceError = testCaseComplianceChecker(
        mainCodeVariables.variables[i].type,
        splittedTestCaseText[i]
      );

      if (testCaseComplianceError.length > 0) {
        setErrorInTestCase(testCaseComplianceError);
        errorFound = true; // Fix: set the boolean value
      } else {
        // Append an object to the testcase array
        testcase.push({
          variableNumber: mainCodeVariables.variables[i].variableNumber,
          dataType: mainCodeVariables.variables[i].type,
          value: splittedTestCaseText[i],
        });
      }
    }

    if (errorFound === true) {
      setIsModalOpen(true);
      return;
    }

    console.log(testcase); // Will now show an array of objects

    submitCodeApi(language, code, false, testcase, qNo) // Pass the array instead of a string
      .then((data) => setSubmitCodeResponse(data))
      .catch((err) => {
        console.log("Error while calling compile code API: " + err);
      });

    setIsModalOpen(true);
  }

  useEffect(() => {
    if (isNaN(index)) {
      index = 5;
    }
    setQNo(parseInt(index, 10));
    setLoading(true); // Start loading
    fetchQuestionApi(qNo)
      .then((data) => setResponse(data.data))
      .catch((err) => {
        console.log("Error occurred while fetching question");
      });
  }, []);

  function onAiSectionClickHandler() {
    navigate("/chat");
  }

  function toggleShowTestCaseSubmitter() {
    setShowTestCaseSubmitter(!showTestCaseSubmitter);
    setHeightOfEditor(heightOfEditor === "1000px" ? "400px" : "1000px");
    setMarginsOfButtons(marginOfButtons === "10px" ? "140px" : "10px");
  }

  useEffect(() => {
    getMainCodeVariables(qNo, language)
      .then((data) => {
        setMainCodeVariables(data);
      })
      .catch((err) => {
        console.err("Error while geting main code variables");
      });
  }, []);

  useEffect(() => {
    if (isNaN(index)) {
      index = 5;
    }
    fetchDefaultCodeApi(parseInt(index, 10))
      .then((data) => {
        setDefaultCode(data.data.defaultCode);
        setCode(data.data.defaultCode); // Corrected to set the code
      })
      .finally(() => {
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error occurred while fetching default code");
      });
  }, [index]);

  function onCodeSubmitHandler() {
    setSubmitCodeResponse(null);
    submitCodeApi(language, code, true, null, qNo)
      .then((data) => setSubmitCodeResponse(data))
      .catch((err) => {
        console.log("Error while calling compile code API: " + err);
      });
    setIsModalOpen(true);
  }

  if (loading) {
    return <div>Loading...</div>; // Simple loading indicator
  }

  return (
    <div className={styles.container}>
      <div className={styles.leftSection}>
        <div className={styles.problemHeading}>
          {response != null ? response.questionBody.id : 1}
          {".  "}
          {response != null ? response.questionBody.questionHeading : "heading"}
          <div className={styles.difficulty}>
            {response && response.questionBody.difficulty}
          </div>
        </div>

        <div className={styles.feedBackSection}>
          <div className={styles.likes}>
            <ThumbUpIcon className={styles.thumb}></ThumbUpIcon>
            {response != null ? response.questionBody.likes : 0}
          </div>
          <div className={styles.dislikes}>
            <ThumbDownAltIcon className={styles.thumb}></ThumbDownAltIcon>
            {response != null ? response.questionBody.dislikes : 0}
          </div>
        </div>
        <div className={styles.description}>
          <div className={styles.descriptionHeading}>Description</div>
          {response != null ? response.questionBody.description : ""}
        </div>
        <div className={styles.examples}>
          {response != null &&
            response.questionExamples.map((example, index) => (
              <div key={index} className={styles.example}>
                <div className={styles.exampleHeading}>
                  {example.exampleName}
                </div>
                <div className={styles.exampleInput}>
                  Input:{example.exampleInput}{" "}
                </div>
                <div className={styles.exampleOutput}>
                  Output:{example.exampleOutput}{" "}
                </div>
                <div className={styles.exampleExplanation}>
                  Explanation:{example.explanation}{" "}
                </div>
              </div>
            ))}
        </div>
        <div className={styles.constraints}>
          <div className={styles.constraintHeading}>Constraints</div>
          {response != null &&
            response.questionConstraints.map((constraint, index) => (
              <div key={index}>
                <div className={styles.constraintDescription}>
                  {constraint.constraintDescription}
                </div>
              </div>
            ))}
        </div>
        <div className={styles.aiSection} onClick={onAiSectionClickHandler}>
          <div className={styles.aiButton}>
            Having Problem? Try our brand new AI features to understand the
            problem
          </div>
          <img
            src={starImage}
            alt="star image"
            className={styles.starImage}
          ></img>
        </div>
      </div>
      <div className={styles.rightSection}>
        <AutoComplete
          className={styles.autoCompleteStyle}
          defaultValue="java"
          onLanguageChange={onLanguageChangehandler}
          values={allLanguages}
        />
        <Editor
          className={styles.editor}
          height={heightOfEditor}
          onChange={onChangeHandler}
          defaultLanguage="java"
          defaultValue={defaultCode}
          theme="vs-dark"
        />
        <div className={styles.testCaseSubmitterWrapper}>
          {showTestCaseSubmitter && (
            <div
              className={styles.testCaseSubmitter}
              style={{ height: heightOfTestCaseInput }}
            >
              <textarea
                className={styles.testCaseInput}
                onChange={onTestCaseTextAreaChangeHandler}
              ></textarea>
            </div>
          )}
          <div
            className={styles.testCaseSubmitterAndTogglerButtons}
            style={{ marginTop: marginOfButtons }}
          >
            <button
              className={styles.toggleShowTestCaseSubmitter}
              onClick={toggleShowTestCaseSubmitter}
            >
              ^
            </button>
            {showTestCaseSubmitter && (
              <div className={styles.theTwoButtons}>
                <button className={styles.submitButton} onClick={onRunCode}>
                  Run{" "}
                </button>
                <button
                  className={styles.submitButton}
                  onClick={onCodeSubmitHandler}
                >
                  Submit{" "}
                </button>
              </div>
            )}
          </div>
        </div>
        <ResultModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          result={
            submitCodeResponse != null
              ? submitCodeResponse.data
              : errorInTestCase
          }
        />
      </div>
    </div>
  );
}

export default SolveProblemPage;
