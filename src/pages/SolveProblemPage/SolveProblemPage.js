import styles from "./SolveProblem.module.css";
import globalStyles from "../../GlobalStyles.module.css";
import { useEffect, useState } from "react";
import { fetchQuestionApi, submitCodeApi } from "../../apiUtils/apiCalls";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import { addZoomListeners, removeZoomListeners } from "../../utils/zoomControl";
import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react";
import { AutoComplete } from "../../components/AutoComplete/AutoComplete";
import ResultModal from "../../components/ResultModal/ResultModal";

const allLanguages = ["c++", "java", "python"];

function SolveProblemPage() {
  const [response, setResponse] = useState(null);
  const [language, setLanguage] = useState("java");
  const [code, setCode] = useState("");
  const [submitCodeResponse, setSubmitCodeResponse] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    addZoomListeners();
    return () => {
      removeZoomListeners();
    };
  }, []);

  function onChangeHandler(event) {
    setCode(event);
  }

  function onLanguageChangehandler(event) {
    console.log(event);
  }

  useEffect(() => {
    fetchQuestionApi()
      .then((data) => setResponse(data.data))
      .catch((err) => {
        console.log("Error occured while fetching question");
      });
  }, []);

  function onCodeSubmitHandler() {
    submitCodeApi(language, code)
      .then((data) => setSubmitCodeResponse(data))
      .catch((err) => {
        console.log("Error while calling compile code api" + err);
      });
    setIsModalOpen(true);
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
          height="90vh"
          onChange={onChangeHandler}
          defaultLanguage="java"
          defaultValue="// some comment"
          theme="vs-dark"
        />
        <button
          className={styles.SubmitButton}
          value="submit"
          onClick={onCodeSubmitHandler}
        >
          Submit
        </button>
        <ResultModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          result={submitCodeResponse != null && submitCodeResponse.data}
        />
      </div>
    </div>
  );
}

export default SolveProblemPage;
