import { useState } from 'react';
import styles from './PlusInput.module.css';

function PlusInput({ heading, subHeadingArray }) {
  const [inputs, setInputs] = useState([]);

  const handleAddClick = () => {
    // Initialize a new input group with empty strings
    const newInputGroup = subHeadingArray.map(() => '');
    setInputs([...inputs, newInputGroup]);
  };

  const handleInputChange = (groupIndex, fieldIndex, value) => {
    const updatedInputs = inputs.map((group, i) => {
      if (i === groupIndex) {
        const updatedGroup = [...group];
        updatedGroup[fieldIndex] = value;
        return updatedGroup;
      }
      return group;
    });
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
          {group.map((value, fieldIndex) => (
            <div key={fieldIndex} className={styles.inputWrapper}>
             
              <textarea
                className={styles.inputBox}
                
                onChange={(e) =>
                  handleInputChange(groupIndex, fieldIndex, e.target.value)
                }
                placeholder={`Enter ${subHeadingArray[fieldIndex]}`}
              />
            </div>
          ))}
         
        </div>
      ))}
    </div>
  );
}

export default PlusInput;
