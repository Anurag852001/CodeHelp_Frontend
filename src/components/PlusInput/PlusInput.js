import { useState } from 'react';
import styles from './PlusInput.module.css';

function PlusInput({ heading }) {
  const [inputs, setInputs] = useState([]);

  const handleAddClick = () => {
    setInputs([...inputs, '']);
  };

  const handleInputChange = (index, value) => {
    const updatedInputs = [...inputs];
    updatedInputs[index] = value;
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

      {inputs.map((inputValue, index) => (
        <div className={styles.inputWrapper} key={index}>
          <textarea
            className={styles.inputBox}
            type="text"
            value={inputValue}
            onChange={(e) => handleInputChange(index, e.target.value)}
            placeholder={`Input ${index + 1}`}
          />
          <span className={styles.removeButton} onClick={() => handleRemove(index)}>✕</span>
        </div>
      ))}
    </div>
  );
}

export default PlusInput;
