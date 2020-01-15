
export default function bubbleChart(data) {

  

  // set the dimensions and margins of the graph
  let margin = {
      top: 10,
      right: 30,
      bottom: 70,
      left: 100
    },
    width = 860 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  let svg = d3.select("#my_dataviz")
    .append("svg")
    .attr('class', 'bubble-plot')
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");

  // nested data with given number
  let dataCijfer = d3.nest()
    .key(d => d.cijfer)
    .rollup(leaves => leaves.length)
    .sortKeys(d3.ascending)
    .entries(data)

  dataCijfer.pop()
  
  //chazz the man
  let sumData = dataCijfer.reduce((prev, cur) => prev + cur.value, 0)
  let percentage = dataCijfer.map(d => d.value = Math.round(d.value / sumData * 100))


  // X axis
  let y = d3.scaleBand()
    .range([0, height])
    .domain(dataCijfer.map(d => d.key).sort((a, b) => b - a))

    console.log(y.domain())

  svg.append("g")
    .attr("class", "axis")
    .call(d3.axisLeft(y))

  // Y axis
  let x = d3.scaleLinear()
    .domain([0, d3.max(dataCijfer.map(d => d.value))])
    .range([0, width])

  svg.append("g")
    .call(d3.axisBottom(x))
    .attr('opacity', 0)

  // Add a scale for bubble size
  let z = d3.scaleLinear()
    .domain([0, d3.max(dataCijfer.map(d => d.value))])
    .range([1, 70]);

  // nesting achtergrond
  let valueAchtergrond = d3.nest()
    .key(d => d.achtergrond)
    .key(d => d.cijfer)
    .rollup(leaves => leaves.length)
    .entries(data)

  // nest in contact with police
  let contactWith = d3.nest()
    .key(d => d.contact)
    .key(d => d.cijfer)
    .rollup(leaves => leaves.length)
    .entries(data)


  // nest totstand 
  let totstandNest = d3.nest()
    .key(d => d.totstand)
    .key(d => d.cijfer)
    .rollup(leaves => leaves.length)
    .entries(data)

  // nest resultaat contact
  let resultaatNest = d3.nest()
    .key(d => d.terecht)
    .key(d => d.cijfer)
    .rollup(leaves => leaves.length)
    .entries(data)

  let valueResultaat = resultaatNest.map(d => d.key)
  valueResultaat.pop()



  // Circle size horizontal overal
  let barPlot = svg.selectAll("mycircle")
    .data(dataCijfer)
    .enter()
    .append("circle")
    console.log('datacijrer', dataCijfer)
  barPlot
    .attr('class', 'horizonCircle')
    .attr('transform', 'translate(0,19)')
    .attr("cy", d => y(d.key))
    .attr("r", d => z(d.value))
    .style("fill", "yellow")
    .attr('opacity', .5)
    .attr("stroke", "black")


  barPlot
    .exit().remove()

  dataCijfer.forEach(d => d.afkomst = "Totaal")
  // add the dots with tooltips
  svg.selectAll("circle")
    .data(dataCijfer)
    .on("mouseover", function (d) {
      div.transition()
        .duration(200)
        .style("opacity", .9);
      div.html(`${d.afkomst}: ${d.value}%`)
        .style("left", (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY - 28) + "px");
    })
    .on("mouseout", function (d) {
      div.transition()
        .duration(500)
        .style("opacity", 0);
    });

    

    // console.log("datacijfer",dataCijfer)

  // update pattern starts here
  function updateBubble() {
  
    const selectedOption = this.value

    function getPercentage(data) {
      data = data.filter(row => row.key == selectedOption)
      data = data.map(d => d.values).flat()
      
      let total = data.reduce((prev, cur) => prev + cur.value, 0)
      let percentage = data.map(d => d.value = Math.round(d.value / total * 100));
      data.forEach(d => d.categorie = selectedOption);
      data = data.filter(d => d.key !== "99999")
      return data
    }


    let newA = getPercentage(valueAchtergrond)
    let newB = getPercentage(contactWith)
    let newC = getPercentage(totstandNest)
    let newD = getPercentage(resultaatNest)


    barPlot
      .data(newA)
      .transition()
      .duration(1000)
      .attr("cy", d => y(d.key))
      .attr("r", d => z(d.value))

    barPlot
      .data(newB)
      .transition()
      .duration(1000)
      .attr("cy", d => y(d.key))
      .attr("r", d => z(d.value))

    barPlot
      .data(newC)
      .transition()
      .duration(1000)
      .attr("cy", d => y(d.key))
      .attr("r", d => z(d.value))

    barPlot
      .data(newD)
      .transition()
      .duration(1000)
      .style("fill", "red")
      .attr("cy", d => y(d.key))
      .attr("r", d => z(d.value))

  }

  // radio buttons

  d3.selectAll(("input[name='states']")).on("change", updateBubble)

  //update pattern ends here



  //tooltip

  let div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

  // add the dots with tooltips
  svg.selectAll("circle")
    .data(valueAchtergrond)
    .on("mouseover", function (d) {
      div.transition()
        .duration(200)
        .style("opacity", .9);
      div.html(`${d.categorie}: ${d.value}%`)
        .style("left", (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY - 28) + "px");
    })
    .on("mouseout", function (d) {
      div.transition()
        .duration(500)
        .style("opacity", 0);
    });



}