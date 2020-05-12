const countrieContainer = document.querySelector(".countries");
const selectRegion = document.querySelector(".selectRegion");
const searchCountrie = document.querySelector(".searchCountrie");
const homeIcon = document.querySelector(".homeIcon");
const moonIcon = document.querySelector(".moonFormat");
const sunIcon = document.querySelector(".sunFormat");
const header = document.querySelector(".header")
const countrie = document.querySelector(".countrie");

sunIcon.style.display = "none"
homeIcon.style.display = "none";

fetch("https://restcountries.eu/rest/v2/all")
.then(Response => Response.json())
.then(countries => {
    allCountries = countries;
    showCountries(allCountries);
    showCountriesByRegion(allCountries);
})
.catc(error => Console.error(error));

function backToIndex(){
    showCountries(allCountries);
}

function sunFormat(){
    header.style.backgroundColor = "#dff9fb";
    sunIcon.style.display = "none";
    moonIcon.style.display = "block";
    document.body.style.backgroundColor = "#dff9fb";
    countrieContainer.style.backgroundColor = "#dff9fb";
    homeIcon.style.color = "#535c68";
}

function moonFormat(){
    header.style.backgroundColor = "#535c68";
    sunIcon.style.display = "block"
    moonIcon.style.display = "none"
    document.body.style.backgroundColor = "#535c68";
    countrieContainer.style.backgroundColor = "#535c68";
    homeIcon.style.color = "white";
    sunIcon.style.color = "white";
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
            showCountries(countrieList);
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
    homeIcon.style.display = "none";
    countrieContainer.innerHTML = "";
    searchCountrie.innerHTML = "";
    countrieList.forEach(countrie => {
        countrieContainer.innerHTML += `
        <div class="countrieMargin col-12 lg-col-2">
            <div class="countrie col-12 lg-col-11" onclick="showContrie(${countrie.callingCodes})" id="${countrie.numericCode }">
                <h4 class="countrieName col-10 lg-col-12">${countrie.name}</h4>
                <img src="${countrie.flag}" class=" flag col-10 lg-col-8">
            </div>
        </div>`
    })
    showSearchedCountrie(countrieList);
}

var selectedCountrie ={};

function showBorderCountrie(border){
    let borders = document.querySelector(`#${border.id}`)
    borders.style.cursor = "pointer";
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
        <div class="countrie col-12 lg-col-12">
            <h1 class="countrieName col-12 lg-col-12">${countrie.name}<h3>${countrie.capital}</h3></h1>
            <div class="countrieDetails col-12 lg-col-12">
                <div class="detail col-10 lg-col-3">
                    <p class="col-12 lg-col-12">Population: ${countrie.population}</p>
                    <p class="col-12 lg-col-12">Language: ${countrie.languages[0].name}</p>
                    <p class="col-12 lg-col-12">Currencie: ${countrie.currencies[0].name}</p>
                    <p class="col-12 lg-col-12">Region: ${countrie.region}</p>
                    <p class="col-12 lg-col-12">Timezone: ${countrie.timezones}</p>
                    <p class="col-12 lg-col-12">Alpha3Code: ${countrie.alpha3Code}</p>
                </div>
                <img src="${countrie.flag}" class="col-10 flag lg-col-3">
                <div class="col-10 lg-col-3">
                    <h3>Borders:</h3>
                    <div class="borders col-12"></div>
                </div>
                
            </div>
        </div> `
        let borders = document.querySelector(".borders");
        countrie.borders.forEach(neighbor => {
        borders.innerHTML += `
        <h5 onclick="showBorderCountrie(${neighbor})" id="${neighbor}" class="neighbor">${neighbor}</h5>`
    })
}
