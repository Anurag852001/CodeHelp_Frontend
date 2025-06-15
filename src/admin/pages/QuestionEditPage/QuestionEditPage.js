import styles from './QuestionEditPage.module.css';
import LeftArrow from './../../../resources/LeftArrow.png'
import InputText from '../../../components/InputText/InputText';
import questionInputStyles from './inputStyles/QuestionHeading.module.css'
import { Editor } from '@monaco-editor/react';


function QuestionEditPage({ unmountAllHandler }) {
    return <div className={styles.mainContainer}>
       <div className={styles.headerContainer}><img src ={LeftArrow} className={styles.leftArrow} onClick={unmountAllHandler}></img></div>
       <div className={styles.contentContainer}>
       <div className={styles.questionForm}>
        <InputText customStyles={questionInputStyles} heading="Question Heading" placeholder="Enter here"></InputText>
        <InputText customStyles={questionInputStyles} heading="Description" placeholder="Enter here"></InputText>
        <InputText customStyles={questionInputStyles} heading="Constraints" placeholder="Enter here"></InputText>
       </div>
       <div>
       <div className={styles.editorHeading}>Code</div>
       <Editor
          defaultLanguage="java"
          width={500}
          height={500}
          defaultValue="// Write your code here"
          className={styles.monacoEditor}
          theme="vs-dark"
        />
        </div>
       </div>
         </div>
}
export default QuestionEditPage;