
import myVisualChart from './modules/bubblechart.js'
import secondBubble from './modules/secondbubble.js'

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
            myVisualChart(newDataResults)
            secondBubble(newDataResults)

        })

}


newData()