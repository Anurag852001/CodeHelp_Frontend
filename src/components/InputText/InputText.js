import styled from '@emotion/styled';
import defaultStyles from './InputText.module.css';

function InputText({customStyles,heading, onChange,placeholder}) {
    let styles = customStyles || defaultStyles;
    return (
        <div className={styles.inputContainer}>
            <div className={styles.heading}>{heading}</div>
            <input type="text" placeholder={placeholder} className ={styles.inputText}  onChange={onChange}/>
        </div>
    );
}

export default InputText