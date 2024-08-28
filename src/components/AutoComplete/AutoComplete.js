import React, { useState } from "react";
import styles from "./AutoComplete.module.css";

export function AutoComplete({ defaultValue, values, onLanguageChange }) {
  const [value, setValue] = useState(defaultValue);
  const [showOptions, setShowOptions] = useState(false);

  const onClickHandler = (selectedValue) => {
    setValue(selectedValue);
    onLanguageChange(selectedValue);
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
        value={value}
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
