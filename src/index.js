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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[day];
}

let todaysDate = document.querySelector("#date-today");
todaysDate.innerHTML = formatDate(new Date());

//uppercase first letter
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

//show week forecast
function showForecast(response) {
  let weekForecast = response.data.daily;
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = "<div class='row'>";

  var mins = [];
  var maxs = [];
  var days = [];

  weekForecast.forEach(function (forecastDay, index) {
    if (index < 7 && index > 0) {
      forecastHTML += `
                      <div class="col-2 text-center">
                        <div class="forecast-dates lead">${formatDay(
                          forecastDay.dt
                        )}</div>
                        <img
                          src="http://openweathermap.org/img/wn/${
                            forecastDay.weather[0].icon
                          }@2x.png"
                          alt=""
                          width="60"
                        />
                        <div class="weather-forecast-temperatures">
                          <span class="forecast-temp-max font-weight-bold"><b> ${Math.round(
                            forecastDay.temp.max
                          )}° </b></span>
                          <span class="forecast-temp-min text-muted"> ${Math.round(
                            forecastDay.temp.min
                          )}° </span>
                        </div>
                        <div class="forecast-desc small font-weight-light font-italic">
                        <i>${forecastDay.weather[0].main}</i>
                        </div>
                      </div>        
                    `;
      mins.push(`${Math.round(forecastDay.temp.min)}`);
      maxs.push(`${Math.round(forecastDay.temp.max)}`);
      days.push(`${formatDay(forecastDay.dt)}`);
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;

  console.log(mins);
  console.log(maxs);
  console.log(days);

  function drawChart() {
    var data = google.visualization.arrayToDataTable([
      ["", "min(°C)", "max(°C)"],
      [days[0], Number(mins[0]), Number(maxs[0])],
      [days[1], Number(mins[1]), Number(maxs[1])],
      [days[2], Number(mins[2]), Number(maxs[2])],
      [days[3], Number(mins[3]), Number(maxs[3])],
      [days[4], Number(mins[4]), Number(maxs[4])],
      [days[5], Number(mins[5]), Number(maxs[5])],
    ]);

    var options = {
      curveType: "function",
      colors: ["#66b3ff", "red"],
      lineWidth: 2,
      pointSize: 8,
      pointShape: "star",
      chartArea: { width: "100%" },
      width: "100%",
      legend: "top",
      annotations: { column_id: { style: "line" } },
    };

    var chart = new google.visualization.LineChart(
      document.getElementById("myChart")
    );

    chart.draw(data, options);
  }

  google.charts.load("current", { packages: ["corechart"] });
  google.charts.setOnLoadCallback(drawChart);
}

//get coordinates
//function getForecast(coordinates) {
 // console.log(coordinates);
  //let apiKey = "96ad27349a64ea1dcdfbe6f4d458c085";
  //let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  //console.log(apiUrl);
  //axios.get(apiUrl).then(showForecast);
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

  getForecast(response.data.coord);
  //showForecast();
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
  //let apiKey = "96ad27349a64ea1dcdfbe6f4d458c085";
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
