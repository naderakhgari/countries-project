const countrieContainer = document.querySelector(".countries");
const selectRegion = document.querySelector(".selectRegion");
const searchCountrie = document.querySelector(".searchCountrie");
let allCountries;
fetch("https://restcountries.eu/rest/v2/all")
.then(Response => {
    return Response.json();
})
.then(countries => {
    console.log(countries);
    allCountries = countries;
   showCountries(countries);
   showCountriesByRegion(countries);
   showSearchedCountrie(countries);
//    addRegion(countries)
})
// function addRegion(countrieList){
//     selectRegion.innerHTML = 

// }

function showSearchedCountrie(countrieList){
    searchCountrie.addEventListener('input', ()=> {
        let searchedCountrie = countrieList.filter(countrie => {
            if(countrie.name.toUpperCase().indexOf(searchCountrie.value.toUpperCase()) > -1){
                return true
            } else{
                return false;
            }
        })      
        showCountries(searchedCountrie)
    })
}
function showCountriesByRegion(countrieList){
    var selectedCountriesByRegion = []
    selectRegion.addEventListener('change', ()=>{
        if (selectRegion.value == "All Region"){
            showCountries(countrieList)
        }else {
            selectedCountriesByRegion = countrieList.filter(countrie =>{
                if(selectRegion.value == countrie.region){
                    return true;
                } else{
                    return false;
                }
            })
            showCountries(selectedCountriesByRegion)
        }
   })
}

function showCountries(countrieList){
    countrieContainer.innerHTML = "";
    countrieList.forEach(countrie => {
        
        countrieContainer.innerHTML += `
        <div class="countrieMargin lg-col-2">
            <div class="countrie lg-col-11" onclick="showContrie(${countrie.callingCodes})" id="${countrie.numericCode}">
                <h4 class="countrieName lg-col-12">${countrie.name}</h4>
                <img src="${countrie.flag}" class=" flag lg-col-8">
            </div>
        </div>
        `
    })
}
var selectedCountrie ={};
function showContrie(countrieId){
    selectedCountrie = allCountries.filter(countrie => countrie.callingCodes == countrieId);
    showContrieDetails(selectedCountrie);
    console.log(selectedCountrie);
   

}
// function showContrieses(alpha3Code){
//     console.log(alpha3Code)
//     // selectedCountrie = allCountries.filter(countrie => countrie.alpha3Code === alpha3Code);
//     // showContrieDetails(selectedCountrie);

// }

function showContrieDetails(countries){
    countries.forEach(countrie =>{
    countrieContainer.innerHTML = `
        <div class="countrie lg-col-11">
            <h1 class="countrieName lg-col-12">${countrie.name}<h3>${countrie.capital}</h3></h1>
            <div class="countrieDetails">
                <ul class="borders"><h3>Borders:</h3></ul>
                <img src="${countrie.flag}" class=" flag lg-col-4">
                <div>
                    <p>Population: ${countrie.population}</p>
                    <p>Language: ${countrie.languages[0].name}</p>
                    <p>Currencie: ${countrie.currencies[0].name}</p>
                    <p>Region: ${countrie.region}</p>
                    <p>Timezone: ${countrie.timezones}</p>
                    <p>Alpha3Code: ${countrie.alpha3Code}</p>
                </div>
            </div>
        </div> `
        // selectedCountrie.style.backgroundImage = `url(${countrie.flag})`
        let borders = document.querySelector(".borders");
    countrie.borders.forEach(neighbor => {
        borders.innerHTML += `
        <li onclick="showContrie(${neighbor})"><a>${neighbor}</a></li>`
    })
    
})

    
    
}
