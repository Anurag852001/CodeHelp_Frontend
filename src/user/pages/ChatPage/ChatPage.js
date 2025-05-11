import { useState } from "react";
import styles from "./ChatPage.module.css";
import { useEffect } from "react";
import { chatApi } from "../../../apiUtils/apiCalls";

function ChatPage() {
  const [response, setResponse] = useState("");
  const [question, setQuestion] = useState("");

  function onSubmitHandler() {
    chatApi(question)
      .then((r) => setResponse(r.response.response))
      .catch((err) => {
        console.error("Error occured while calling chat api");
      });
  }

  function onInputChangeHandler(event) {
    setQuestion(event.target.value);
  }

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.inputWrapper}>
        <input
          className={styles.inputStyle}
          placeholder="Type to ask"
          onChange={onInputChangeHandler}
        ></input>
        <button className={styles.submitButtonStyle} onClick={onSubmitHandler}>
          submit
        </button>
      </div>
      <div className={styles.responses}>"Hi There"</div>
    </div>
  );
}

export default ChatPage;
