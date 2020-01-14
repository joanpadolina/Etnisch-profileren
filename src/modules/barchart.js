export default function barChart(data) {
console.log(data)

    let terechtNest = d3.nest()
        .key(d => d.terecht)
        .key(d => d.achtergrond)
        .rollup(leaves => leaves.length)
        .entries(data)

    let splitNein = terechtNest.pop()

    let groupedTerecht = maakMooi(terechtNest)
    console.log(terechtNest)
    console.log(groupedTerecht)

    function maakMooi(data) {
        return data.reduce((newObject, currentItem) => {
            newObject[currentItem.key] = currentItem.values
                .reduce((newObj, current) => {
                    const nietWestersTalen = ['Surinaams', 'Marokkaans', 'Turks', 'Overig niet-Westers','Voormalig Nederlandse Antillen']
                    const isNietWesterseTaal = nietWestersTalen.find(taal => taal === current.key)

                    newObj.welWesters = newObj.welWesters.filter(item => {
                        return item.key == 'Nederlands'
                    })
                    
                    if (isNietWesterseTaal) {
                        newObj.nietWesters.push(current)
                    } else {
                        newObj.welWesters.push(current)
                    }

                    return newObj
                }, {
                    nietWesters: [],
                    welWesters: [],
                })

            return newObject
        }, {})
    }




    let xValue = terechtNest.map(d => d.key)

    let z = d3.scaleOrdinal()
        .domain(terechtNest.map(d => d.key))
        .range(["#29A567", "#586BA4", "#ED4D6E", "#AED9E0", "#FECCBA"])
    // console.log(xValue)

    // aangepaste kleuren
    function colorList() {
        return d3.scaleOrdinal(["#29A567", "#586BA4", "#ED4D6E", "#FAFFD8", "#AED9E0", "#FECCBA"])
    }
    let color = colorList()

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
        .data(terechtNest)

    let categoryEnter = category
        .enter()
        .append('g')
        .attr('transform', d => {
            return `translate(${x(d.key)},0)`
        })
        .attr('class', 'category')

    let rect = categoryEnter.selectAll('rect')
        .data(d => d.values)

    let rectEnter = rect
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('y', height)
        .attr('width', x0.bandwidth())
        .attr('height', 0)
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
            .attr('fill', d => z(d.key))
        rectEnter.exit().remove()
    }

    groupBar()
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