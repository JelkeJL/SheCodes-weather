//Feature 1
function formatDate() {
  let today = new Date();

  let date = today.getDate();
  let hours = today.getHours();
  let minutes = today.getMinutes();
  let year = today.getFullYear();

  let weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = weekdays[today.getDay()];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  let month = months[today.getMonth()];
  //console.log(minutes.toString().length);
  if (minutes.toString().length == 2) {
    return `${day}, ${hours}:${minutes}`;
  } else {
    return `${day}, ${hours}:0${minutes}`;
  }
}
//console.log(formatDate(new Date()));

let todaysDate = document.querySelector("#date-today");
todaysDate.innerHTML = formatDate(new Date());

//uppercase first letter
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

//Fetch temp of location
function getTemp(response) {
  let cityTemp = document.querySelector("#temp");
  let temperature = Math.round(response.data.main.temp);
  cityTemp.innerHTML = `${temperature}°C`;
}

//Feature 2
function submitCity(event) {
  event.preventDefault();
  let chosenLocation = document.querySelector("#city-input");
  //console.log(chosenLocation.value);
  let cityTitle = document.querySelector("h1#current-city");
  cityTitle.innerHTML = capitalizeFirstLetter(chosenLocation.value);

  let city = `${chosenLocation.value}`;
  let apiKey = "96ad27349a64ea1dcdfbe6f4d458c085";
  //let location = document.querySelector("h1#current-city")
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(url).then(getTemp);
}

let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", submitCity);

navigator.geolocation.getCurrentPosition(getPosition);

function getPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "96ad27349a64ea1dcdfbe6f4d458c085";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showCurrentTemperature);
}

function showCurrentTemperature(response) {
  let cityTemp = document.querySelector("#temp");
  let temperature = Math.round(response.data.main.temp);
  cityTemp.innerHTML = `${temperature}°C`;
}

function currentCity(event) {
  event.preventDefault();
  let cityTitle = document.querySelector("h1#current-city");
  cityTitle.innerHTML = navigator.geolocation.getCurrentPosition(getPosition);
  let whereIAm = document.querySelector("a#here");
}

let hereClick = document.querySelector("a#here");
hereClick.addEventListener("click", showCurrentTemperature);

//!!!! note: i received an email that my api key was blocked because i submitted it too often per minute :/

//navigator.geolocation.getCurrentPosition(getPosition);

//Bonus Feature >> worked in the previous assignment but currently do not have the time to update it to include the api challenges
//function convertTemp(event) {
//event.preventDefault();
//let showTemp = document.querySelector("#temp");
//let conversionButton = document.querySelector("a#convert");

//if (conversionButton.innerHTML.includes("°F")) {
//showTemp.innerHTML = "63°F";
//conversionButton.innerHTML = "Get temperature in °C";
//} else {
//showTemp.innerHTML = "17°C";
//conversionButton.innerHTML = "Get temperature in °F";
//}
//}

//let clickButton = document.querySelector("a#convert");
//clickButton.addEventListener("click", convertTemp);
