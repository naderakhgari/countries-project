fetch("https://restcountries.eu/rest/v2/all")
.then(Response => {
    return Response.json();
})
.then(data => {
    console.log(data);
    // console.log(data.region)
    data.forEach(d => console.log(d.region))
})
