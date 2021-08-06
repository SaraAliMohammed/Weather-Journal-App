/* Global Variables */

//sara_weatherData	
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
const apiKey = "7c9303625e4dd0e0ff7920927734e747";
let zipCode, apiURL;

const inpZipCode = document.getElementById('zip');
const spanZipCodeAlert = document.getElementById('checkZipCode');

// handle click event on generate button
document.getElementById('generate').addEventListener('click', async function(){
    if(inpZipCode.value !== "")
    {   
        zipCode = inpZipCode.value;
        apiURL = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}&units=metric`;
        if(spanZipCodeAlert.style.display == "block")
            spanZipCodeAlert.style.display="none";
        alert('d');
        const response = await fetch(apiURL);
        try{
            const allData = await response.json();
            console.log(allData);
        }
        catch(error){
            console.log("error", error);
        }
        
    } 
    else{
        spanZipCodeAlert.style.display = "block";
    }
});

//fetch(apiURL, )