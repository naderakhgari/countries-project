const countrieContainer = document.querySelector(".countries");
const selectRegion = document.querySelector(".selectRegion");
const searchCountrie = document.querySelector(".searchCountrie");
let homeIcon = document.querySelector(".homeIcon");
homeIcon.style.display = "none";
let allCountries;

fetch("https://restcountries.eu/rest/v2/all")
.then(Response => Response.json())
.then(countries => {
    allCountries = countries;
    showCountries(allCountries);
    showCountriesByRegion(allCountries);
})
function backToIndex(){
    showCountries(allCountries);
}

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
            <div class="countrie lg-col-11" onclick="showContrie(${countrie.callingCodes})" id="${countrie.numericCode }">
            <h4 class="countrieName lg-col-12">${countrie.name}</h4>
            <img src="${countrie.flag}" class=" flag lg-col-8">
            </div>
        </div>`
    })
    showSearchedCountrie(countrieList);
}

var selectedCountrie ={};

function showBorderCountrie(border){
    selectedCountrie = allCountries.find(countrie => countrie.alpha3Code == border.id);
    showContrieDetails(selectedCountrie);
}

function showContrie(countrieId){
    selectedCountrie = allCountries.find(countrie => countrie.callingCodes == countrieId);
    showContrieDetails(selectedCountrie);
}

function showContrieDetails(countrie){
        homeIcon.style.display = "block";
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
        let borders = document.querySelector(".borders");
        countrie.borders.forEach(neighbor => {
        borders.innerHTML += `
        <li onclick="showBorderCountrie(${neighbor})" id="${neighbor}"><a href="#">${neighbor}</a></li>`
    })
}
