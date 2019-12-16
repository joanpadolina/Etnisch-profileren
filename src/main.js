// import newData from './modules/newData';
import keyDelete from './modules/keyDelete.js'
import removeNull from './modules/removeNull.js'
import pyramidBuilder from './modules/popPyramid2.js'




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
            // console.log(resultsMapping)
            pyramidBuilder(results)
        })
    return results
}
ageGender()



// function etnicData() {
//     // console.log('hoi')

//     let results = fetch('../src/dataruw.json')
//         .then(res => res.json())
//         .then(results => {
//             let resultsMapping = results
//                 .map(data => {
//                     removeNull(data)
//                 })
//             keyDelete(resultsMapping)
//             pyramidBuilder(results)
//         })
//         return results
// }
// etnicData()


// function visualData(data) {
//     d3.select("body").append("h1").text("Hello, world!");
//     console.log(data)
//     let newNest = d3.nest()
//         .key(d => d.Geslacht)
//         .key(d => d.Leeftijd)
//         .entries(data)
//     console.log(newNest)


// }


// function pyramidBuilder(data) {

//     let newNest = d3.nest()
//         .key(d => d.Leeftijd)
//         .key(d => d.Geslacht)
//         .rollup(d=> d.length)
//         .entries(data)


//     // let age = newNest.map(d => d.key)
//     // let genderTotal = newNest.map(d => d.values)
//     // let gender = newNest.map(d => d.values[0].key)
//     // let totalAge = newNest.map(d => d.values[0].value)
//     console.log(newNest)

    


// }
// pyramidBuilder()