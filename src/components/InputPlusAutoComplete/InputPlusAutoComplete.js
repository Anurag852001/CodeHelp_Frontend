import { useState } from "react";
import { AutoComplete } from "../AutoComplete/AutoComplete";
import styles from "./InputPlusAutoComplete.module.css";


function InputPlusAutoComplete({ defaultAutoCompleteValue, values, inputKey,autoCompleteKey, customStyles,inputPlaceHolder }) {
    const[inputs,setInputs] = useState([]);

    const onAddClickHandler = () => {
      const newInputObject = {
        [inputKey]:'',
        [autoCompleteKey]:[defaultAutoCompleteValue]
      }
      console.log(inputs);
        setInputs([...inputs,newInputObject]);
    }
    
    const onRemoveClickHandler = (index) => {
        console.log("Remove clicked at index:", index);
        const newInputs = inputs.filter((_, i) => i !== index);
        setInputs(newInputs);
    }

    const onTextAreaChangeHandler = (value,index) =>{
      let updatedInputs = inputs;
      updatedInputs[index][inputKey] = value;
      setInputs(updatedInputs);
      console.log("updated inputs",inputs)
    }

    const autoCompleteValueChangeHandler =(value,index) =>{
    let updatedInputs = inputs;
      updatedInputs[index][autoCompleteKey] = value;
      setInputs(updatedInputs);
      console.log("Updated inputs ",inputs)
    }

  return (
    <div className={styles.mainContainer}>
        <div className={styles.headingContainer}>
        Variables</div>
        <div className={styles.addButton} onClick={onAddClickHandler}>Add</div>
    { inputs.map((value,index)=><div className={styles.inputMainWrapper} key={index}>
         <div onClick= {()=>onRemoveClickHandler(index)} className={styles.removeButton}>✕</div>
         <div className={styles.inputContainer} key={index}>
        
        <textarea className={styles.textArea} placeholder={inputPlaceHolder} onChange={(target)=>onTextAreaChangeHandler(target.target.value,index)}></textarea>
      <AutoComplete
        defaultValue={defaultAutoCompleteValue}
        onOptionChangeHandler={(value)=>{ autoCompleteValueChangeHandler(value,index)}}
        values={values}
        customStyles={customStyles}
      />
      
    </div></div>)}
    </div>
  );
}

export default InputPlusAutoComplete;