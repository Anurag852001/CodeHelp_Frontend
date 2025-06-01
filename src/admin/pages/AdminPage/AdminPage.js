import { useEffect, useState } from "react";
import tokenChecker from "../../../utils/tokenChecker";
import { useNavigate } from "react-router-dom";
import SideNav from "../../../components/SideNav/SideNav";
import QuestionIcon  from "../../../resources/Questions.png";
import ContestIcon from "../../../resources/Contest.png";
import TestCaseIcon from "../../../resources/TestCases.png";


function AdminPage() {
  const [isLoading, setIsLoading] = useState(true);
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
    <div>
     <SideNav items = {items}></SideNav>
    </div>
  );
}
 export default AdminPage;