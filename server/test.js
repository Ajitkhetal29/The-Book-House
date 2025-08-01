
async function updateQuote() {
await fetch("https://zenquotes.io/api/random").then((response)=>response.json()).then((data)=>console.log(data[0].q)).catch(err => console.log(err))

}

updateQuote();
