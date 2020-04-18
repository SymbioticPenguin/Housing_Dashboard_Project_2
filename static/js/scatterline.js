// set the dimensions and margins of the graph
var margin = {top: 20, right: 30, bottom: 30, left: 50},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;
// append the svg object to the body of the page
var svg2 = d3.select("#scatterline")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");
          svg2.append("rect")
          .attr("width", "100%")
          .attr("height", height + 40)
          .attr("fill","white");

          svg2.append("text")
          .attr("x",width/4-40)
          .attr("y",50)
          .attr("font-size", "12px")
          .text("Average Home Value in San Diego County from 2004 to 2019");

function buildScatter(){
//Read the data
d3.json("/zillow", function(data) {
  var cityData = data.map(d => {return d["San_Diego"]})
  console.log(cityData);
  // When reading the csv, I must format variables:
  // function(d){
  //   return { year : d3.timeParse("%Y-%m-%d")(d.year), value : d.value }
  // },
  // Now I can use this dataset:
  // function(data) {
    // Add X axis --> it is a year format
    var x2 = d3.scaleBand()
      .domain(data.map(function(d) { return d.Year;}))
      .range([ 0, width - 40 ]);
    svg2.append("g")
      .attr("transform", `translate(50,${height})`)
      .call(d3.axisBottom(x2))
      .selectAll("text")
      .attr("transform", "translate(-10,5)rotate(-45)")
      .style("text-anchor", "end");
    // Add Y axis
    var y = d3.scaleLinear()
      .domain( [0, 1000000])
      .range([ height, 0 ]);
    svg2.append("g")
      .attr("transform","translate(50,5)")
      .call(d3.axisLeft(y));
    // Add the line
    svg2.append("path")
      .datum(data)
      .attr("transform","translate(50,0)")
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .curve(d3.curveBasis) // Just add that to have a curve instead of segments
        .x(function(d) { return x2(d.Year) })
        .y(function(d) { return y(d["San_Diego"]) })
        )
    // create a tooltip
    var Tooltip = d3.select("#scatterline")
      .append("div")
      .attr("transform","translate(50,5)")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("background-color", "white")
      .style("border", "solid")
      .style("border-width", "2px")
      .style("border-radius", "5px")
      .style("padding", "5px")
      // Three function that change the tooltip when user hover / move / leave a cell
      var mouseover = function(d) {
        Tooltip
          .style("opacity", 1)
      }
      var mousemove = function(d) {
        Tooltip
          .html("Exact value: " + d["San_Diego"])
          .style("left", (d3.mouse(this)[0]+70) + "px")
          .style("top", (d3.mouse(this)[1]) + "px")
      }
      var mouseleave = function(d) {
        Tooltip
          .style("opacity", 0)
      }
    // Add the points
    svg2
      .append("g")
      .selectAll("dot")
      .data(data)
      .enter()
      .append("circle")
        .attr("transform","translate(50,0)")
        .attr("class", "myCircle")
        .attr("cx", function(d) { return x2(d.Year) } )
        .attr("cy", function(d) { return y(d["San_Diego"]) } )
        .attr("r", 8)
        .attr("stroke", "#69b3a2")
        .attr("stroke-width", 3)
        .attr("fill", "white")
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave)
})
}
buildScatter();