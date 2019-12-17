(function () {
    'use strict';

    function testing(results) {
        results.forEach(data => {
            for (let key in data) {
                if (key === "IPadres" || key === "datumafname" || key === "duur_invullen") {
                    delete data[key];
                }
            }

        });



    }

    function pyramidBuilder(data, target, options) {

        let achtergrond = d3.nest()
        .key(d => d.achtergrond_openantwoord)
        .rollup( d => d.length)
        .entries(data);


        achtergrond.sort(function (a, b) {
            return d3.ascending(a.key, b.key)
        });

        console.log(achtergrond);

        // console.log(data)
        let newNest = d3.nest()
            .key(d => d.Leeftijd)
            .key(d => d.Geslacht)
            .rollup(d => d.length)
            .entries(data);




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
        });

        let age = newNest.map(d => d.key);
        let genderSource = newNest.map(d => d.values[0].key);
        let totalGenderValue = newNest.map(d => d.values[0].value);



        let x = d3.scaleBand()
            .domain(newNest.map(d => d.key))
            .rangeRound([0, width])
            .padding(0.3);

        let x0 = d3.scaleBand()
            .domain(genderSource)
            .rangeRound([0, x.bandwidth()])
            .padding(0.2);


        // console.log(x.domain())

        let y = d3.scaleLinear()
            .domain([0, d3.max(newNest, d => {
                return d3.max(d.values, el => {
                        return el.value
                    }

                )
            })])
            .rangeRound([height, 0]);

        let z = d3.scaleOrdinal()
            .domain(genderSource)
            .range(["#29A567", "#54a5dd", "#fbd731", "#f7005a", "#FECCBA"]);



        // x.domain(data.map(function (d) {
        //     return d.key;
        // }));
        // console.log(x.domain)

        g.append("g")
            .attr("transform", "translate(0, " + height + ")")
            .call(d3.axisBottom(x));

        g.append("g")
            .call(d3.axisLeft(y))
            .append("text")
            .attr("fill", "#000")
            .attr("transform", "rotate(-90)")
            .attr("y", height)
            .attr("dy", "0.71em")
            .attr("text-anchor", "end");
        // .text("aantal");

        let mainGroup = g.append('g')
            .selectAll('g')
            .data(newNest);


        let gender = mainGroup
            .enter()
            .append('g')
            .attr('transform', d => {
                return `translate(${x(d.key)}, 0)`
            })
            .attr('class', 'gender');


        let rect = gender.selectAll("rect")
            .data(d => d.values);

        let rectEnter = rect
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr('y', height)
            .attr('width', x.bandwidth())
            .attr('height', 0);

        rectEnter
            .attr("x", d => x0(d.key))
            .attr("y", y(d => d.value))
            .attr("width", x0.bandwidth())
            .attr('fill', d => z(d.key))
            .attr("height", function (d) {
                return height - y(d.value);
            });


        let genderOnly = d3.nest()
            .key(d => {
                return d.values[0].key
            })
            .entries(newNest);

        let flatThisObject = genderOnly.map(d => d.key);

        console.log(flatThisObject);
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
        };
        genderLegenda();
    }

    //Voeg een key 'achtergrond' toe met alle achtergronden
    function addKey(results){
      results.map(result => {
    		result.achtergrond = result.achtergrond_Aru + ', ' + result.achtergrond_Cur + ', ' + result.achtergrond_Mar
        + ', ' + result.achtergrond_NL + ', ' + result.achtergrond_Sur  + ', ' + result.achtergrond_Tur + ', ' + result.achtergrond_anders
        + ', ' + result.achtergrond_geenantwoord + ', ' + result.achtergrond_nietzeggen + ', ' + result.achtergrond_openantwoord;
      });
    	return results
    }

    // import newData from './modules/newData';




    function ageGender() {
        // console.log('hoi')

        let results = fetch('../src/dataruw.json')
            .then(res => res.json())
            .then(results => {
                let resultsMapping = results
                    .map(data => {
                        return {
                            age: data.Leeftijd,
                            gender: data.Geslacht
                        }

                    });
                testing(resultsMapping);
                addKey(resultsMapping);
                console.log(resultsMapping);
                pyramidBuilder(results);
            });
        return results
    }

    ageGender();

}());
