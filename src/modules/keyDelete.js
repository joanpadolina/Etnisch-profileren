export default function testing(results) {
    results.forEach(data => {
        for (let key in data) {
            if (key === "IPadres" || key === "datumafname" || key === "duur_invullen") {
                delete data[key]
            }
        }

    })



}