export default function pyramidBuilder(data, target, options) {

    let newNest = d3.nest()
        .key(d => d.Leeftijd)
        .key(d => d.Geslacht)
        .rollup(d => d.length)
        .entries(data)

    console.log(newNest)

    var svg = d3.select("svg"),
        margin = {
            top: 20,
            right: 20,
            bottom: 30,
            left: 50
        },
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom,
        g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");



    newNest.sort(function (a, b) {
        return d3.ascending(a.key, b.key)
    })

    let age = newNest.map(d => d.key)
    let genderSource = newNest.map(d => d.values[0].key)
    let totalGenderValue = newNest.map(d => d.values[0].value)



    let y = d3.scaleBand()
        .domain(newNest.map(d => d.key))
        .range([height, 0])
        .padding(0.3)

    let y0 = d3.scaleBand()
        .domain(genderSource)
        .range([0, y.bandwidth()])
        .padding(0.2)


    let x = d3.scaleLinear()
        .rangeRound([0, width])
        .domain([0, d3.max(newNest, d => {
            return d3.max(d.values, el => {
                    return el.value
                }

            )
        })])


    let z = d3.scaleOrdinal()
        .domain(genderSource)
        .range(["#29A567", "#586BA4", "#ED4D6E", "#AED9E0", "#FECCBA"])


    g.append("g")
        .attr("transform", "translate(0, " + height + ")")
        .call(d3.axisBottom(x))

    g.append("g")
        .call(d3.axisLeft(y))
        .append("text")
        .attr("fill", "#000")
        .attr("y", height)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("aantal");

    let mainGroup = g.append('g')
        .selectAll('g')
        .data(newNest)


    let gender = mainGroup
        .enter()
        .append('g')
        .attr('transform', d => {
            return `translate(${y(d.key)},0)`
        })
        .attr('class', 'group')

    let rect = gender.selectAll("rect")
        .data(d => d.values)

    let rectEnter = rect
        .enter()
        .append("rect")
        .attr("class", "bar")

    let groupBar = () => {
        rectEnter
            .attr("width", function (d) {
                return x(d.value);
            })
            .attr("y", function (d) {
                return y(d.key)
            })
            .attr('fill', d => z(d.key))
            .attr("height", function(d) { return height - y(d.value); });

    }
    groupBar()

}