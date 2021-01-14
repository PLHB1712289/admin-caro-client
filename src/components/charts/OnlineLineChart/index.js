import React, { useEffect, useState } from "react";
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  SplineSeries,
  Legend,
  Title,
  Tooltip,
} from "@devexpress/dx-react-chart-material-ui";
import httpClient from "../../../httpClient";
import config from "../../../config";
import { ValueScale } from "@devexpress/dx-react-chart";
import moment from "moment";

export default function OnlineLineChart() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const interval = setInterval(() => {
      httpClient.get(`${config.URL_SERVER}/online`).then((res) => {
        setData((data) => {
          return [
            ...data.slice(data.length >= 20 ? data.length - 20 + 1 : 0),
            {
              index: moment().format("HH:mm:ss"),
              count: res.data.count,
            },
          ];
        });
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Chart data={data}>
      <ValueScale
        name="online"
        modifyDomain={(a) => {
          return [0, a[1] + 10];
        }}
      />
      <ArgumentAxis />
      <ValueAxis scaleName="online" showGrid={false} showLine showTicks />
      <SplineSeries
        name="Online users"
        valueField="count"
        argumentField="index"
        scaleName="online"
      />
      <Title text="Live online user counter" />
      <Tooltip />
      <Legend />
    </Chart>
  );
}
