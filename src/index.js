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
    "Saturday",
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
    "December",
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
  let conversionButton = document.querySelector("a#convert");
  conversionButton.innerHTML = "Get temperature in °F";
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

function tempNow(event) {
  event.preventDefault();
  let city = "Antwerp";
  let apiKey = "96ad27349a64ea1dcdfbe6f4d458c085";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(url).then(getTemp);
}

document.addEventListener("DOMContentLoaded", tempNow);

//Bonus Feature
function convertTemp(event) {
  event.preventDefault();
  let showTemp = document.querySelector("#temp");
  let conversionButton = document.querySelector("a#convert");

  if (conversionButton.innerHTML.includes("°F")) {
    //showTemp.innerHTML = "63°F";
    //console.log("celsius");
    let cels = Number(showTemp.innerHTML.split("°")[0]);
    //console.log(cels);
    celsToFar = (cels * 9) / 5 + 32;
    console.log(`${cels}°C is ${celsToFar}°F`);
    conversionButton.innerHTML = "Get temperature in °C";
    showTemp.innerHTML = `${celsToFar}°F`;
  } else {
    //console.log("farenheit");
    let far = Number(showTemp.innerHTML.split("°")[0]);
    //console.log(far + 1);
    farToCels = ((far - 32) * 5) / 9;
    console.log(`${far}°F is ${farToCels}°C`);
    conversionButton.innerHTML = "Get temperature in °F";
    showTemp.innerHTML = `${farToCels}°C`;
  }
}

let clickButton = document.querySelector("a#convert");
clickButton.addEventListener("click", convertTemp);
