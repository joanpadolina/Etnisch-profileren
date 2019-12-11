import keyDelete from './keyDelete.js'
import removeNull from './removeNull.js'

export default function () {
    console.log('hoi')

    let results = fetch('../src/dataruw.json')
        .then(res => res.json())
        .then(results => {
            let resultsMapping = results

            return resultsMapping
        }).then(resultsMapping => {
            resultsMapping.map(data => {
                removeNull(data)
            })
        keyDelete(resultsMapping)
        }

        )
return results
}