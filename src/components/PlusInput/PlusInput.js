import { useState } from 'react';
import styles from './PlusInput.module.css';

function PlusInput({ heading, subHeadingArray, inputs, setInputs, error }) {
  

  const handleAddClick = () => {
    // Initialize a new input group with empty strings
      const newInputObject = subHeadingArray.reduce((acc, subHeading) => {
      acc[subHeading] = '';
      return acc;
    }, {});
    setInputs([...inputs, newInputObject]);
  };

  const handleInputChange = (groupIndex, key, value) => {
    const updatedInputs = inputs;
    updatedInputs[groupIndex][key] = value;
    setInputs(updatedInputs);
  };

  const handleRemove = (indexToRemove) => {
    const updatedInputs = inputs.filter((_, index) => index !== indexToRemove);
    setInputs(updatedInputs);
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.heading}>{heading}</div>
      <div className={styles.addButton} onClick={handleAddClick}>
        Add
      </div>

      {inputs.map((group, groupIndex) => (
        <div className={styles.inputContainer} key={groupIndex}>
           <div
            className={styles.removeButton}
            onClick={() => handleRemove(groupIndex)}
          >
            ✕
          </div>
          {Object.entries(group).map(([key, value]) => (
            <div key={key} className={styles.inputWrapper}>
             
              <textarea
                className={styles.inputBox}
                
                onChange={(e) =>
                  handleInputChange( groupIndex,key, e.target.value)
                }
                placeholder={`Enter ${key}`}
              />
            </div>
          ))}
         
        </div>
      ))}
      {error && (
        <div className={styles.errorMessage}>{error}</div>
      )}
    </div>
  );
}

export default PlusInput;
