// import valueAchtergrond from './selections.js'

export default function bubbleChart(data) {

  let valueAchtergrond = d3.nest()
    .key(d => d.achtergrond)
    .key(d => d.cijfer)
    .rollup(leaves => leaves.length)
    .entries(data)

  console.log(data)

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
    .attr('opacity', 0)

  // Add a scale for bubble size
  let z = d3.scaleLinear()
    .domain([0, d3.max(dataCijfer.map(d => d.value))])
    .range([1, 40]);


  // values for the selection westers/niet-westers
  let selectionValues = valueAchtergrond.map(d => d.key)

  let choicesValue = d3.select('body')
    .append('select')
    .attr('class', 'selection-values')

  choicesValue
    .selectAll('option')
    .data(selectionValues)
    .enter()
    .append('option')
    .text(d => d)
    .attr('value', d => d)

  // nest in contact with police
  let contactWith = d3.nest()
    .key(d => d.contact)
    .key(d => d.cijfer)
    .rollup(leaves => leaves.length)
    .entries(data)

  // selection contact with
  let valueContact = contactWith.map(d => d.key)

  // console.log(contactWith)
  let contactSelection = d3.select('body')
    .append('select')
    .attr('class', 'contact-values')

  contactSelection
    .selectAll('option')
    .data(valueContact)
    .enter()
    .append('option')
    .text(d => d)
    .attr('value', d => d)

  // nest totstand 
  let totstandNest = d3.nest()
    .key(d => d.totstand)
    .key(d => d.cijfer)
    .rollup(leaves => leaves.length)
    .entries(data)

  let valueTotstand = totstandNest.map(d => d.key)
  console.log(totstandNest)

  // selection totstand
  let totstandSelection = d3.select('body')
    .append('select')
    .attr('class', 'totstand-values')

  totstandSelection
    .selectAll('option')
    .data(valueTotstand)
    .enter()
    .append('option')
    .text(d => d)
    .attr('value', d => d)

  // Circle size horizontal overal
  let barPlot = svg.selectAll("mycircle")
    .data(dataCijfer)
    .enter()
    .append("circle")

  barPlot
    .attr('class', 'horizonCircle')
    .attr('transform', 'translate(0,421)')
    .attr("cx", d => x(d.key))
    .attr("r", d => z(d.value))
    .style("fill", "#69b3a2")
    .attr('opacity', .5)
    .attr("stroke", "black")

  // update pattern starts here
  function updateBubble() {

    const selectedOption = this.value

    //update on background
    let updateAchtergrond = valueAchtergrond.filter(row => row.key == selectedOption)
    let newA = updateAchtergrond.map(d => d.values).flat()
    console.log(newA)

    //update on contact with
    let updateContact = contactWith.filter(row => row.key == selectedOption)
    let newB = updateContact.map(d => d.values).flat()
    console.log(updateContact)

    //update on totstand 
    let updateTotstand = totstandNest.filter(row => row.key == selectedOption)
    let newC = updateTotstand.map(d => d.values).flat()
    console.log(updateTotstand)

    barPlot
      .data(newA)
      .transition()
      .duration(1000)
      .attr("cx", d => x(d.key))
      .attr("r", d => z(d.value))

    barPlot
      .data(newB)
      .transition()
      .duration(1000)
      .attr("cx", d => x(d.key))
      .attr("r", d => z(d.value))

    barPlot
      .data(newC)
      .transition()
      .duration(1000)
      .attr("cx", d => x(d.key))
      .attr("r", d => z(d.value))
    barPlot
      .exit().remove()


  }

  d3.selectAll('.selection-values')
    .on('change', updateBubble)

  d3.selectAll('.contact-values')
    .on('change', updateBubble)

  d3.selectAll('.totstand-values')
    .on('change', updateBubble)
  //update pattern ends here

}