// import newData from './modules/newData';
import keyDelete from './modules/keyDelete.js'
import removeNull from './modules/removeNull.js'
import pyramidBuilder from './modules/popPyramid2.js'
import {addKey} from './modules/mergeBackgroud.js'




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

                })
            keyDelete(resultsMapping)
            addKey(resultsMapping)
            console.log(resultsMapping)
            pyramidBuilder(results)
        })
    return results
}

ageGender()

