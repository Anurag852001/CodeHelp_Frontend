import styles from './QuestionEditPage.module.css';
import LeftArrow from './../../../resources/LeftArrow.png'
import InputText from '../../../components/InputText/InputText';
import questionInputStyles from './inputStyles/QuestionHeading.module.css'
import questionInputStyles2 from './inputStyles/QuestionHeading2.module.css'
import { Editor } from '@monaco-editor/react';
import { AutoComplete } from '../../../components/AutoComplete/AutoComplete';
import PlusInput from '../../../components/PlusInput/PlusInput';


function QuestionEditPage({ unmountAllHandler,questionHeading }) {
    return <div className={styles.mainContainer}>
       <div className={styles.headerContainer}><img src ={LeftArrow} className={styles.leftArrow} onClick={unmountAllHandler}></img> 
       <h3>{questionHeading != undefined ? questionHeading:"Add Question"}</h3>
        <div className={styles.submitButton}> Submit</div>
       </div>
       <div className={styles.contentContainer}>
       <div className={styles.questionForm}>
        <InputText customStyles={questionInputStyles} heading="Question Heading" placeholder="Enter here"></InputText>
        <InputText customStyles={questionInputStyles} heading="Description" placeholder="Enter here"></InputText>
        <PlusInput customStyles={questionInputStyles} heading="Constraints" placeholder="Enter here"></PlusInput>
        <PlusInput customStyles={questionInputStyles} heading="Examples" placeholder="Enter here"></PlusInput>
        <InputText customStyles={questionInputStyles2} heading="Function Name" placeholder="Enter here"></InputText>
       </div>
       <div className={styles.editorContainer}>
       <div className={styles.editorHeading}>
        <div className={styles.editorHeadingText}>Correct Code</div>
        <AutoComplete values ={["JAVA","C++","PYTHON"]} defaultValue="JAVA"></AutoComplete>
       </div>
       
       <Editor
          defaultLanguage="java"
          width={500}
          height={390}
          defaultValue="// Write your code here"
          theme="vs-dark"
        />

        </div>
       </div>
       <div className={styles.submitButtonDiv}>
       
        </div>
         </div>
}
export default QuestionEditPage;