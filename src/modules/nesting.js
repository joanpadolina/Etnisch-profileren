export function contactNest(data) {
    let nest = d3.nest()
        .key(d => d.contact)
        .key(d => d.cijfer)
        .rollup(leaves => leaves.length)
        .entries(data)

    return nest
}

export function religieNesting(data) {
    let nest = d3.nest()
        .key(d => d.stellingachtergrond)
        .key(d => d.cijfer)
        .rollup(leaves => leaves.length)
        .entries(data)

    return nest
}

export function resultaatNesting(data){

    let nest = d3.nest()
    .key(d => d.stellingTerecht)
    .key(d => d.cijfer)
    .rollup(leaves => leaves.length)
    .entries(data)

    return nest
}

export function totstandNesting(data){

    let nest = d3.nest()
    .key(d => d.totstand)
    .key(d => d.cijfer)
    .rollup(leaves => leaves.length)
    .entries(data)

    return nest
}

export function valueAchtergrondNesting(data){

    let nest =  d3.nest()
    .key(d => d.achtergrond)
    .key(d => d.cijfer)
    .rollup(leaves => leaves.length)
    .entries(data)

    return nest
}