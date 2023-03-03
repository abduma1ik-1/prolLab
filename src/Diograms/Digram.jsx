import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";


export const Diogram = ({points}) => {
  





  const [data, setData] = useState(
    [ 
      { name: "Янв", uv: 0, bg: 40, pv: 0, amt: 2400 },
      { name: "Фев", uv: 0, bg: 1000, pv: 0, amt: 2210 },
      { name: "Мар", uv: 0, bg: 200, pv: 0, amt: 2290 },
      { name: "Апр", uv: 0, bg: 276, pv: 0, amt: 2000 },
      { name: "Май", uv: 0, bg: 989, pv: 0, amt: 2181 },
      { name: "Июн", uv: 0, bg: 139, pv: 0, amt: 2500 },
      { name: "Июл", uv: 0, bg: 49, pv: 0, amt: 2100 },
      { name: "Август", uv: 0, bg: 49, pv: 0, amt: 2100 },
      { name: "Сентябрь", uv: 0, bg: 49, pv: 0, amt: 2100 },
      { name: "Октябрь", uv: 0, bg: 49, pv: 0, amt: 2100 },
      { name: "Ноябрь", uv: 0, bg: 49, pv: 0, amt: 2100 },
      { name: "Декабрь", uv: 0, bg: 49, pv: 0, amt: 2100 },
    ]
  )
  return (
    <LineChart width={600} height={300} data={data} className="">
      <XAxis dataKey="name" />
      <YAxis />
      <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
      <Line type="monotone" dataKey="pv" stroke="#8884d8" />
      <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
      <Line type="monotone" dataKey="bg" stroke="#82ca9d" />
      <Tooltip />
      <Legend />
    </LineChart>
  );
};
