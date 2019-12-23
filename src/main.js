// import newData from './modules/newData';
import keyDelete from './modules/keyDelete.js'
import {
    removeNull
} from './modules/removeNull.js'
// import pyramidBuilder from './modules/popPyramid2.js'
import bubbleChart from './modules/bubblechart.js'
import {
    addKey
} from './modules/mergeBackgroud.js'


function ageGender() {
    let results = fetch('../src/dataruw.json')
        .then(res => res.json())
        .then(results => {
            let resultsMapping = results
                .map(data => {
                    return {
                        id: data.response_ID,
                        contact: data.Contact_gehad,
                        terecht: data.stel_terecht,
                        totstand: data.Totstand,
                        leeftijd: data.Leeftijd,
                        geslacht: data.Geslacht,
                        cijfer: data.rapportcijfer,
                        achtergrond: data.achtergrond,
                        aanleiding_contact: data.aanleiding_contact,
                        resultaat_contact: data.contact_gevolg,
                        stelling_buitenlands: data.stel_buitenlandgeboren


                    }
                })
            //    bubbleChart(resultsMapping)
        })
}


ageGender()