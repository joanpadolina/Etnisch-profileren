(function () {
  'use strict';

  function bubbleChart(data) {
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
    let dataCijfer = d3.nest()
      .key(d => d.cijfer)
      .rollup(leaves => leaves.length)
      .sortKeys(d3.ascending)
      .entries(data);

    dataCijfer.pop();

    //chazz the man
    let sumData = dataCijfer.reduce((prev, cur) => prev + cur.value, 0);
    let percentage = dataCijfer.map(d => d.value = Math.round(d.value / sumData * 100));


    // y axis
    let y = d3.scaleBand()
      .range([0, height])
      .domain(dataCijfer.map(d => d.key).sort((a, b) => b - a));

    svg.append("g")
      .attr("class", "axis")
      .call(d3.axisLeft(y));

    // x axis
    let x = d3.scaleLinear()
      .domain([0, d3.max(dataCijfer.map(d => d.value))])
      .range([0, width]);

    svg.append("g")
      .call(d3.axisBottom(x))
      .attr('opacity', 0);

    // Add a scale for bubble size
    let z = d3.scaleLinear()
      .domain([0, d3.max(dataCijfer.map(d => d.value))])
      .range([1, 70]);

    // nesting achtergrond
    let valueAchtergrond = d3.nest()
      .key(d => d.achtergrond)
      .key(d => d.cijfer)
      .rollup(leaves => leaves.length)
      .entries(data);

    // nest in contact with police
    let contactWith = d3.nest()
      .key(d => d.contact)
      .key(d => d.cijfer)
      .rollup(leaves => leaves.length)
      .entries(data);


    // nest totstand 
    let totstandNest = d3.nest()
      .key(d => d.totstand)
      .key(d => d.cijfer)
      .rollup(leaves => leaves.length)
      .entries(data);

    // nest resultaat contact
    let resultaatNest = d3.nest()
      .key(d => d.terecht)
      .key(d => d.cijfer)
      .rollup(leaves => leaves.length)
      .entries(data);

    let valueResultaat = resultaatNest.map(d => d.key);
    valueResultaat.pop();



    // Circle size horizontal overal
    let barPlot = svg.selectAll("mycircle")
      .data(dataCijfer)
      .enter()
      .append("circle");

    barPlot
      .attr('class', 'horizonCircle')
      .attr('transform', 'translate(0,19)')
      .attr("cy", d => y(d.key))
      .attr("r", d => z(d.value))
      .style("fill", "yellow")
      .attr('opacity', .5)
      .attr("stroke", "black");


    barPlot
      .exit().remove();

    dataCijfer.forEach(d => d.afkomst = "Totaal");
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


    // --- update pattern ends here --- ///
    function updateBubble() {

      const selectedOption = this.value;

    // get percentage from total 
      function getPercentage(data) {
        data = data.filter(row => row.key == selectedOption);
        data = data.map(d => d.values).flat();

        let total = data.reduce((prev, cur) => prev + cur.value, 0);
        data.forEach(d => d.total = total);
        let percentage = data.map(d => d.percentage = Math.round(d.value / total * 100));
        data.forEach(d => d.categorie = selectedOption);
        data = data.filter(d => d.key !== "99999");
        return data
      }

      let documentTest = document.querySelector('.first');

      console.log(documentTest);


      let newA = getPercentage(valueAchtergrond);
      let newB = getPercentage(contactWith);
      let newC = getPercentage(totstandNest);
      let newD = getPercentage(resultaatNest);


      barPlot
        .data(newA)
        .transition()
        .duration(1000)
        .attr("cy", d => y(d.key))
        .attr("r", d => z(d.percentage));

      barPlot
        .data(newB)
        .transition()
        .duration(1000)
        .attr("cy", d => y(d.key))
        .attr("r", d => z(d.percentage));

      barPlot
        .data(newC)
        .transition()
        .duration(1000)
        .attr("cy", d => y(d.key))
        .attr("r", d => z(d.percentage));

      barPlot
        .data(newD)
        .transition()
        .duration(1000)
        .style("fill", "red")
        .attr("cy", d => y(d.key))
        .attr("r", d => z(d.percentage));

    }

    // radio button

    d3.selectAll(("input[name='states']")).on("change", updateBubble);
    
    

    // --- update pattern ends here --- ///


    // * tooltip

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
        div.html(`<span>${d.categorie}</span>:</br> percentage: ${d.percentage}% </br> aantal: ${d.value}`)
          .style("left", (d3.event.pageX) + "px")
          .style("top", (d3.event.pageY - 28) + "px");
      })
      .on("mouseout", function (d) {
        div.transition()
          .duration(500)
          .style("opacity", 0);
      });



  }

  function barChart(data) {
  console.log(data);

      let terechtNest = d3.nest()
          .key(d => d.terecht)
          .key(d => d.achtergrond)
          .rollup(leaves => leaves.length)
          .entries(data);

      let splitNein = terechtNest.pop();

      let groupedTerecht = maakMooi(terechtNest);
      console.log(terechtNest);
      console.log(groupedTerecht);

      // kris

      function maakMooi(data) {
          return data.reduce((newObject, currentItem) => {
              // console.log(currentItem)
      
              newObject[currentItem.key] = currentItem.values
                  .reduce((newObj, current) => {
                      const nietWestersTalen = ['Surinaams', 'Marokkaans', 'Turks', 'Overig niet-Westers','Voormalig Nederlandse Antillen'];
                      const isNietWesterseTaal = nietWestersTalen.find(taal => taal === current.key);

                      newObj.welWesters = newObj.welWesters.filter(item => {
                          return item.key == 'Nederlands'
                      });
                      
                      if (isNietWesterseTaal) {
                          newObj.nietWesters.push(current);
                      } else {
                          newObj.welWesters.push(current);
                      }

                      return newObj
                  }, {
                      nietWesters: [],
                      welWesters: [],
                  });

              return newObject
          }, {})
      }




      let xValue = terechtNest.map(d => d);

      let z = d3.scaleOrdinal()
          .domain(terechtNest.map(d => d.key))
          .range(["#29A567", "#586BA4", "#ED4D6E", "#AED9E0", "#FECCBA"]);
      // console.log(xValue)

      // aangepaste kleuren
      function colorList() {
          return d3.scaleOrdinal(["#29A567", "#586BA4", "#ED4D6E", "#FAFFD8", "#AED9E0", "#FECCBA"])
      }
      let color = colorList();

      // set the dimensions and margins of the graph
      let svg = d3.select(".barchart-ep"),
          margin = {
              top: 30,
              right: 0,
              bottom: 70,
              left: 60
          },
          width = 800,
          height = 400,
          g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");


      // append the svg object to the body of the page
      var barsvg = d3.select(".barchart-ep")
          .append("svg")
          .attr('class', 'barchart')
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");



      let x0 = d3.scaleBand()
          .domain(terechtNest.map(d => d.key))
          .rangeRound([0, width])
          .paddingInner(0.2);


      let x = d3.scaleBand()
          .domain(xValue)
          .rangeRound([0, x0.bandwidth()])
          .padding(0.1);

      barsvg.append("g")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x))
          .selectAll("text")
          .attr("transform", "translate(-10,0)rotate(-45)")
          .style("text-anchor", "end");

      // Add Y axis

      let y = d3.scaleLinear()
          .domain([0, d3.max(terechtNest, d => {
              return d3.max(d.values, el => {
                  return el.value
              })
          })])
          .rangeRound([height, 0]);


      barsvg.append("g")
          .call(d3.axisLeft(y));

      let category = g.append('g')
          .selectAll('g')
          .data(terechtNest);

      let categoryEnter = category
          .enter()
          .append('g')
          .attr('transform', d => {
              return `translate(${x(d.key)},0)`
          })
          .attr('class', 'category');

      let rect = categoryEnter.selectAll('rect')
          .data(d => d.values);

      let rectEnter = rect
          .enter()
          .append('rect')
          .attr('class', 'bar')
          .attr('y', height)
          .attr('width', x0.bandwidth())
          .attr('height', 0);
      // in de subgroepen rechthoeken maken van 5 continenten per subgroep

      let groupBar = () => {
          rectEnter.transition()
              .duration(500)
              .delay((d, i) => {
                  return i * 10;
              })
              .attr('class', 'group-bar')
              .attr('x', d => x(d.key))
              .attr('y', (d) => y(d.value))
              .attr('witdh', x0.bandwidth())
              .attr('height', d => height - y(d.value))
              .attr('fill', d => z(d.key));
          rectEnter.exit().remove();
      };

      groupBar();
      // // Bars
      // barsvg.selectAll("mybar")
      //     .data(terechtNest)
      //     .enter()
      //     .append("rect")
      //     .attr("x", function (d) {
      //         return x(d.key);
      //     })
      //     .attr("y", function (d) {
      //         return y(d.value);
      //     })
      //     .attr("width", x.bandwidth())
      //     .attr("height", function (d) {
      //         return height - y(d.value);
      //     })
      //     .attr("fill", "blue")

  }

  // import valueAchtergrond from './selections.js'

  function secondBubble(data) {

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
    let dataCijfer = d3.nest()
      .key(d => d.cijfer)
      .rollup(leaves => leaves.length)
      .sortKeys(d3.ascending)
      .entries(data);
    dataCijfer.pop();


    //chazz the man
    let sumData = dataCijfer.reduce((prev, cur) => prev + cur.value, 0);
    let percentage = dataCijfer.map(d => d.value = Math.round(d.value / sumData * 100));



    // y axis
    let y = d3.scaleBand()
      .range([0, height])
      .domain(dataCijfer.map(d => d.key).sort((a, b) => b - a));

    svg.append("g")
      .attr("class", "axis")
      .call(d3.axisLeft(y));

    // x axis
    let x = d3.scaleLinear()
      .domain([0, d3.max(dataCijfer.map(d => d.value))])
      .range([0, width]);

    svg.append("g")
      .call(d3.axisBottom(x))
      .attr('opacity', 0);

    // Add a scale for bubble size
    let z = d3.scaleLinear()
      .domain([0, d3.max(dataCijfer.map(d => d.value))])
      .range([1, 70]);

    // nesting achtergrond
    let valueAchtergrond = d3.nest()
      .key(d => d.achtergrond)
      .key(d => d.cijfer)
      .rollup(leaves => leaves.length)
      .entries(data);


    valueAchtergrond.pop();

    // nest in contact with police
    let contactWith = d3.nest()
      .key(d => d.contact)
      .key(d => d.cijfer)
      .rollup(leaves => leaves.length)
      .entries(data);

    // selection contact with
    let valueContact = contactWith.map(d => d.key);

    // nest totstand 
    let totstandNest = d3.nest()
      .key(d => d.totstand)
      .key(d => d.cijfer)
      .rollup(leaves => leaves.length)
      .entries(data);

    let valueTotstand = totstandNest.map(d => d.key);

    // nest resultaat contact
    let resultaatNest = d3.nest()
      .key(d => d.terecht)
      .key(d => d.cijfer)
      .rollup(leaves => leaves.length)
      .entries(data);

    let valueResultaat = resultaatNest.map(d => d.key);
    valueResultaat.pop();


    // Circle size horizontal overal
    let barPlot = svg.selectAll("mycircle")
      .data(dataCijfer)
      .enter()
      .append("circle");

    barPlot
      .attr('class', 'horizonCircle')
      .attr('transform', 'translate(0,19)')
      .attr("cy", d => y(d.key))
      .attr("r", d => z(d.value))
      .style("fill", "blue")
      .attr('opacity', .5)
      .attr("stroke", "#838383");

    barPlot
      .exit().remove();

    //main tooltip
    dataCijfer.forEach(d => d.afkomst = "Totaal");
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
      console.log(valueAchtergrond);

    // update pattern starts here
    function updateBubble2() {
      // const currentId = this.id

      

      const selectedOption = this.value;
      
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



      function getPercentage(data) {
        data = data.filter(row => row.key == selectedOption);
        data = data.map(d => d.values).flat();

        let total = data.reduce((prev, cur) => prev + cur.value, 0);
        data.forEach(d => d.total = total);
        let percentage = data.map(d => d.percentage = Math.round(d.value / total * 100));
        data.forEach(d => d.categorie = selectedOption);


        data = data.filter(d => d.key !== "99999");
        return data
      }      
      

      let newA = getPercentage(valueAchtergrond);
      let newB = getPercentage(contactWith);
      let newC = getPercentage(totstandNest);
      let newD = getPercentage(resultaatNest);

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

      barPlot
        .data(newA)
        .transition()
        .duration(1000)
        .attr("cy", d => y(d.key))
        .attr("r", d => z(d.percentage));

      barPlot
        .data(newB)
        .transition()
        .duration(1000)
        .attr("cy", d => y(d.key))
        .attr("r", d => z(d.percentage));

      barPlot
        .data(newC)
        .transition()
        .duration(1000)
        .attr("cy", d => y(d.key))
        .attr("r", d => z(d.percentage));

      barPlot
        .data(newD)
        .transition()
        .duration(1000)
        .style("fill", "red")
        .attr("cy", d => y(d.key))
        .attr("r", d => z(d.percentage));



    }
    // radio button on change update

    d3.selectAll(("input[name='states2']"))
      .on("change", updateBubble2);
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
        div.html(`<span>${d.categorie}</span>:</br> percentage: ${d.percentage}% </br> aantal: ${d.value}`)
          .style("left", (d3.event.pageX) + "px")
          .style("top", (d3.event.pageY - 28) + "px");
      })
      .on("mouseout", function (d) {
        div.transition()
          .duration(500)
          .style("opacity", 0);
      });

  }

  // import newData from './modules/newData';


  // function etnischData() {
  //     let results = fetch('../src/dataruw.json')
  //         .then(res => res.json())
  //         .then(results => {
  //             let resultsMapping = results
  //                 .map(data => {
  //                     return {
  //                         id: data.response_ID,
  //                         contact: data.Contact_gehad,
  //                         terecht: data.stel_terecht,
  //                         totstand: data.Totstand,
  //                         leeftijd: data.Leeftijd,
  //                         geslacht: data.Geslacht,
  //                         cijfer: data.rapportcijfer,
  //                         achtergrond: data.achtergrond,
  //                         aanleiding_contact: data.aanleiding_contact,
  //                         resultaat_contact: data.contact_gevolg,
  //                         stelling_buitenlands: data.stel_buitenlandgeboren


  //                     }
  //                 })
  //             myVisualChart(resultsMapping)
  //         })
  // }


  // etnischData()

  function newData() {
      let newResults = fetch('../src/newJson.json')
          .then(res => res.json())
          .then(results => {

              let newDataResults = results
                  .map(data => {
                      return {
                          id: data.response_ID,
                          stad: data.Stadsdeel,
                          totstand: data.Totstand,
                          terecht: data.stel_terecht,
                          contact: data.Contact_gehad,
                          categoriecontact: data.Categorie_contact,
                          stellingTerecht: data.stel_terecht,
                          stellingachtergrond: data.stel_achtergrond,
                          cijfer: data.rapportcijfer,
                          geslacht: data.Geslacht,
                          achtergrond: data.Herkomst_def,
                          leeftijdcategorie: data.Leeftijd,
                          arrestatie: data.polben_gevolg_arrestatie
                          // hulp:data.Polben_hulp,
                          // thuis: data.Polben_thuis,
                          // uiterlijk:data.Polben_uiterlijk,
                          // vragen: data.Polben_bevragen,
                          // verdacht:data.Polben_verdacht,
                          // locatie: data.Polben_locatie,
                          // aanspreekvriend: data.Polben_aansprekenvriend,
                          // informatie: data.Polben_informatiegeven,
                          // teruggeven: data.Polben_teruggeven,
                          // verkeersongeval: data.Polben_verkeersongeval,
                          // arrestatie: data.Polben_arrestatie
                      }

                  });
              // testNest(newDataResults)
              bubbleChart(newDataResults);
              secondBubble(newDataResults);
              barChart(newDataResults);

          });

  }

  // testNest()
  newData();

}());
