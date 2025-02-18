import React from "react";
import ReactECharts from "echarts-for-react";

function Chart({option}) {
  return <ReactECharts option={option} style={{ height: 400 }} />;
};

export default Chart;
