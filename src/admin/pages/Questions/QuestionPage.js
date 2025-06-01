import PlusIcon from "./../../../resources/PlusIcon.png"
import SearchBar from "../../../components/SearchBar/SearchBar";
import styles from "./QuestionsPage.module.css";
function QuestionsPage(){
    return <div className={styles.mainContainer}>
        <SearchBar></SearchBar>
         <img src={PlusIcon} className={styles.plusIcon}></img>
    </div>
}
export default QuestionsPage;