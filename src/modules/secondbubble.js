// import valueAchtergrond from './selections.js'

export default function secondBubble(data) {



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
    .range([1, 70]);

  // nesting achtergrond
  let valueAchtergrond = d3.nest()
    .key(d => d.achtergrond)
    .key(d => d.cijfer)
    .rollup(leaves => leaves.length)
    .entries(data)


  valueAchtergrond.pop()

  // nest in contact with police
  let contactWith = d3.nest()
    .key(d => d.contact)
    .key(d => d.cijfer)
    .rollup(leaves => leaves.length)
    .entries(data)

  // selection contact with
  let valueContact = contactWith.map(d => d.key)

  // nest totstand 
  let totstandNest = d3.nest()
    .key(d => d.totstand)
    .key(d => d.cijfer)
    .rollup(leaves => leaves.length)
    .entries(data)

  let valueTotstand = totstandNest.map(d => d.key)

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
    .data(dataCijfer, function (d) {
      return d
    })
    .enter()
    .append("circle")

  barPlot
    .attr('class', 'horizonCircle')
    .attr('transform', 'translate(0,30)')
    .attr("cy", d => y(d.key))
    .attr("r", d => z(d.percent))
    .style("fill", "blue")
    .attr('opacity', .5)
    .attr("stroke", "#838383")

  barPlot.exit().remove()



  //main tooltip
  // dataCijfer.forEach(d => d.afkomst = "Totaal")

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

    // d3.select(this.id) 

    // get total to show information

    // function getTotalFromSelection(data) {
    //   data = data.filter(row => row.key == selectedOption)
    //   data = data.map(d => d.values).flat()
    //   let total = data.reduce((a,b)=> a + b.value, 0)
    //   return total
    // }
    // console.log(getTotalFromSelection(valueAchtergrond))
    // console.log(getTotalFromSelection(contactWith))



    // get percentage from total 
    function getPercentage(data) {
      data = data.filter(row => row.key == selectedOption)
      data = data.map(d => d.values).flat()

      let total = data.reduce((prev, cur) => prev + cur.value, 0)
      data.forEach(d => d.total = total);
      let percentage = data.map(d => d.percentage = Math.round(d.value / total * 100));
      data.forEach(d => d.categorie = selectedOption)
      data.sort((a, b) => a.key - b.key)
      data = data.filter(d => d.key !== "99999")

      return data
    }


    let newA = getPercentage(valueAchtergrond)
    let newB = getPercentage(contactWith)
    let newC = getPercentage(totstandNest)
    let newD = getPercentage(resultaatNest)

    // console.log(newA.map(d => d.total))
    // function addText() {
    //   if(newA[0].categorie === selectedOption) {
    //     console.log(currentId+"-label");
    //     console.log(d3.select("#"+currentId+"-label").text(selectedOption + ": " + newA[0].total))
    //     return d3.select("#"+currentId+"-label").html(selectedOption + ": </br>" + newA[0].total + " respondente");
    //   } else if(newB[0].categorie === selectedOption) {
    //     return d3.select("label"+currentId).html(selectedOption + ": " + newB.total)
    //   } else if(newC[0].categorie === selectedOption){
    //     return d3.select("label"+currentId).html(selectedOption + ": " + newC.total)
    //   } else if(newD[0].categorie === selectedOption){
    //     return d3.select("label"+currentId).html(selectedOption + ": " + newD.total)
    //   }
    // }
    // addText();
    // barPlot
    //   .attr("r", function (d) {
    //     return d.r
    //   })


    barPlot
      .data(newA, function (d) {
        return d.newa = d.key;
      })
      .transition()
      .duration(600)
      .attr("cy", d => y(d.key))
      .attr("r", d => z(d.percentage))
      .ease(d3.easeBounce)



    barPlot
      .data(newB, function (d) {
        return d.newb = d.key;
      })
      .transition()
      .duration(600)
      .attr("cy", d => y(d.key))
      .attr("r", d => z(d.percentage))
      .ease(d3.easeBounce)


    barPlot
      .data(newC, function (d) {
        return d.newc = d.key;
      })
      .transition()
      .duration(600)
      .attr("cy", d => y(d.key))
      .attr("r", d => z(d.percentage))
      .ease(d3.easeBounce)

    barPlot.exit().remove()


    let infoText = d3.select('.second')
      .data(newA)
      .html(d => d.total + '</br> respondenten')


    let infoText2 = d3.select('.second')
      .data(newB)
      .html(d => d.total + '</br> respondenten')

    let infoText3 = d3.select('.second')
      .data(newC)
      .html(d => d.total + '</br> respondenten')




    //tooltip

    // add the dots with tooltips
    svg.selectAll("circle")
      .data(newA)
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



  }
  // radio button on change update

  d3.selectAll(("input[name='states2']"))
    .on("change", updateBubble2)
  //update pattern ends here


}