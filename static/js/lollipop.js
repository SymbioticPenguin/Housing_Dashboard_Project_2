// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 90, left: 90},
    width = 650 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#lollipop")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          `translate(${margin.left},${margin.top})`);

svg.append("rect")
.attr("width","80%")
.attr("height","90%")
.attr("fill","white");

svg.append("text")
.attr("x",width/4-40)
.attr("y",50)
.attr("font-size", "17px")
.text("Average Home Value in San Diego from 2004 to 2019");
var y;


function buildLolli(){

  
// Parse the Data
// d3.csv("Resources/Zillow_SD_data.csv", function(data) {
d3.json("/zillow", function(data) {
var cityData = data.map(d => {return d["San_Diego"]})
console.log(cityData);


// X axis
var x = d3.scaleBand()
  .range([ 0, width + 60 ])
  .domain(data.map(function(d) { return d.Year;}))
  .padding(1);
svg.append("g")
  .attr("transform", `translate(60,${height+30})`)
  .call(d3.axisBottom(x))
  .selectAll("text")
    .attr("transform", "translate(-10,10)rotate(-45)")
    .style("text-anchor", "end");

// Add Y axis
y = d3.scaleLinear()
  .domain([0, 3000000])
  .range([ height, 0]);
svg.append("g")
  .attr("transform","translate(60,30)")
  .call(d3.axisLeft(y));

// Lines
svg.selectAll("myline")
  .data(data)
  .enter()
  .append("line")
    .attr("transform","translate(60,30)")
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
    .attr("transform","translate(60,30)")
    .attr("cx", function(d) { return x(d.Year); })
    .attr("cy", function(d) { return y(d["San_Diego"]); })
    .attr("r", "4")
    .style("fill", "#69b3a2")
    .attr("stroke", "black")
})
}


function update_chart(selection){
  d3.json("/zillow", function(data) {
    // city_data = []
    // for(var i = 0; i < data.length; i++){
    //   // console.log(data[i][selection])
    //   city_data.push(data[i][selection]);
    // }
    // console.log(city_data);
    // console.log(data.selection)
  svg.selectAll("line")
  .attr("y1", d => y(d[selection]));
  svg.selectAll("circle")
  .attr("cy",d => y(d[selection]));
  svg.select("text")
  .text(`Average Home Value in ${selection.replace(/_/g," ")} from 2004 to 2019`)
})
}

buildLolli();

d3.select("#selDataset").on("change", update_chart(this.value));


// svg.selectAll("mycirlce")
// .attr("cy", function(d) {return y(d[dropdown_input])})

// }d3.json("samples.json").then((importedData) => {
//   var names = importedData.names
//   var tselect = d3.select("#selDataset");
//  // console.log(tselect)
 
//  for (var i = 0; i < names.length; i++) {
//     tselect.append("option").property("value",names[i]).text(names[i]);
    
//  }
// var firstSample = names[0];


// buildChart(firstSample);
// buildMetadata(firstSample);
// })