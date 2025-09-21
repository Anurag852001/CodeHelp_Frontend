import styled from '@emotion/styled';
import defaultStyles from './InputText.module.css';

function InputText({ customStyles, heading, onChange, placeholder, value, error }) {
    let styles = customStyles || defaultStyles;
    return (
        <div className={styles.inputContainer}>
            <div className={styles.heading}>{heading}</div>
            <textarea 
                type="text" 
                placeholder={placeholder} 
                className={`${styles.inputText} ${error ? styles.error : ''}`}
                onChange={onChange}
                value={value}
            />
            {error && (
                <div className={styles.errorMessage}>{error}</div>
            )}
        </div>
    );
}

export default InputText