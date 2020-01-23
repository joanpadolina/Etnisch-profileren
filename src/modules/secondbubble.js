import {
  getPercentage
} from './selectedData.js'

export default function secondBubble(data) {

  const nietwesters = data.filter(object => {
    if (object.achtergrond !== 'Nederlands' && object.achtergrond !== "Westers" && object.achtergrond !== "Onbekend") {
      return object
    }
  })

  const nederlands = data.filter(object => {
    if (object.achtergrond == "Nederlands") return object
  })

  data = nietwesters


  // set the dimensions and margins of the graph
  let margin = {
      top: 10,
      right: 30,
      bottom: 70,
      left: 100
    },
    width = 860 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;

  let svg = d3.select("#my_dataviz")
    .append("svg")
    .attr('class', 'bubble-plot2')
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");

  // nested data with given number
  let dataNew = d3.nest()
    .key(d => d.cijfer)
    .rollup(leaves => leaves.length)
    .entries(data)

  dataNew.sort((a, b) => a.key - b.key)

  let dataCijfer = dataNew.filter(d => d.key !== "99999")


  //chazz the man
  let sumData = dataCijfer.reduce((prev, cur) => prev + cur.value, 0)
  let percentage = dataCijfer.map(d => d.percent = Math.round(d.value / sumData * 100))
  dataCijfer.forEach(d => d.total = sumData)
  // console.log(dataCijfer)

  // y axis
  let y = d3.scaleBand()
    .range([0, height])
    .domain(dataCijfer.map(d => d.key).sort((a, b) => b - a))

  svg.append("g")
    .attr("class", "axis")
    .call(d3.axisLeft(y))

  // x axis
  let x = d3.scaleLinear()
    .domain([0, d3.max(dataCijfer.map(d => d.value))])
    .range([0, width])

  svg.append("g")
    .call(d3.axisBottom(x))
    .attr('opacity', 0)

  // Add a scale for bubble size
  let z = d3.scaleLinear()
    .domain([0, d3.max(dataCijfer.map(d => d.percent))])
    .range([1, 60]);


  // Circle size horizontal overal
  let cirPlot = svg.selectAll("circle")
    .data(dataCijfer, function (d) {
      return d.key
    })
    .enter()
    .append("circle")

  cirPlot
    .attr('class', 'horizonCircle')
    .attr('transform', 'translate(0,30)')
    .attr("cy", d => y(d.key))
    .attr("r", d => z(d.percent))
    .style("fill", "blue")
    .attr('opacity', .5)
    .attr("stroke", "#838383")

  //color change
  let colorbut = d3.selectAll(("input[name='kleur']"))
    .on("change", function () {
      svg.selectAll("circle")
        .transition()
        .duration(400)
        .style("fill", d3.select(this).property("value"))
    })



  cirPlot.exit().remove()

  // add the dots with tooltips
  let div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

  svg.selectAll("circle")
    .data(dataCijfer)
    .on("mouseover", function (d) {
      div.transition()
        .duration(200)
        .style("opacity", .9)
      div.html(` Cijfer: <span>${d.key}</span></br>percentage: <span>${d.percent}%</span> </br> aantal: ${d.value}`)
        .style("left", (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY - 28) + "px");
    })
    .on("mouseout", function (d) {
      div.transition()
        .duration(500)
        .style("opacity", 0);
    });


  // --- update pattern ends here --- ///


  function updateBubble2() {

    const selectedOption = this.value

    const updateData = getPercentage(data, selectedOption)

    let updateCir = cirPlot

    updateCir
      .data(updateData, d => d.key)
      .transition()
      .duration(800)
      .attr("cy", d => y(d.key))
      .attr("r", d => z(d.percentage))
      .ease(d3.easeBounce)

    updateCir.attr("r", function (d) {
      return Math.sqrt(d.percentage);
    });


    updateCir.exit().transition()
      .attr("r", 0)
      .remove();

    //tooltip

    // add the dots with tooltips
    svg.selectAll(".horizonCircle")
      .data(updateData, d => d.key)
      .on("mouseover", function (d) {
        div.transition()
          .duration(200)
          .style("opacity", .9);
        div.html(`<span>${d.categorie}</span> </br>Cijfer: <span>${d.key}</span></br> percentage: ${d.percentage}% </br> aantal: ${d.value}`)
          .style("left", (d3.event.pageX) + "px")
          .style("top", (d3.event.pageY - 28) + "px");
      })
      .on("mouseout", function (d) {
        div.transition()
          .duration(500)
          .style("opacity", 0);
      });


    d3.select('.second')
      .data(updateData)
      .html(d => d.total)


    if (selectedOption == "algemeenniet") {
      updateCir
        .data(dataCijfer, d => d.key)
        .transition()
        .duration(800)
        .attr("cy", d => y(d.key))
        .attr("r", d => z(d.percent))
        .ease(d3.easeBounce)
      d3.select('.second')
        .data(dataCijfer)
        .html(d => d.total)

      svg.selectAll("circle")
        .data(dataCijfer)
        .on("mouseover", function (d) {
          div.transition()
            .duration(200)
            .style("opacity", .9)
          div.html(` Cijfer: <span>${d.key}</span></br>percentage: <span>${d.percent}%</span> </br> aantal: ${d.value}`)
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function (d) {
          div.transition()
            .duration(500)
            .style("opacity", 0);
        });
    }

  }

  // radio button on change update

  d3.selectAll(("input[name='states2']"))
    .on("change", updateBubble2)
  //update pattern ends here


}