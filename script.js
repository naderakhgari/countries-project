const counttriContainer = document.querySelector(".countries");
fetch("https://restcountries.eu/rest/v2/all")
.then(Response => {
    return Response.json();
})
.then(countries => {
    console.log(countries);
   
    countries.forEach(countrie => {
        counttriContainer.innerHTML += `
        <div class="countrie lg-col-6">
            <h2 class="countrieName lg-col-10">${countrie.name}</h2>
            <img src="${countrie.flag}" class=" flag lg-col-4">
        </div>`
    })
})
