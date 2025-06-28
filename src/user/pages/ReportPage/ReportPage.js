import { useState, useEffect } from "react";
import { fetchReports } from "../../../apiUtils/apiCalls";
import Chart from "../Chart/Chart";
import styles from "./ReportPage.module.css";
import { Padding } from "@mui/icons-material";

function ReportPage() {
  const [difficulties, setDifficulties] = useState(["Easy", "Medium", "Hard"]);
  const [recentProblemsSolved,setRecentProblemsSolved] = useState([{"heading":"twoSum","difficulty":"Easy","accuracy":"100%"},
    {"heading":"twoSum","difficulty":"Easy","accuracy":"100%"},{"heading":"twoSum","difficulty":"Easy","accuracy":"100%"},
    {"heading":"twoSum","difficulty":"Easy","accuracy":"100%"},{"heading":"twoSum","difficulty":"Easy","accuracy":"100%"}
  ])
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

  const [accuracyData,setAccuracyDate] = useState([
    { value: 78, name: 'Easy' },
    { value: 55, name: 'Medium' },
    { value: 90, name: 'Hard' },
  ]);

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

  const problemsSolvedChartOption = {
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



  const accuracyChartOption = {
    title: {
      text: "Accuracy Chart",
      left: "center",
      top: '2%',
      bottom: 30 // 👈 Adds space below title before legend
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '12%',      
      left: 'center',
      bottom: 30       
    },
    series: [
      {
        name: 'Accuracy',
        type: 'pie',
        radius: ['80%', '60%'], 
        center: ['50%', '60%'], 
        avoidLabelOverlap: true,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 20,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: accuracyData
      }
    ]
  };
  
  

  return (

    <div className={styles.mainContainer}>
      <div className={styles.header}>Anurag</div>
      <div className={styles.charts}>
      <div className={styles.problemsSolvedChart}>
        {difficulties.map((difficulty) => (
          <button
            key={difficulty}
            type="button"
            onClick={() => onDifficultyClickHandler(difficulty)}
          >
            {difficulty}
          </button>
        ))}
        <Chart option={ problemsSolvedChartOption} />
      </div>
      <div className={styles.accuracyChart}>
        <Chart option={accuracyChartOption} >This is chart 2</Chart>
      </div>
      </div>
      <div className={styles.recentProblemsSolved}>
        {recentProblemsSolved.map(problem=>{
         return <div className={styles.recentProblemSolvedListItem}> 
            <div className={styles.recentProblemSolvedListItemContent}>{problem.heading}</div>
            <div className={styles.recentProblemSolvedListItemContent}>{problem.difficulty}</div>
            <div className={styles.recentProblemSolvedListItemContent}>{problem.accuracy}</div>
          </div>
        })}
      </div>
    </div>
  );
}

export default ReportPage;
