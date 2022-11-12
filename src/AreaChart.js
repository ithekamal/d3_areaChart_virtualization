import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";





function AreaCharts({props}) {
 const [removeKPI,setRemoveKPI] = useState(false)

  let data = props
  let dataAxesValues = data.axes[0].values

  const areaChart = useRef();
  const dimensions = { width: data.width, height: data.height }; //whole graph

  function deleteKPI() {
    setRemoveKPI(true)
  }


  useEffect(() => {
    const svg = d3
      .select(areaChart.current)
      .attr("width", dimensions.width)
      .attr("height", dimensions.height)
      .attr("class", "svgBox");
    // .style('background-color', 'gray')

    var defs = svg.append("defs");
    var gradient = defs
      .append("linearGradient")
      .attr("id", "svgGradient")
      .attr("x1", "0%")
      .attr("x2", "0%")
      .attr("y1", "0%")
      .attr("y2", "100%");
    gradient
      .append("stop")
      .attr("class", "start")
      .attr("offset", "0%")
      .attr("stop-color", " #5b86e5")
      .attr("stop-opacity", 1);
    gradient
      .append("stop")
      .attr("class", "end")
      .attr("offset", "100%")
      .attr("stop-color", "#36d1dc")
      .attr("stop-opacity", 0);

    const x = d3
      .scaleLinear() //x-axis
      .domain([0, d3.max(dataAxesValues, (d) => d)])
      .range([0, dimensions.width]);

    const y = d3
      .scaleLinear() //y- axis
      .domain([0, d3.max(dataAxesValues)])
      .range([dimensions.height - 100, 0]);


    const area = d3
      .area()
      .x((d, index) =>
        x(index * (Math.max(...dataAxesValues) / (dataAxesValues.length - 1)))
      ) 

      .y0(y(0))
      .y1((d) => y(d));

      //visualizing svg
    svg
      .append("path")
      .datum(dataAxesValues)
      .attr("d", area)
      .attr("fill", "url(#svgGradient)")
      .attr("stroke", "#8c50fc")
      .attr("stroke-width", 1.5)
      .attr("transform", "translate( 0, 100 )");

    //Lable
    svg.append("text").attr("class", "lable");
    svg.select(".lable").attr("x", 20).attr("y", 30).text(`${data.label}`);

    //Sublable
    svg.append("text").attr("class", "sublable");
    svg
      .select(".sublable")
      .attr("x", 20)
      .attr("y", 70)
      .text(`${data.subLabel}`);

    //Delete  button
    svg.append("text").attr("class", "delete");
    svg
      .select(".delete")
      .attr("x", data.width -  data.width/6)
      .attr("y", 30)
      .text(`x`)
      .on("click", deleteKPI);

  },[]);
  
  return (
    <div className="chartArea">
    { removeKPI === false ? <svg ref={areaChart}></svg> : null}
    </div>
  );
}

export default AreaCharts;
