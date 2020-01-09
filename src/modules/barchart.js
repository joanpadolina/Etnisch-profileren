export default function barChart(data) {

    console.log('barchart' ,data)
  let terechtNest = d3.nest()
    .key(d => d.terecht)
    .rollup(leaves => leaves.length)
    .entries(data)

    let splitNein = terechtNest.pop()
    console.log(terechtNest)

    // aangepaste kleuren
    function colorList() {
        return d3.scaleOrdinal(["#29A567", "#586BA4", "#ED4D6E", "#FAFFD8", "#AED9E0", "#FECCBA"])
    }
    let color = colorList()

    let barchart = d3.select("svg"),
        margin = {
            top: 20,
            right: 50,
            bottom: 30,
            left: 100
        },
        width = +barchart.attr("width") - margin.left - margin.right,
        height = +barchart.attr("height") - margin.top - margin.bottom,
        g = barchart.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");



}