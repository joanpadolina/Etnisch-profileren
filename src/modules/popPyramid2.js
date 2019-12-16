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



    let x = d3.scaleBand()
        .domain(newNest.map(d => d.key))
        .rangeRound([0, width])
        .padding(0.3)

    let x0 = d3.scaleBand()
        .domain(genderSource)
        .rangeRound([0, x.bandwidth()])
        .padding(0.2)


    // console.log(x.domain())

    let y = d3.scaleLinear()
        .domain([0, d3.max(newNest, d => {
            return d3.max(d.values, el => {
                    return el.value
                }

            )
        })])
        .rangeRound([height,0])

    let z = d3.scaleOrdinal()
        .domain(genderSource)
        .range(["#29A567", "#586BA4", "#ED4D6E", "#AED9E0", "#FECCBA"])



    // x.domain(data.map(function (d) {
    //     return d.key;
    // }));
    // console.log(x.domain)

    g.append("g")
        .attr("transform", "translate(0, " + height + ")")
        .call(d3.axisBottom(x))

    g.append("g")
        .call(d3.axisLeft(y))
        .append("text")
        .attr("fill", "#000")
        .attr("transform", "rotate(-90)")
        .attr("y", height)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
    // .text("aantal");

    let mainGroup = g.append('g')
        .selectAll('g')
        .data(newNest)


    let gender = mainGroup
        .enter()
        .append('g')
        .attr('transform', d => {
            return `translate(${x(d.key)},0)`
        })
        .attr('class', 'gender')

    let rect = gender.selectAll("rect")
        .data(d => d.values)

    let rectEnter = rect
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr('y', height)
        .attr('width', x.bandwidth())
        .attr('height', 0)


    let groupBar = () => {
        rectEnter
            .attr("x", d => x0(d.key))
            .attr("y", y(d => d.value))
            .attr("width", x0.bandwidth())
            .attr("height", d => height - y(d.value))
            .attr('fill', d => z(d.key))
    }
    groupBar()

let genderOnly = d3.nest()
    .key(d => {
        return d.values[0].key
    })
    .entries(newNest)
let flatThisObject = genderOnly.map(d => d.key)

    console.log(flatThisObject)
    let genderLegenda = () => {
        let legend = g.append("g")
            .attr('class', 'legenda')
            .attr("text-anchor", "end")
            .selectAll("g")
            .data(flatThisObject)
            .enter()
            .append("g")
            .attr("transform", (d, i) => {
                return "translate(0," + i * 25 + ")";
            });

        legend.append("rect")
            .attr("x", width - 20)
            .attr("width", 10)
            .attr("height", 19)
            .attr("fill", z);

        legend.append("text")
            .attr("x", width - 24)
            .attr("y", 9.5)
            .attr("dy", "0.32em")
            .attr('fill', 'darkgray')
            .text(d => {
                return d;
            });
    }
    genderLegenda()
}