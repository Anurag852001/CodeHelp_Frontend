import { useState,useEffect } from "react";
import { fetchReports } from "../../apiUtils/apiCalls";
import Chart from "../Chart/Chart";
import styles from "./ReportPage.module.css"
function ReportPage(){
     const [reportData,setReportData] = useState(null);
     useEffect(()=> fetchReports().then(data=>{setReportData(data)}),[]);

     const option = {
          title: {
            text: "Problems solved",
          },
          tooltip: {},
          xAxis: {
            type: "category",
            data: ["Easy", "Medium", "Hard"],
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
          name: "Questions Solved",
              type: "line",
              data: [4,5,6],
            },
          ],
        };

     console.log(reportData)
     return <div className={styles.mainContainer}>
          <div className ={styles.header}>
          Anurag
          </div>
         <Chart option = {option}></Chart>
     </div>
}

export default ReportPage;