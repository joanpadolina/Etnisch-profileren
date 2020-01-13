export default function barChart(data) {

    console.log('barchart', data)
    let terechtNest = d3.nest()
        .key(d => d.terecht)
        .rollup(leaves => leaves.length)
        .entries(data)

    let splitNein = terechtNest.pop()
    console.log(terechtNest)

    let xValue = terechtNest.map(d => d.key)
    console.log(xValue)

    // aangepaste kleuren
    function colorList() {
        return d3.scaleOrdinal(["#29A567", "#586BA4", "#ED4D6E", "#FAFFD8", "#AED9E0", "#FECCBA"])
    }
    let color = colorList()

    let barchart = d3.select("body").append('svg'),
        margin = {
            top: 20,
            right: 50,
            bottom: 30,
            left: 100
        },
        width = +barchart.attr("width") - margin.left - margin.right,
        height = +barchart.attr("height") - margin.top - margin.bottom,
        g = barchart.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    let x = d3.scaleBand()
        .range([0, width])
        .domain(xValue)

    let y = d3.scaleLinear()
        .range([height, 0])
        .domain([0, d3.max(terechtNest.map(d => d.value))])
    console.log(y.domain())

    // svg
    
    //axes

    barchart.append('g')
        .attr('class', 'xaxis')
        .attr('transform', 'translate(0,' + height + ')')
        .call(d3.axisBottom(x))

    barchart.append('g')
        .attr('class', 'yaxis') 
        .call(d3.axisLeft(y))




}