import removeKeys from './removeNull.js'

export default function bubbleChart(data) {
  let valueAchtergrond = d3.nest()
    .key(d => d.achtergrond)
    .rollup(leaves => leaves.length)
    .entries(data)


  // set the dimensions and margins of the graph
  let margin = {
      top: 10,
      right: 30,
      bottom: 70,
      left: 30
    },
    width = 460 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  let svg = d3.select("#my_dataviz")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");

  let dataCijfer = d3.nest()
    .key(d => d.cijfer)
    .rollup(leaves => leaves.length)
    .entries(data)

  // X axis
  let x = d3.scaleBand()
    .range([0, width])
    .domain(data.map(d => d.cijfer).sort((a, b) => a - b))
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
  console.log(dataCijfer)


  // Y axis
  let y = d3.scaleLinear()
    .domain([0, d3.max(dataCijfer.map(d => d.value))])
    .range([height, 0])
  svg.append("g")
    .call(d3.axisLeft(y))

  // Add a scale for bubble size
  let z = d3.scaleLinear()
    .domain([0, d3.max(dataCijfer.map(d => d.value))])
    .range([1, 40]);

  function changeToLollipop() {

    // Lines lollipop
    let lollie = svg.selectAll("myline")
      .data(dataCijfer)
      .enter()
    lollie
      .append("line")
      .attr("x1", d => x(d.key))
      .attr("x2", d => x(d.key))
      .attr("y1", d => y(d.value))
      .attr("y2", y(0))
      .attr("stroke", "grey")
    lollie
      .transition()
      .duration(2000)




    // Circles lollipop
    let stok = svg.selectAll("mycircle")
      .data(dataCijfer)
      .enter()
    stok.selectAll('myCircle')
      .transition()
      .duration(2000)
    stok
      .append("circle")
      .attr("cx", d => x(d.key))
      .attr("cy", d => y(d.value))
      .attr("r", 4)
      .style("fill", "#69b3a2")
      .attr("stroke", "black")

    svg
      .exit().remove()

  }

  // changeToLollipop()


  let button = d3.select('#option')
    .on('click', changeToLollipop)
  console.log(button)


  // // Circle size horizontal
  svg.selectAll("mycircle")
    .data(dataCijfer)
    .enter()
    .append("circle")
    .attr('class', 'horizonCircle')
    .attr('transform', 'translate(0,421)')
    .attr("cx", d => x(d.key))
    .attr("r", d => z(d.value))
    .style("fill", "#69b3a2")
    .attr('opacity', .5)
    .attr("stroke", "black")
    .exit().remove()


}