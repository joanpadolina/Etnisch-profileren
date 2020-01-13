// import newData from './modules/newData';
// import {
//     removeNull
// } from './modules/removeNull.js'
// import pyramidBuilder from './modules/popPyramid2.js'

import myVisualChart from './modules/bubblechart.js'
import barChart from './modules/barchart.js'
import secondBubble from './modules/secondbubble.js'


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

                })
            // testNest(newDataResults)
            myVisualChart(newDataResults)
            secondBubble(newDataResults)
            // barChart(newDataResults)

        })

}

function testNest(newDataResults) {
    let backgroundNest = d3.nest()
        .key(d => d.achtergrond)
        .rollup(leaves => leaves.length)
        .entries(newDataResults)
    console.log(backgroundNest)

   let sumBackground = backgroundNest.map(d => {
        if (d.key === "Surinaams" || d.key === "Marokkaans" || d.key === "Turks") {
            let allValue = d
            console.log(allValue)
        }
    })

    let newMap = backgroundNest
    .map(d =>{
        return{
            nederlandseNl : d.key === "Nederlands",
            nietwesters: d.key === "Surinaams" || d.key === "Marokkaans" || d.key === "Turks",
            westers: d.key === "Westers"
        }
    })
    console.log(newMap)
}

// testNest()
newData()