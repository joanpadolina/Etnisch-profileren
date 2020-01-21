export   function filter99(data) {
    data = data.filter(d => d.key !== "99999" && d.key !== "Geen antwoord")
    let total = data.reduce((a, b) => a + b.value, 0)
    let percentage = data.map(d => {
      d.percentage = Math.round(d.value * 100 / total)
    })
    data.forEach(d => d.total = total)
    return data
  }