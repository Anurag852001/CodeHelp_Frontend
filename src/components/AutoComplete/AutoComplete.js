import React, { useState } from "react";
import defaultStyles from "./AutoComplete.module.css";

export function AutoComplete({ values,defaultValue, onOptionChangeHandler, customStyles }) {
  const[currentVal,setCurrentVal] = useState(defaultValue);
  const [showOptions, setShowOptions] = useState(false);
  const styles = customStyles || defaultStyles;
  
  const onClickHandler = (selectedValue) => {
    setCurrentVal(selectedValue);
    console.log(selectedValue)
    onOptionChangeHandler(selectedValue);
    setShowOptions(false);
  };

const onInputClickHandler = () => {
  setShowOptions(!showOptions);
  };

  return (
    <div className={styles.autoCompleteContainer}>
      <input
        className={styles.inputContainer}
        type="text"
        value={currentVal}
        onClick={onInputClickHandler}
        readOnly
      />
      {showOptions && (
        <ul className={styles.autoCompleteOptions}>
          {values.map((option, index) => (
            <li key={index} onClick={() => onClickHandler(option)}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
