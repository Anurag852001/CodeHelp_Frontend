import styles from './QuestionEditPage.module.css';
import LeftArrow from './../../../resources/LeftArrow.png'
import InputText from '../../../components/InputText/InputText';
import questionInputStyles from './inputStyles/QuestionHeading.module.css'


function QuestionEditPage({ unmountAllHandler }) {
    return <div className={styles.mainContainer}>
       <div className={styles.headerContainer}><img src ={LeftArrow} className={styles.leftArrow} onClick={unmountAllHandler}></img></div>
       <div className={styles.questionForm}>
        <InputText customStyles={questionInputStyles} heading="Question Heading" placeholder="Enter here"></InputText>
        <InputText customStyles={questionInputStyles} heading="Description" placeholder="Enter here"></InputText>
       </div>
         </div>
}
export default QuestionEditPage;