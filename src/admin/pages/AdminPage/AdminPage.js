import { useEffect, useState } from "react";
import tokenChecker from "../../../utils/tokenChecker";
import { useNavigate } from "react-router-dom";

function AdminPage() {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
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
      <h1>Admin Page</h1>
      <p>This is the admin page where you can manage the application.</p>
      {/* Add more admin functionalities here */}
    </div>
  );
}
 export default AdminPage;