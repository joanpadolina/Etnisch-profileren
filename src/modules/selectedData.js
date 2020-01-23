export function getPercentage(data, selectedOption) {
    data = data.filter(row => {
        if (row.stellingTerecht == selectedOption || row.totstand == selectedOption || row.stellingachtergrond == selectedOption) {
            return row
        }
    })

    data = d3.nest()
        .key(d => d.cijfer)
        .rollup(leaves => leaves.length)
        .entries(data)

    let total = data.reduce((prev, cur) => prev + cur.value, 0)
    data.forEach(d => d.total = total);
    let percentage = data.map(d => d.percentage = Math.round(d.value / total * 100));
    data.forEach(d => d.categorie = selectedOption)
    data.sort((a, b) => a.key - b.key)
    data = data.filter(d => d.key !== "99999")

    return data
}