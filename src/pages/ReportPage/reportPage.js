import { useState, useEffect } from "react";
import { fetchReports } from "../../apiUtils/apiCalls";
import Chart from "../Chart/Chart";
import styles from "./ReportPage.module.css";

function ReportPage() {
  const [difficulties, setDifficulties] = useState(["Easy", "Medium", "Hard"]);

  const [reportData, setReportData] = useState({
    success: "true",
    data: {
      Easy: [
        { "2024-05-06": 11 },
        { "2024-05-07": 10 }
      ],
      Medium: [
        { "2024-05-06": 15 },
        { "2024-05-07": 18 }
      ],
      Hard: [
        { "2024-05-06": 31 },
        { "2024-05-07": 90 }
      ]
    }
  });

  const [data, setData] = useState([]);

  useEffect(() => {
    onDifficultyClickHandler("Easy");
  }, []);

  function onDifficultyClickHandler(difficulty) {
    setData(handleReportData(difficulty));
  }

  function handleReportData(difficulty) {
    let dateWiseReport = [];
    reportData?.data[difficulty].forEach((element) => {
      const dateStr = Object.keys(element)[0];
      const value = element[dateStr];

      // Convert "YYYY-MM-DD" to a timestamp for chart
      const dateObj = new Date(dateStr);
      
      dateWiseReport.push([dateObj.getTime(), value]);
    });
    return dateWiseReport;
  }

  const option = {
    tooltip: {
      trigger: "axis",
      position: function (pt) {
        return [pt[0], "10%"];
      }
    },
    title: {
      left: "center",
      text: "Problems Solved"
    },
    toolbox: {
      feature: {
        dataZoom: {
          yAxisIndex: "none"
        },
        restore: {},
        saveAsImage: {}
      }
    },
    xAxis: {
      type: "time",
      boundaryGap: false,
      axisLabel: {
        formatter: function (value) {
          return new Date(value).toISOString().split("T")[0]; // Format YYYY-MM-DD
        },
        hideOverlap: true, 
      },
      splitNumber: 3, 
    }
    ,
    yAxis: {
      type: "value",
      boundaryGap: [0, "10%"]
    },
    dataZoom: [
      {
        type: "inside",
        start: 0,
        end: 20
      },
      {
        start: 0,
        end: 20
      }
    ],
    series: [
      {
        name: "Solved",
        type: "line",
        smooth: true,
        symbol: "none",
        areaStyle: {},
        data: data
      }
    ]
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.header}>Anurag</div>
      <div className={styles.chart}>
        {difficulties.map((difficulty) => (
          <button
            key={difficulty}
            type="button"
            onClick={() => onDifficultyClickHandler(difficulty)}
          >
            {difficulty}
          </button>
        ))}
        <Chart option={option} />
      </div>
    </div>
  );
}

export default ReportPage;
