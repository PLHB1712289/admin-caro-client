import React from "react";
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  BarSeries,
  //   Legend,
  Title,
  //   Tooltip,
} from "@devexpress/dx-react-chart-material-ui";

import { Animation } from "@devexpress/dx-react-chart";

const data = [
  { month: "Jan", sale: 50, total: 987 },
  { month: "Feb", sale: 100, total: 3000 },
  { month: "Mar", sale: 30, total: 1100 },
  { month: "Apr", sale: 107, total: 7100 },
  { month: "May", sale: 95, total: 4300 },
  { month: "Jun", sale: 150, total: 7500 },
  { month: "Jul", sale: 120, total: 5300 },
  { month: "Aug", sale: 110, total: 2500 },
  { month: "Sep", sale: 54, total: 2300 },
  { month: "Oct", sale: 129, total: 2600 },
  { month: "Nov", sale: 48, total: 3400 },
  { month: "Dec", sale: 43, total: 3200 },
];

export default function GameBarChart() {
  return (
    <Chart data={data}>
      <ArgumentAxis />
      <ValueAxis />
      <BarSeries name="Units Sold" valueField="sale" argumentField="month" />
      <Animation />
      <Title text="Online counter" />
    </Chart>
  );
}
