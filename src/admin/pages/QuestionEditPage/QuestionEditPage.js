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
import { useState, useEffect } from 'react';

function QuestionEditPage({ unmountAllHandler, questionHeading }) {
      const [constraints, setConstraints] = useState([]); 
      const [examples, setExamples] = useState([]); 
      const [language, setLanguage] = useState("JAVA");
      const [newQuestionHeading, setNewQuestionHeading] = useState("");
      const [description, setDescription] = useState("");
      const [functionName, setFunctionName] = useState("");
      const [variables, setVariables] = useState([]);
      const [code, setCode] = useState("// Write your code here");
      const [isSubmitting, setIsSubmitting] = useState(false);
      const [validationErrors, setValidationErrors] = useState({});

   // Initialize form with questionHeading if provided
   useEffect(() => {
      if (questionHeading) {
         setNewQuestionHeading(questionHeading);
      }
   }, [questionHeading]);

   const validateForm = () => {
      const errors = {};
      
      if (!newQuestionHeading.trim()) {
         errors.questionHeading = "Question heading is required";
      }
      
      if (!description.trim()) {
         errors.description = "Description is required";
      }
      
      if (!functionName.trim()) {
         errors.functionName = "Function name is required";
      }
      
      if (variables.length === 0) {
         errors.variables = "At least one variable is required";
      }
      
      if (!code.trim() || code === "// Write your code here") {
         errors.code = "Code is required";
      }
      
      setValidationErrors(errors);
      return Object.keys(errors).length === 0;
   };

   const onQuestionHeadingChangeHandler = (event) => {
         setNewQuestionHeading(event.target.value);
         if (validationErrors.questionHeading) {
            setValidationErrors(prev => ({ ...prev, questionHeading: "" }));
         }
   }

   const onDescriptionChangeHandler = (event) => {
         setDescription(event.target.value);
         if (validationErrors.description) {
            setValidationErrors(prev => ({ ...prev, description: "" }));
         }
   }

   const onFunctionNameChangeHandler = (event) => {
         setFunctionName(event.target.value);
         if (validationErrors.functionName) {
            setValidationErrors(prev => ({ ...prev, functionName: "" }));
         }
   }

   const onLanguageChangeHandler = (value) => {
      setLanguage(value);
   }  

   const onSubmitHandler = async () => {
      if (!validateForm()) {
         return;
      }
      
      setIsSubmitting(true);
      
      try {
         const questionObject = {
            questionBody: {
               questionHeading: newQuestionHeading,
               likes: 0,
               dislikes: 0,
               difficulty: "EASY",
               description: description,
            },
            questionConstraints: constraints,
            questionExamples: examples,
            functionName: functionName,
            variables: variables,
            correctCode: code,
            language: language
         };
         
         // TODO: Replace with actual API call
         console.log("Question Object to be submitted:", questionObject);
         
         // Simulate API call
         await new Promise(resolve => setTimeout(resolve, 1000));
         
         // Success handling
         alert("Question saved successfully!");
         if (unmountAllHandler) {
            unmountAllHandler();
         }
      } catch (error) {
         console.error("Error saving question:", error);
         alert("Error saving question. Please try again.");
      } finally {
         setIsSubmitting(false);
      }
   }

    return <div className={styles.mainContainer}>
       <div className={styles.headerContainer}>
          <img src={LeftArrow} className={styles.leftArrow} onClick={unmountAllHandler} alt="Back" />
          <h3>{questionHeading || "Add Question"}</h3>
          <div 
             className={`${styles.submitButton} ${isSubmitting ? styles.disabled : ''}`} 
             onClick={!isSubmitting ? onSubmitHandler : undefined}
          > 
             {isSubmitting ? 'Saving...' : 'Submit'}
          </div>
       </div>
       <div className={styles.contentContainer}>
       <div className={styles.questionForm}>
        <InputText 
           customStyles={questionInputStyles3} 
           heading="Question Heading" 
           placeholder="Enter here" 
           onChange={onQuestionHeadingChangeHandler}
           value={newQuestionHeading}
           error={validationErrors.questionHeading}
        />
        <InputText 
           customStyles={questionInputStyles} 
           heading="Description" 
           placeholder="Enter here" 
           onChange={onDescriptionChangeHandler}
           value={description}
           error={validationErrors.description}
        />
        <PlusInput 
           customStyles={questionInputStyles} 
           heading="Constraints" 
           placeholder="Enter here" 
           subHeadingArray={["constraintDescription"]} 
           inputs={constraints} 
           setInputs={setConstraints}
           error={validationErrors.constraints}
        />
        <PlusInput 
           customStyles={questionInputStyles} 
           heading="Examples" 
           placeholder="Enter here" 
           subHeadingArray={["exampleName","exampleInput","exampleOutput","explanation"]} 
           inputs={examples} 
           setInputs={setExamples}
           error={validationErrors.examples}
        />
        <InputText 
           customStyles={questionInputStyles2} 
           heading="Function Name" 
           placeholder="Enter here" 
           onChange={onFunctionNameChangeHandler}
           value={functionName}
           error={validationErrors.functionName}
        />
        <InputPlusAutoComplete 
               values={["INTEGER_ARRAY","INTEGER","STRING"]} 
               defaultAutoCompleteValue="INTEGER" 
               inputKey="name"
               autoCompleteKey="type"
               customStyles={customAutoCompleteStyles}
               inputPlaceHolder={"Enter variable name"}
               inputs={variables}
               setInputs={setVariables}
               indexKey="variableNumber"
        />
        {validationErrors.variables && (
           <div className={styles.errorMessage}>{validationErrors.variables}</div>
        )}
       </div>
       <div className={styles.editorContainer}>
       <div className={styles.editorHeading}>
        <div className={styles.editorHeadingText}>Correct Code</div>
        <AutoComplete values={["JAVA","C++","PYTHON"]} defaultValue="JAVA" onOptionChangeHandler={onLanguageChangeHandler} />
       </div>
       
       <Editor
          defaultLanguage="java"
          width={500}
          height={390}
          defaultValue={code}
          onChange={(code) => { 
             setCode(code);
             if (validationErrors.code) {
                setValidationErrors(prev => ({ ...prev, code: "" }));
             }
          }}
          theme="vs-dark"
        />
        {validationErrors.code && (
           <div className={styles.errorMessage}>{validationErrors.code}</div>
        )}
        </div>
       </div>
       <div className={styles.submitButtonDiv}>
       
        </div>
         </div>
}
export default QuestionEditPage;