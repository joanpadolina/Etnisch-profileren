export function removeNull(data) {

    data.forEach(data => {
        for (let key in data) {
            if (data[key] === '#NULL!' ) {
                delete data[key]

            }
        }
    })
}