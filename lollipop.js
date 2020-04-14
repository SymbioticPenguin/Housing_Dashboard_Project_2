// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 90, left: 40},
    width = 460 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#lollipop")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

svg.append("rect")
.attr("width","100%")
.attr("height","100%")
.attr("fill","white");
     
// Parse the Data
d3.csv("Resources/Zillow_SD_data.csv", function(data) {



// X axis
var x = d3.scaleBand()
  .range([ 0, width+40 ])
  .domain(data.map(function(d) { return d.Year;}))
  .padding(1);
svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x))
  .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

// Add Y axis
var y = d3.scaleLinear()
  .domain([0, 1000000])
  .range([ height, 0]);
svg.append("g")
  .call(d3.axisLeft(y));

// Lines
svg.selectAll("myline")
  .data(data)
  .enter()
  .append("line")
    .attr("x1", function(d) { return x(d.Year); })
    .attr("x2", function(d) { return x(d.Year); })
    .attr("y1", function(d) { return y(d["San_Diego"]); })
    .attr("y2", y(0))
    .attr("stroke", "grey")

// Circles
svg.selectAll("mycircle")
  .data(data)
  .enter()
  .append("circle")
    .attr("cx", function(d) { return x(d.Year); })
    .attr("cy", function(d) { return y(d["San_Diego"]); })
    .attr("r", "4")
    .style("fill", "#69b3a2")
    .attr("stroke", "black")
})