export default function(data){
    for (let key in data) {
        // console.log(data)
        if (data[key] === '#NULL!' || data[key] === "") {
            delete data[key]

        }
    }
}