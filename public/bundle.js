(function () {
    'use strict';

    // import newData from './modules/newData';


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
                    });
                //    bubbleChart(resultsMapping)
            });
        // .then(resultsMapping => {
        // console.log(resultsMapping)
        //    let removeWithRegex = resultsMapping
        //         .forEach(d => {
        //             //https://stackoverflow.com/questions/11275607/remove-entire-word-from-string-if-it-contains-numeric-value
        //             let regex = /\b(\w*NUL\w*)\b/g
        //             let replaceNull = d.background
        //             return replaceNull.replace(regex , '')
        //         })

        // })
    }


    ageGender();

}());
