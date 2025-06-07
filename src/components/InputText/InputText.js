import styles from './InputText.module.css';

function InputText(){
    return (
        <div className={styles.inputContainer}>
            <div className={styles.heading}>This is heading of input</div>
            <input type="text" placeholder="Input here" className ={styles.inputText} />
        </div>
    );
}

export default InputText