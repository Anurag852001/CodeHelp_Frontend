import React from "react";
import ReactECharts from "echarts-for-react";

function Chart({option}) {
  return <ReactECharts option={option} style={{ height: 300 }} />;
};

export default Chart;
