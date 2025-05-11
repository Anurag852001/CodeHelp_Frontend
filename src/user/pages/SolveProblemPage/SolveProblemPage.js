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
  const [selectedItem,setSelectedItem] = useState("Description");
   const [leftSectionWidth, setLeftSectionWidth] = useState(700); // Default width for left section
  const leftSectionRef = useRef(null) // Ref to the left section
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
    let testcase = [];
    let errorFound = false;

    setErrorInTestCase(null);
    setSubmitCodeResponse(null);

    const splittedTestCaseText = testCaseText
      .split("\n")
      .filter((line) => line.trim() !== "");

    // Check if the number of lines matches expected variables
    if (splittedTestCaseText.length !== mainCodeVariables.variables.length) {
      setErrorInTestCase("Invalid testcase, check the number of inputs");
      errorFound = true;
      setIsModalOpen(true);
      return;
    }

    // Check each test case line for compliance
    for (let i = 0; i < mainCodeVariables.variables.length; i++) {
      const testCaseComplianceError = testCaseComplianceChecker(
        mainCodeVariables.variables[i].type,
        splittedTestCaseText[i]
      );

      if (testCaseComplianceError.length > 0) {
        setErrorInTestCase(testCaseComplianceError);
        errorFound = true;
        break; // Stop further checks if there’s an error
      } 
    }
    testcase.push({
      qid:qNo,
      testCase:splittedTestCaseText,
    })

    if (errorFound) {
      setIsModalOpen(true);
      return;
    }
    console.log(testcase);
    // Call API and handle response or errors
    compileCodeApi(language, code, false, testcase, qNo)
      .then((data) => {
        setSubmitCodeResponse(data);
        setIsModalOpen(true);
      })
      .catch((err) => {
        console.error("Error while calling compile code API:", err);
        setErrorInTestCase(
          "Error while calling compile code API: " + err.message
        );
        setIsModalOpen(true); // Open modal to show the error
      });
  }

const startResize = (e) => {
  console.log("startResize");
    let isResizing = true;
    const initialMouseX = e.clientX;
    const initialWidth = leftSectionWidth;

    const onMouseMove = (moveEvent) => {
      if (isResizing) {
        const newWidth = initialWidth + (moveEvent.clientX - initialMouseX);
        leftSectionRef = newWidth;
      }
    };

    const onMouseUp = () => {
      console.log("onMouseUp");
      isResizing = false;
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };


  useEffect(() => {
    if (isNaN(index)) {
      index = 1;
    }
    console.log("index", index);
    setQNo(parseInt(index, 10));
    setLoading(true); // Start loading
    fetchQuestionApi(index)
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
      index = 1;
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
  

  const onNavClickHandler = (item) => {
    setSelectedItem(item);
  }
  return (
    <div className={styles.container}>
      <div className={styles.leftSection} style={{width:leftSectionWidth}} ref={leftSectionRef} >
  
        
      <StaticNavBar items ={["Description","Solutions","Submissions"]} selectedItem={selectedItem} onLinkClick={onNavClickHandler}>NavigationBar</StaticNavBar>
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
        <div
        className={styles.stretcher}
        onMouseDown={startResize}
      ></div>
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
