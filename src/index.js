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

//show week forecast
function showForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = "<div class='row'>";
  let days = ["Fri", "Sat", "Sun", "Mon", "Tue", "Wed"];

  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
                      <div class="col-2">
                        <div class="forecast-dates">${day}</div>
                        <img
                          src="http://openweathermap.org/img/wn/50d@2x.png"
                          alt=""
                          width="60"
                        />
                        <div class="weather-forecast-temperatures">
                          <span class="forecast-temp-max"> 18° </span>
                          <span class="forecast-temp-min"> 12° </span>
                        </div>
                      </div>        
                    `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

//Fetch temp of location
function getTemp(response) {
  let cityTemp = document.querySelector("#temp");
  let temperature = Math.round(response.data.main.temp);
  cityTemp.innerHTML = `${temperature}°C`;
  let conversionButton = document.querySelector("a#convert");
  conversionButton.innerHTML = "Get temperature in °F";

  let description = document.querySelector("#description");
  let humidity = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#windSpeed");
  let iconElement = document.querySelector("#icon");

  description.innerHTML = capitalizeFirstLetter(
    response.data.weather[0].description
  );
  console.log(response);
  humidity.innerHTML = response.data.main.humidity;
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  showForecast();
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
    celsToFar = Math.round((cels * 9) / 5 + 32);
    console.log(`${cels}°C is ${celsToFar}°F`);
    conversionButton.innerHTML = "Get temperature in °C";
    showTemp.innerHTML = `${celsToFar}°F`;
  } else {
    //console.log("farenheit");
    let far = Number(showTemp.innerHTML.split("°")[0]);
    //console.log(far + 1);
    farToCels = Math.round(((far - 32) * 5) / 9);
    console.log(`${far}°F is ${farToCels}°C`);
    conversionButton.innerHTML = "Get temperature in °F";
    showTemp.innerHTML = `${farToCels}°C`;
  }
}

let clickButton = document.querySelector("a#convert");
clickButton.addEventListener("click", convertTemp);
