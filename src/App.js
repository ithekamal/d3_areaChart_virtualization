import './App.css';
import AreaChart from './AreaChart';
import DropDownMenu from './DropDownMenu';
import { useState } from 'react';

const data = [
  {
    label: "Scenario 1 ",
    subLabel: "$478.0m",
    width: 300,
    height: 200,
    axes: [
      {
        styles: { border: "1px solid darkBlue" },
        values: [40, 63, 30, 50, 90, 80, 60, 80],
      },
    ],
  },
  {
    label: "Scenario 2 ",
    subLabel: "$478.0m",
    width: 300,
    height: 200,
    axes: [
      {
        styles: { border: "1px solid darkBlue" },
        values: [10, 30, 0, 20, 90, 20, 66],
      },
    ],
  },
];


function App() {
  const [kpiData,setKpiData] = useState(data)
  
  //adding new KPI/Graph
  const addKpi = (newkpi) => {
      setKpiData(() => ([...kpiData,newkpi]))
  }


  return (
    <>
    <DropDownMenu addKpi={addKpi}/>
    {kpiData.map(card => <AreaChart props={card} />)} 
    </>
  );
}

export default App;
