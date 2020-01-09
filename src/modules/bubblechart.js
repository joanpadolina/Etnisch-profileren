// import valueAchtergrond from './selections.js'

export default function bubbleChart(data) {

  // data terecht behandel of niet

  // let terechtNest = d3.nest()
  //   .key(d => d.terecht)
  //   .key(d => d.cijfer)
  //   .rollup(leaves => leaves.length)
  //   .entries(data)

  //   let splitNein = terechtNest.pop()
  //   console.log(terechtNest)


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
    .entries(data)

  // X axis
  let y = d3.scaleBand()
    .range([0, height])
    .domain(data.map(d => d.cijfer).sort((a, b) => a - b))

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

  valueAchtergrond.pop()

  console.log(valueAchtergrond)

  // console.log(data)



  // values for the selection westers/niet-westers
  let selectionValues = valueAchtergrond.map(d => d.key)

  let choicesValue = d3.select('.content')
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
  let contactSelection = d3.select('.content')
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

  // selection totstand
  let totstandSelection = d3.select('.content')
    .append('select')
    .attr('class', 'totstand-values')

  totstandSelection
    .selectAll('option')
    .data(valueTotstand)
    .enter()
    .append('option')
    .text(d => d)
    .attr('value', d => d)

  // nest resultaat contact
  let resultaatNest = d3.nest()
    .key(d => d.terecht)
    .key(d => d.cijfer)
    .rollup(leaves => leaves.length)
    .entries(data)

  let valueResultaat = resultaatNest.map(d => d.key)
  valueResultaat.pop()


  // selection resultaat
  let resultaatSelection = d3.select('.content')
    .append('select')
    .attr('class', 'resultaat-values')

  resultaatSelection
    .selectAll('option')
    .data(valueResultaat)
    .enter()
    .append('option')
    .text(d => d)
    .attr('value', d => d)
  // console.log(resultaatNest)

  // Circle size horizontal overal
  let barPlot = svg.selectAll("mycircle")
    .data(dataCijfer)
    .enter()
    .append("circle")

  barPlot
    .attr('class', 'horizonCircle')
    // .attr('transform', 'translate(29,421)')
    .attr("cy", d => y(d.key))
    .attr("r", d => z(d.value))
    .style("fill", "#69b3a2")
    .attr('opacity', .5)
    .attr("stroke", "black")


  barPlot
    .exit().remove()


  // update pattern starts here
  function updateBubble() {

    const selectedOption = this.value

    //update on background
    let updateAchtergrond = valueAchtergrond.filter(row => row.key == selectedOption)
    let newA = updateAchtergrond.map(d => d.values).flat()
    // console.log(newA)

    //update on contact with
    let updateContact = contactWith.filter(row => row.key == selectedOption)
    let newB = updateContact.map(d => d.values).flat()
    // console.log(updateContact)

    //update on totstand 
    let updateTotstand = totstandNest.filter(row => row.key == selectedOption)
    let newC = updateTotstand.map(d => d.values).flat()
    // console.log(updateTotstand)

    //update on totstand 
    let updateResultaat = resultaatNest.filter(row => row.key == selectedOption)
    let newD = updateResultaat.map(d => d.values).flat()
    // console.log(updateResultaat)

    barPlot
      .data(newA)
      .transition()
      .duration(1000)
      .style("fill", "orange")
      .attr("cy", d => y(d.key))
      .attr("r", d => z(d.value))

    barPlot
      .data(newB)
      .transition()
      .duration(1000)
      .style("fill", "pink")
      .attr("cy", d => y(d.key))
      .attr("r", d => z(d.value))

    barPlot
      .data(newC)
      .transition()
      .duration(1000)
      .style("fill", "yellow")
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
  // selection on change update
  d3.selectAll('.selection-values')
    .on('change', updateBubble)

  d3.selectAll('.contact-values')
    .on('change', updateBubble)

  d3.selectAll('.totstand-values')
    .on('change', updateBubble)

  d3.selectAll('.resultaat-values')
    .on('change', updateBubble)
  let radioButtons = d3.selectAll('input')
  radioButtons.on('change', d => {
    const selection = this.value
  })
  //update pattern ends here
  let achtergrond = d3.select('.content')
    .append('g')
    .attr('class', 'text')

  achtergrond
    .append('p')
    .attr("text-anchor", "middle")
    .style("font-size", ".9em")
    .text("achtergrond")

  achtergrond
    .append('p')
    .attr("text-anchor", "middle")
    .style("font-size", ".9em")
    .text("contact")


  achtergrond
    .append('p')
    .attr("text-anchor", "middle")
    .style("font-size", ".9em")
    .attr('class', 'totstand-txt')
    .text("totstand")

  achtergrond
    .append('p')
    .attr("text-anchor", "middle")
    .style("font-size", ".9em")
    .attr('class', 'resultaat-txt')
    .text("resultaat na contact")



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
      div.html(` ${d.value}`)
        .style("left", (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY - 28) + "px");
    })
    .on("mouseout", function (d) {
      div.transition()
        .duration(500)
        .style("opacity", 0);
    });

}