import React from "react";
import { Chart } from "react-google-charts";

export function LineChart({ xAxis, yAxis, data }) {
  const formatData = (data) => {
    let newData = [];
    let count = 0;
    data?.forEach((item) => {
      console.log(item);
      count++;
      newData.push([item[xAxis?.toLowerCase()], item.count]);
    });
    return newData;
  };
  const formattedData = formatData(data);
  console.log("Formatted Data", formattedData);
  console.log(formatData(data));
  console.log("In Line Chart", data);
  return (
    <Chart
      chartType="LineChart"
      width="100%"
      height="400px"
      data={[["x", "Acitivities"], ...formatData(data)]}
      options={{
        hAxis: {
          title: xAxis,
        },
        vAxis: {
          title: yAxis,
        },
        series: {
          1: { curveType: "function" },
        },
      }}
    />
  );
}
