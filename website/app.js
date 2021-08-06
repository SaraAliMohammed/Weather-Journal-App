// Create a new date 
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

//Define global variables 
const baseURL = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = "7c9303625e4dd0e0ff7920927734e747";
let zipCode, apiURL, temperature, userFeelings;

const inpZipCode = document.getElementById('zip');
const spanZipCodeAlert = document.getElementById('checkZipCode');
const inpUserFeelings = document.getElementById('feelings');
const date = document.getElementById('date');
const temp = document.getElementById('temp');
const content = document.getElementById('content');

// handle click event on generate button by addEventListener
document.getElementById('generate').addEventListener('click', performClick);

//Async click callback function that get weather data from api 
function performClick(){
    //check that input zipCode is not empty
    if(inpZipCode.value !== "")
    {   
        zipCode = inpZipCode.value;
        userFeelings = inpUserFeelings.value;

        if(spanZipCodeAlert.style.display == "block")
            spanZipCodeAlert.style.display="none";

        //chaining async functions and update UI with weather data by city zip code
        getWetherDataFromApi(baseURL, zipCode, apiKey)
        .then(function(weatherDataFromApi){
            postWeatherData('/addWeatherData', {temperature: weatherDataFromApi.main.temp, date: newDate, userFeelings: userFeelings})
        })
        .then(function(){
            return getWeatherData('/all');
        }).then(function(data){
            updateWeatherUI(data);
        })  
    } 
    else{
        spanZipCodeAlert.style.display = "block";
    }
}

//get weather data from api
const getWetherDataFromApi = async (baseURL, zip, apiKey) =>{
    //Create url to api to get weather data by city zip code
    apiURL = `${baseURL}?zip=${zip}&appid=${apiKey}&units=metric`;
    //fetch weather data from api 
    const response = await fetch(apiURL);
    try{
        const allData = await response.json();
        return allData;
    }
    catch(error){
        console.log("error", error);
    }    
}

//Async Post data coming from api to server and add new entry 
const postWeatherData = async ( url = '', data = {})=>{
   
    const response = await fetch(url, {
        method: 'POST', 
        credentials: 'same-origin', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),    
      });

    try {
        const newWeatherData = await response.json();
        return newWeatherData;
    }catch(error) {
        console.log("error", error);
    }
}

//Async Get all weather data from server
const getWeatherData = async (url='') =>{ 
    const request = await fetch(url);
    try {
        const retrievedData = await request.json();
            return retrievedData;
    }
    catch(error) {
        console.log("error", error);
    }
  };


//Update weather UI with the data
function updateWeatherUI(data){
    date.innerHTML = "<span> Date: </span> " + data.date;
    temp.innerHTML = "<span> Temperature: </span> " + data.temperature;
    content.innerHTML = "<span> Feelings: </span> " + data.userFeelings;
}

