(function () {
    'use strict';

    function testing(results) {
        results.forEach(data => {
            for (let key in data) {
                if (key === "IPadres" || key === "datumafname" || key === "duur_invullen") {
                    delete data[key];
                    console.log(data);
                }
            }

        });



    }

    function removeNull(data){
        for (let key in data) {
            // console.log(data)
            if (data[key] === '#NULL!' || data[key] === "") {
                delete data[key];

            }
        }
    }

    function newData () {
        console.log('hoi');

        let results = fetch('../src/dataruw.json')
            .then(res => res.json())
            .then(results => {
                let resultsMapping = results;

                return resultsMapping
            }).then(resultsMapping => {
                resultsMapping.map(data => {
                    removeNull(data);
                });
            testing(resultsMapping);
            }

            );
    return results
    }

    newData();

}());
