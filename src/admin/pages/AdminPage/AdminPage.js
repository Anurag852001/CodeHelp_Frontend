import { useEffect, useState } from "react";
import tokenChecker from "../../../utils/tokenChecker";
import { useNavigate } from "react-router-dom";
import SideNav from "../../../components/SideNav/SideNav";
import QuestionIcon  from "../../../resources/Questions.png";
import ContestIcon from "../../../resources/Contest.png";
import TestCaseIcon from "../../../resources/TestCases.png";
import QuestionsPage from "../Questions/QuestionPage";
import styles from "./AdminPage.module.css"; // Import the CSS module


function AdminPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [navOpen,setNavOpen] = useState(false);
  const navigate = useNavigate();

  const items = [{name:"Questions",icon:QuestionIcon},{name:"TestCases",icon:TestCaseIcon},{name:"Contests",icon:ContestIcon} ];

  useEffect(()=>{
    tokenChecker().then((isValid) => {
      if(isValid){
        setIsLoading(false);
      } else {
        navigate("/")
      }
  });
  },[])

  return (
    isLoading ? <div>Loading...</div>:
    <div className={styles.mainContainer}>
    <div className={styles.sideNavContainer}>
     <SideNav items = {items} navOpen ={navOpen} setNavOpen={setNavOpen}></SideNav>
    </div>
    <div className={ !navOpen ? styles.contentContainerClosed:styles.contentContainer}>
    <QuestionsPage></QuestionsPage>
    </div>
    </div>
  );
}
 export default AdminPage;