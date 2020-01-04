(function () {
    'use strict';

    function bubbleChart(data) {
      let valueAchtergrond = d3.nest()
        .key(d => d.achtergrond)
        .key(d => d.cijfer)
        .rollup(leaves => leaves.length)
        .entries(data);

      console.log(data);


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
        .entries(data);

      // X axis
      let x = d3.scaleBand()
        .range([0, width])
        .domain(data.map(d => d.cijfer).sort((a, b) => a - b));
      svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));
      console.log(dataCijfer);


      // Y axis
      let y = d3.scaleLinear()
        .domain([0, d3.max(dataCijfer.map(d => d.value))])
        .range([height, 0]);
      svg.append("g")
        .call(d3.axisLeft(y))
        .attr('opacity', 0);

      // Add a scale for bubble size
      let z = d3.scaleLinear()
        .domain([0, d3.max(dataCijfer.map(d => d.value))])
        .range([1, 40]);


      // let button = d3.select('#option')
      //   .on('click')
      // console.log(button)


      // values for the selection achtergrond
      let selectionValues = valueAchtergrond.map(d => d.key);

      let choicesValue = d3.select('body')
        .append('select')
        .attr('class', 'selectionValues');

      choicesValue
        .selectAll('option')
        .data(selectionValues)
        .enter()
        .append('option')
        .text(d => d)
        .attr('value', d => d);

      // // Circle size horizontal algemeen
      let barPlot = svg.selectAll("mycircle")
        .data(dataCijfer)
        .enter()
        .append("circle");

      barPlot
        .attr('class', 'horizonCircle')
        .attr('transform', 'translate(0,421)')
        .attr("cx", d => x(d.key))
        .attr("r", d => z(d.value))
        .style("fill", "#69b3a2")
        .attr('opacity', .5)
        .attr("stroke", "black");

      // update pattern starts here
      function updateBubble() {

        const selectedOption = this.value;
        let updateAchtergrond = valueAchtergrond.filter(row => row.key == selectedOption);

        let newA = updateAchtergrond.map(d => d.values).flat();

        console.log(newA);

      barPlot
          .data(newA)
          .transition()
          .duration(1000)
          .attr("cx", d => x(d.key))
          .attr("r", d => z(d.value));
      
          barPlot
          .exit().remove();


      }

      d3.selectAll('.selectionValues')
        .on('change', updateBubble);
      //update pattern ends here

    }

    // import newData from './modules/newData';


    function etnischData() {
        let results = fetch('../src/dataruw.json')
            .then(res => res.json())
            .then(results => {
                let resultsMapping = results
                    .map(data => {
                        return {
                            id: data.response_ID,
                            contact: data.Contact_gehad,
                            terecht: data.stel_terecht,
                            totstand: data.Totstand,
                            leeftijd: data.Leeftijd,
                            geslacht: data.Geslacht,
                            cijfer: data.rapportcijfer,
                            achtergrond: data.achtergrond,
                            aanleiding_contact: data.aanleiding_contact,
                            resultaat_contact: data.contact_gevolg,
                            stelling_buitenlands: data.stel_buitenlandgeboren


                        }
                    });
                   bubbleChart(resultsMapping);
            });
    }


    etnischData();

}());
