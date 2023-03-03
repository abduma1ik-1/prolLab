import React from "react";
import { VictoryChart, VictoryLine, VictoryAxis } from "victory";
const data = [
  { x: 1, y: 2 },
  { x: 2, y: 3 },
  { x: 3, y: 5 },
  { x: 4, y: 4 },
  { x: 5, y: 7 },
];
export const Vdiogram = () => {
  return (
   <div style={{width: '300px'}}>
     <VictoryChart>
      <VictoryLine data={data} />
      <VictoryAxis />
      <VictoryAxis dependentAxis />
    </VictoryChart>
   </div>
  );
};
