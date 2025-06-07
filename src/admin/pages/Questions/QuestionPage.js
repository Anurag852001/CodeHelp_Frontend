import PlusIcon from "./../../../resources/PlusIcon.png"
import SearchBar from "../../../components/SearchBar/SearchBar";
import styles from "./QuestionsPage.module.css";

import InputText from "../../../components/InputText/InputText";
import ListViewer from "../../../components/ListViewer/ListViewer";
import FilterIcon from "./../../../resources/FilterIcon.png";

function QuestionsPage(){

    let items =[
        {id: 1, questionHeading: "Two Sum", difficulty: "Easy", createdOn: "2023-10-01"},
        {id: 2, questionHeading: "Add Two Numbers", difficulty: "Medium", createdOn: "2023-10-01"},
        {id: 3, questionHeading: "Longest Substring Without Repeating Characters", difficulty: "Medium", createdOn: "2023-10-01"},
        {id: 4, questionHeading: "Median of Two Sorted Arrays", difficulty: "Hard", createdOn: "2023-10-01"},
        {id: 5, questionHeading: "Longest Palindromic Substring", difficulty: "Medium", createdOn: "2023-10-01"},
        {id: 6, questionHeading: "Zigzag Conversion", difficulty: "Medium", createdOn: "2023-10-01"}
    ];

    let headers = [
      {name: "ID", key: "id"},
        {name: "Question Heading", key: "questionHeading"},
        {name: "Difficulty", key: "difficulty"},
        {name: "Created On", key: "createdOn"}
    ];
    return <div className={styles.mainContainer}>
        <div className={styles.headerContainer}>
        <img src={FilterIcon} className={styles.filterIcon}></img>
        <SearchBar></SearchBar>
         <img src={PlusIcon} className={styles.plusIcon}></img>
         </div>
         <div>
            <ListViewer items ={items} headers={headers}></ListViewer>
         </div>
    </div>
}
export default QuestionsPage;