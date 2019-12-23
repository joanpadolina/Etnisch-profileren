
export default function bubbleChart(data) {

    let nestRating = d3.nest()
    .key(d => d.achtergrond)
    .entries(data)

    console.log(nestRating)

// set the dimensions and margins of the graph
var margin = {top: 10, right: 20, bottom: 30, left: 50},
    width = 500 - margin.left - margin.right,
    height = 420 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

//Read the data

  // Add X axis
  var x = d3.scaleLinear()
    .domain([0, d3.max(data.map(d => d.rating))])
    .range([ 0, width ]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

//   // Add Y axis
//   var y = d3.scaleLinear()
//     .domain([35, 90])
//     .range([ height, 0]);
//   svg.append("g")
//     .call(d3.axisLeft(y));

  // Add a scale for bubble size
  var z = d3.scaleLinear()
    .domain([0, 600])
    .range([ 4, 40]);
console.log(z.domain())
//   // Add a scale for bubble color
//   var myColor = d3.scaleOrdinal()
//     .domain(["Asia", "Europe", "Americas", "Africa", "Oceania"])
//     .range(d3.schemeSet2);

  // Add dots
  svg.append('g')
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
      .attr("cx", d => x(d.nestRating))
      .attr("r", d => z(d.nestRating))
      .style("opacity", "0.7")
      .attr("stroke", "white")
      .style("stroke-width", "2px")



}