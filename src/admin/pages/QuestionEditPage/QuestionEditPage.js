import styles from './QuestionEditPage.module.css';
import LeftArrow from './../../../resources/LeftArrow.png'
import InputText from '../../../components/InputText/InputText';
import questionInputStyles from './inputStyles/QuestionHeading.module.css'
import questionInputStyles3 from './inputStyles/QuestionHeading3.module.css'
import questionInputStyles2 from './inputStyles/QuestionHeading2.module.css'
import { Editor } from '@monaco-editor/react';
import { AutoComplete } from '../../../components/AutoComplete/AutoComplete';
import PlusInput from '../../../components/PlusInput/PlusInput';
import customAutoCompleteStyles from "./inputStyles/AutoCompleteCustom.module.css"
import InputPlusAutoComplete from '../../../components/InputPlusAutoComplete/InputPlusAutoComplete';
import { useState } from 'react';



function QuestionEditPage({ unmountAllHandler,questionHeading }) {
      const [constraints, setConstraints] = useState([]); 
      const [examples, setExamples] = useState([]); 
      const [language, setLanguage] = useState("JAVA");
      const [newQuestionHeading, setNewQuestionHeading] = useState("");
      const [description, setDescription] = useState("");
      const [functionName, setFunctionName] = useState("");
      const [variables, setVariables] = useState([]);
      const [code,setCode] = useState("// Write your code here");

   const onQuestionHeadingChangeHandler = (event) => {
         setNewQuestionHeading(event.target.value);
   }

   const onDescriptionChangeHandler = (event) => {
         setDescription(event.target.value);
   }

   const onFunctionNameChangeHandler = (event) => {
         setFunctionName(event.target.value);
   }

   const onLanguageChangeHandler =(value)=>{
      setLanguage(value);
   }  

   const onSubmitHandler = () => {
         const questionObject = {
            questionBody:{
               questionHeading: newQuestionHeading,
               likes:0,
               dislikes:0,
               difficulty:"EASY",
               description: description,
            },
            questionConstraints: constraints,
            questionExamples: examples,
            functionName: functionName,
            variables:variables,
            correctCode: code,
            language:language
   }
   console.log("Question Object to be submitted:", questionObject);
}

    return <div className={styles.mainContainer}>
       <div className={styles.headerContainer}><img src ={LeftArrow} className={styles.leftArrow} onClick={unmountAllHandler}></img> 
       <h3>{questionHeading != undefined ? questionHeading:"Add Question"}</h3>
        <div className={styles.submitButton} onClick={onSubmitHandler}> Submit</div>
       </div>
       <div className={styles.contentContainer}>
       <div className={styles.questionForm}>
        <InputText customStyles={questionInputStyles3} heading="Question Heading" placeholder="Enter here" onChange={onQuestionHeadingChangeHandler}></InputText>
        <InputText customStyles={questionInputStyles} heading="Description" placeholder="Enter here" onChange={onDescriptionChangeHandler}></InputText>
        <PlusInput customStyles={questionInputStyles} heading="Constraints" placeholder="Enter here" subHeadingArray={["constraintDescription"]} inputs={constraints} setInputs={setConstraints}></PlusInput>
        <PlusInput customStyles={questionInputStyles} heading="Examples" placeholder="Enter here" subHeadingArray={["exampleName","exampleInput","exampleOutput","explanation"]} inputs={examples} setInputs={setExamples}></PlusInput>
        <InputText customStyles={questionInputStyles2} heading="Function Name" placeholder="Enter here" onChange ={onFunctionNameChangeHandler}></InputText>
        <InputPlusAutoComplete 
               values ={["INTEGER_ARRAY","INTEGER","STRING"]} 
               defaultAutoCompleteValue="INTEGER" 
               inputKey="name"
               autoCompleteKey="type"
               customStyles={customAutoCompleteStyles}
               inputPlaceHolder={"Enter variable name"}
               inputs={variables}
               setInputs={setVariables}
               indexKey="variableNumber"
        ></InputPlusAutoComplete>
       </div>
       <div className={styles.editorContainer}>
       <div className={styles.editorHeading}>
        <div className={styles.editorHeadingText}>Correct Code</div>
        <AutoComplete values ={["JAVA","C++","PYTHON"]} defaultValue="JAVA" onOptionChangeHandler={onLanguageChangeHandler} ></AutoComplete>
       </div>
       
       <Editor
          defaultLanguage="java"
          width={500}
          height={390}
          defaultValue={code}
          onChange={(code)=>{ setCode(code)}}
          theme="vs-dark"
        />

        </div>
       </div>
       <div className={styles.submitButtonDiv}>
       
        </div>
         </div>
}
export default QuestionEditPage;