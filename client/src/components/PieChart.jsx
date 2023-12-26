import React from "react";
import { Chart } from "react-google-charts";

const PieChart = ({ data, title, labels }) => {
  const formatData = (data) => {
    return data.map((item) => [item[labels[0].toLowerCase()], item.count]);
  };

  console.log("In Pie Chart", data);
  console.log(formatData(data));
  // Check if data is defined and not an empty array before rendering the chart
  if (!data || data.length === 0) {
    return <p>No data available for the pie chart.</p>;
  }

  return (
    <Chart
      chartType="PieChart"
      data={[labels, ...formatData(data)]}
      options={{
        title: title,
      }}
      width={"100%"}
      height={"400px"}
    />
  );
};

export default PieChart;
