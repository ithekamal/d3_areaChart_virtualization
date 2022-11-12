import React from "react";
import { useState} from "react";

var data = ["customer", "manager", "designer"];

const DropDownMenu = ({addKpi}) => {
  const [visible,setVisible] = useState()
  const [searchKpi, setsearchKpi] = useState("");

  //passing dnew kpi data to app Componenet
  const newKPI = () => {
    addKpi( {
      label: searchKpi+(Math.random()*10),
      subLabel: "$478.0m",
      width: 300,
      height: 200,
      axes: [
        {
          styles: { border: "1px solid darkBlue" },
          values: [40, 63, 30, 50, 90, 80, 60, 80],
        },
      ],
    })
    setsearchKpi('')
    setVisible(false)
  };
  
  const showdropDown = () => {
    setVisible(true)
  }

  return (
    <>
    { visible === true ?
       <div className="search-container">
       <div className="search-inner">
         <input
           type="text"
           value={searchKpi}
           onChange={(event) => {
             setsearchKpi(event.target.value);
           }}
         />
         <button type="submit" onClick={newKPI}>
           add
         </button>
       </div>
       <div className="dropdown">
         {data
           .filter((kpi) => {
             if (searchKpi.length === 0) {
               return kpi;
             } else {
               return (
                 searchKpi.toLowerCase() &&
                 kpi.toLowerCase().startsWith(searchKpi.toLowerCase()) &&
                 searchKpi.toLowerCase() !== kpi.toLowerCase()
               );
             }
           })
           .map((kpi) => (
             <div
               onClick={() => setsearchKpi(kpi)}
               className="dropdown-row"
               key={kpi}
             >
               {kpi}
             </div>
           ))}
       </div>
     </div>
    :<h3 onClick={showdropDown} id="add-Kpi">+addKPI</h3>}</>
  );
};

export default DropDownMenu;
