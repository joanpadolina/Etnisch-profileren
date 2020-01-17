export default function bubbleChart(data) {


  const nederlands = data.filter(object => {
    if (object.achtergrond == "Nederlands") return object
  })


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
    .attr('class', 'bubble-plot')
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");

  // nested data with given number
  let dataNew = d3.nest()
    .key(d => d.cijfer)
    .rollup(leaves => leaves.length)
    .entries(nederlands)

  dataNew.sort((a, b) => a.key - b.key)

  let dataCijfer = dataNew.filter(d => d.key !== "99999")

  //chazz the man
  let sumData = dataCijfer.reduce((prev, cur) => prev + cur.value, 0)
  let percentage = dataCijfer.map(d => d.percent = Math.round(d.value / sumData * 100))


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

  // nesting achtergrond
  let valueAchtergrond = d3.nest()
    .key(d => d.achtergrond)
    .key(d => d.cijfer)
    .rollup(leaves => leaves.length)
    .entries(nederlands)

  // nest in contact with police
  let contactWith = d3.nest()
    .key(d => d.contact)
    .key(d => d.cijfer)
    .rollup(leaves => leaves.length)
    .entries(nederlands)


  // nest totstand 
  let totstandNest = d3.nest()
    .key(d => d.totstand)
    .key(d => d.cijfer)
    .rollup(leaves => leaves.length)
    .entries(nederlands)

  // nest resultaat contact
  let resultaatNest = d3.nest()
    .key(d => d.terecht)
    .key(d => d.cijfer)
    .rollup(leaves => leaves.length)
    .entries(nederlands)

  let valueResultaat = resultaatNest.map(d => d.key)
  valueResultaat.pop()


  let stellingReligie = d3.nest()
    .key(d => d.stellingachtergrond)
    .key(d => d.cijfer)
    .rollup(leaves => leaves.length)
    .entries(nederlands)


  // Circle size horizontal overal
  let barPlot = svg.selectAll("circle")
    .data(dataCijfer, function (d) {
      return d.key
    })
    .enter()
    .append("circle")

  barPlot
    .attr('class', 'horizonCircle')
    .attr('transform', 'translate(0,30)')
    .attr("cy", d => y(d.key))
    .attr("r", d => z(d.percent))
    .style("fill", "yellow")
    .attr('opacity', .5)
    .attr("stroke", "black")

    let colorbut = d3.selectAll(("input[name='kleur1']"))
    .on("change", function () {
      svg.selectAll("circle")
        .transition()
        .duration(400)
        .style("fill", d3.select(this).property("value"))
    })



  dataCijfer.forEach(d => d.afkomst = "Totaal")
  // add the dots with tooltips

  // * tooltip

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
  console.log(stellingReligie)

  // --- update pattern ends here --- ///
  function updateBubble() {

    const selectedOption = this.value



    // get percentage from total 
    function getPercentage(data) {
      data = data.filter(row => row.key == selectedOption)
      data = data.map(d => d.values).flat()

      let total = data.reduce((prev, cur) => prev + cur.value, 0)
      data.forEach(d => d.total = total);
      let percentage = data.map(d => d.percentage = Math.round(d.value / total * 100));
      data.forEach(d => d.categorie = selectedOption);
      data.sort((a, b) => a.key - b.key)
      data = data.filter(d => d.key !== "99999")

      return data
    }




    // let newA = getPercentage(valueAchtergrond)
    // let newB = getPercentage(contactWith)
    let newC = getPercentage(totstandNest)
    let newD = getPercentage(resultaatNest)
    let newE = getPercentage(stellingReligie)



    // let one = document.querySelector('.first').innerHTML = `${newA[0].total || newB[0].total || newC[0].total} totaal aantal respondenten`
    // let two = document.querySelector('.second').innerHTML = `${newB[0].total} totaal aantal respondenten`


    // console.log(newA.map(d => d.total))
    // function addText() {
    //   let pushedTxt = []
    //   console.log(pushedTxt)
    //   if (newA[0].categorie === selectedOption) {
    //     return pushedTxt.push(newA[0].total)
    //   } else if (newB[0].categorie === selectedOption) {
    //    return  pushedTxt.push(newB[0].total)
    //   } else if (newC[0].categorie === selectedOption) {
    //     return pushedTxt.push(newC[0].total)
    //   } 
    // }
    // addText();
    // barPlot
    //   .attr("r", function (d) {
    //     return d.r
    //   })


    // barPlot
    //   .data(newA, function (d) {
    //     return d.key
    //   })
    //   .transition()
    //   .duration(1000)
    //   .attr("cy", d => y(d.key))
    //   .attr("r", d => z(d.percentage))
    //   .ease(d3.easeBounce)

    // barPlot
    //   .data(newB, function (d) {
    //     return d.key
    //   })
    //   .transition()
    //   .duration(1000)
    //   .attr("cy", d => y(d.key))
    //   .attr("r", d => z(d.percentage))
    //   .ease(d3.easeBounce)

    barPlot
      .data(newC, d => d.newc = d.key)
      .transition()
      .duration(1000)
      .attr("cy", d => y(d.key))
      .attr("r", d => z(d.percentage))
      .ease(d3.easeBounce)

    barPlot
      .data(newD, function (d) {
        return d.key
      })
      .transition()
      .duration(1000)
      .attr("cy", d => y(d.key))
      .attr("r", d => z(d.percentage))
      .ease(d3.easeBounce)


    barPlot
      .data(newE, function (d) {
        return d.key;
      })
      .transition()
      .duration(800)
      .attr("cy", d => y(d.key))
      .attr("r", d => z(d.percentage))
      .ease(d3.easeBounce)


    console.log(newE)

    barPlot
      .attr("r", function (d) {
        return Math.sqrt(d.key);
      })

    barPlot.exit().transition()
      .attr("r", 0)
      .remove();



    // add the dots with tooltips
    svg.selectAll("circle")
      .data(newD)
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



    let infoText3 = d3.select('.first')
      .data(newC)
      .html(d => d.total + '</br> Nederlandse Nederlanders')

    let infoText4 = d3.select('.first')
      .data(newD)
      .html(d => d.total + '</br> Nederlandse Nederlanders')

    let infoText5 = d3.select('.first')
      .data(newE)
      .html(d => d.total + '</br> Nederlandse Nederlanders')

  }

  // radio button

  d3.selectAll(("input[name='states']")).on("change", updateBubble)



  // --- update pattern ends here --- ///



}