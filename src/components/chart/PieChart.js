import Chart from "react-apexcharts";
import React from "react";
import "./PieChart.css";
function Piechart() {
  return (
    <React.Fragment>
      <div className="column-chart">
        <h3 className="chart-heading">Total Subscribers</h3>
        <Chart
          className="column-piechart"
          type="pie"
          width={500}
          height={550}
          series={[20, 30, 50]}
          options={{
            colors:["#171717","#5C5C5C","#8A8A8A"],
            labels: ["Vendors", "Users", "Devices"],
          }}
        ></Chart>
      </div>
    </React.Fragment>
  );
}
export default Piechart;
