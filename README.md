# Etnisch-profileren
## [Live te zien!](https://joanpadolina.github.io/Etnisch-profileren/public/index2.html)
![gif](https://github.com/joanpadolina/Etnisch-profileren/blob/master/readmeassets/dataviz%20bubble.gif)
![screen](https://github.com/joanpadolina/Etnisch-profileren/blob/master/readmeassets/bubblescreen.png)
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


### Dit project is mede mogelijk gemaakt door:
* Kim Garrard(tech)
* Isabela Mik (design)
* Joan Padolina (tech)


## [Proces](https://joanpadolina.gitbook.io/product-biografie-promptbitious/)
Ben je nieuwsgierig hoe dit project is verlopen en welke stappen wij hebben gevolgd? Dan verwijs ik je graag naar onze gitbook. Hier hebben wij voor beslissingen vast gelegd en verschillende schetsen tot een uitwerking gedocumenteerd. 


## [Design Rationale](https://app.gitbook.com/@isa-hecker/s/etnisch-profileren/)
Het design rationale gaat expliciet over onze ontwerp keuzen en welke visualisatie werkt en welke we achterwegen hebben gelaten. Ook hier is het proces te vinden.

## Project tools

* Npm pakketen
* Rollup.js voor building
* VSCode als code editor
* Data uit [CTRL-ALT-DELETE](https://controlealtdelete.nl/)

## Project kloonen?

**stap 1 || download**

```
https://github.com/joanpadolina/Etnisch-profileren.git
```

**stap 2 || install** // in de terminal
```js
npm install
```

**stap 3 || server** // builden en live tonen // in de terminal

```js
npm run start
```


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
