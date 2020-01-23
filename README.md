# Etnisch-profileren
## [Live te zien!](https://joanpadolina.github.io/Etnisch-profileren/public/index2.html)
![gif](https://github.com/joanpadolina/Etnisch-profileren/blob/master/readmeassets/endchart.gif)



## Download dit project

**stap 1 || download**

```
git clone https://github.com/joanpadolina/Etnisch-profileren.git
```

**stap 2 || install** // in de terminal
```js
npm install
```

**stap 3 || server** // builden en live tonen // in de terminal
*gebruik een live server tool om dit project te bekijken. Dit verschilt per code editor.

```js
npm run start
```
**stap 4 || localhost**
```js
localhost:8080
```


## Introductie

CTRL-ALT-DELETE (CAD) is een organisatie die zich inzet in Etnisch profileren. Hierdoor hebben zij data binnen gekregen uit de enquête  met meer dan 1900 respondenten. Aan ons is gevraagd hier inzichten van te verkrijgen in de data. 

## Het concept

De respondenten hebben een algemeen cijfer over het vertrouwen in de politie aangekruist. Omdat er verschillenden onderwerpen zijn in de enquête wilde wij een totaal beeld geven in het algemeen vertrouwen per onderwerp. Zo heb je bijvoorbeeld een stelling: wat voor een cijfer geven respondenten als ze wel of niet benaderd zijn door de politie. 

## De visualisatie

Omdat etnisch profileren hier centraal staat zijn er twee bubblechart met dezelfde vorm gemaakt waardoor je de Nederlandse Nederlanders met Nederlanders met een niet-westers migratieachtergrond met elkaar kan vergelijken.

## De data
De data komt uit een excel bestand en is door een converter naar [JSON](https://www.aconvert.com/document/xlsx-to-json/) omgezet. Daarna is alleen de data die nodig is opgehaald en de vertrouwen chart gemaakt. 

``` js

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
                        leeftijdcategorie: data.Leeftijdscategorie,
                        arrestatie: data.polben_gevolg_arrestatie,
                        freq: data.freqcontact
                    }

                })

        })

}


newData()

```
Het resultaat na het ophalen is kan je in het volgende afbeelding zien:
![Imgur](https://i.imgur.com/qTjDWqM.png)


## D3.js

De visualisatie is gemaakt in het magische programma D3.js voor de inspiratie heb ik een [D3 Country Bubble Chart](https://github.com/UsabilityEtc/d3-country-bubble-chart) gevolgd. 

### De setup:
Alleerst voeg ik met de .enter() de circles toe die cijfer in de y-as plot. De eerste data die wordt weergegeven is het algemene vertrouwen tussen de twee groepen.



```js
  let cirPlot = svg.selectAll("circle")
    .data(dataCijfer, function (d) {
      return d.key
    })

  let circleEnter = cirPlot
    .enter()
    .append("circle")


  circleEnter
    .attr('class', 'nlCircle')
    .attr('transform', 'translate(0,30)')
    .attr("cy", d => y(d.key))
    .attr("r", d => z(d.percent))
    .style("fill", "yellow")
    .attr('opacity', .5)
    .attr("stroke", "#838383")
```

### de update // data filteren

Om de juiste data binnen kijk je door de value van de 'radiobutton' die is gemaakt in HTML. Deze value geeft een waarde en zoekt vervolgens op in de data. Door te filteren haal je alleen de data op met deze waarde.

```js
    const selectedOption = this.value

    function getPercentage(data) {
      data = data.filter(row => {
        if (row.stellingTerecht == selectedOption || row.totstand == selectedOption || row.stellingachtergrond == selectedOption) {
          return row
        }
      })

      data = d3.nest()
        .key(d => d.cijfer)
        .rollup(leaves => leaves.length)
        .entries(data)

      let total = data.reduce((prev, cur) => prev + cur.value, 0)
      data.forEach(d => d.total = total);
      let percentage = data.map(d => d.percentage = Math.round(d.value / total * 100));
      data.forEach(d => d.categorie = selectedOption)
      data.sort((a, b) => a.key - b.key)
      data = data.filter(d => d.key !== "99999")

      return data
    }

```

Vervolgens maak ik gebruik van de d3.nest om de aantallen per ingevulde cijfer vast te stellen. Deze waarde is nodig omdat dit project niet werkt met absolute getallen. Hierbij is er een berekening gemaakt om het percentage te krijgen per categorie.


### Dit project is mede mogelijk gemaakt door:
* Kim Garrard(tech)
* Isabela Mik (design)
* Joan Padolina (tech)


## [Proces](https://joanpadolina.gitbook.io/product-biografie-promptbitious/)
Ben je nieuwsgierig hoe dit project is verlopen en welke stappen wij hebben gevolgd? Dan verwijs ik je graag naar onze gitbook. Hier hebben wij voor beslissingen vast gelegd en verschillende schetsen tot een uitwerking gedocumenteerd. 


## [Design Rationale](https://app.gitbook.com/@isa-hecker/s/etnisch-profileren/)
Het design rationale gaat expliciet over onze ontwerp keuzen en welke visualisatie werkt en welke we achterwegen hebben gelaten. Ook hier is het proces te vinden.

## Project tools

* [NPM](https://www.npmjs.com/)
* [Rollup.js voor building](https://rollupjs.org/)
* VSCode als code editor
* [D3.js](https://d3js.org/)
* Data van [CTRL-ALT-DELETE](https://controlealtdelete.nl/)


### Bronnenlijst

Algemene bronnenlijst waar ik afgelopen weken vaak heb gekeken en gezocht

`voor de data`
[Controle Alt Delete](https://controlealtdelete.nl/)

`inspiratie code checkup`
[Bl.org](https://bl.ocks.org/)

`inspirate`
[D3 Country Bubble Chart](https://github.com/UsabilityEtc/d3-country-bubble-chart)

`code uitleg d3.js`
[Medium](www.medium.com)

`general debug site (copypaste error)`
[Stackoverflow](www.stackoverflow.com)
