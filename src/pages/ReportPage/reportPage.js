import { useEffect } from "react";
import { fetchReports } from "../../apiUtils/apiCalls";

function ReportPage(){

     fetchReports();

     return <div>Hi from report page</div>
}

export default ReportPage;