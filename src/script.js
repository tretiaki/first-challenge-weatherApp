let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let min = now.getMinutes();
if (min < 10) {
  min = `0${min}`;
}

let date = document.querySelector("#currentTime");

date.innerHTML = `${day} ${hours}:${min}`;

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

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
<div class="card">
<div class="card-body">
  <h5 class="card-title weather-forecast-day">${formatDay(forecastDay.dt)}</h5>
  <img
    src="image/${forecastDay.weather[0].icon}.svg"
    
    class="src emojis"
  />
  <p class="card-text">
    <span class="temperature-min">${Math.round(forecastDay.temp.min)}°</span>
    <span class="temperature-max">${Math.round(forecastDay.temp.max)}°</span>
  </p>
</div>
</div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function handleForecast(coordinates) {
  let apiKey = "ab1ed0621301801bfeccd71121482ee3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}
function search(city) {
  let apiKey = "ab1ed0621301801bfeccd71121482ee3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(function (response) {
    handleCity(response);
    handleTemperature(response);
    handleDetails(response);
    handleForecast(response.data.coord);
  });
}

function searchLocation(position) {
  let apiKey = "ab1ed0621301801bfeccd71121482ee3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(function (response) {
    handleCity(response);
    handleTemperature(response);
    handleDetails(response);
    handleForecast(response.data.coord);
  });
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
let currentLocationButton = document.querySelector("#button");
currentLocationButton.addEventListener("click", getCurrentLocation);

function searchForCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search").value.trim();
  search(city);
}
let form = document.querySelector("form");
form.addEventListener("submit", searchForCity);

function handleTemperature(response) {
  celsiusTemp = response.data.main.temp;
  temperature = Math.round(celsiusTemp);
  let temperatureElement = document.querySelector("#currentDegree");
  temperatureElement.innerHTML = temperature;
}

function handleCity(response) {
  let city = response.data.name;

  let currentCity = document.querySelector(".city");
  currentCity.innerHTML = city;
}

function handleDetails(response) {
  let humidity = response.data.main.humidity;
  let currentHumidity = document.querySelector("#humidity");
  currentHumidity.innerHTML = ` ${humidity}%`;

  let feelsLike = Math.round(response.data.main.feels_like);
  let currentFeelsLike = document.querySelector("#feelsLike");
  currentFeelsLike.innerHTML = `${feelsLike}°`;

  let weather = response.data.weather[0].main;
  let weatherDescriptionElement = document.querySelector("#weatherdescription");
  weatherDescriptionElement.innerHTML = `${weather}`;

  let wind = Math.round(response.data.wind.speed);
  let windSpeed = document.querySelector("#wind");
  windSpeed.innerHTML = ` ${wind} km/h`;

  ///let min = Math.round(response.data.main.temp_min);
  /// let minTemperature = document.querySelector("#minTemp");
  ///minTemperature.innerHTML = `${min}°`;

  ///let max = Math.round(response.data.main.temp_max);
  ///let maxTemperature = document.querySelector("#maxTemp");
  ///maxTemperature.innerHTML = `${max}°`;

  let sunriseElement = document.querySelector("#sunrise");
  let sunsetElement = document.querySelector("#sunset");
  let sunriseTime = new Date(response.data.sys.sunrise * 1000);
  let sunsetTime = new Date(response.data.sys.sunset * 1000);
  sunriseElement.innerHTML = ` ${sunriseTime.getHours()}:${String(
    sunriseTime.getMinutes()
  ).padStart(2, "0")}`;
  sunsetElement.innerHTML = ` ${sunsetTime.getHours()}:${String(
    sunsetTime.getMinutes()
  ).padStart(2, "0")}`;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", `image/${response.data.weather[0].icon}.svg`);
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function handleFahrenheitTemp(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureElement = document.querySelector("#currentDegree");
  let fahrenheit = Math.round((celsiusTemp * 9) / 5 + 32);

  temperatureElement.innerHTML = fahrenheit;
}
let celsiusTemp = null;
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", handleFahrenheitTemp);

function handleCelsiusTemp(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#currentDegree");
  temperatureElement.innerHTML = Math.round(celsiusTemp);
}
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", handleCelsiusTemp);

search("Kyiv");
///
///let dHoursR = hours(response.data.sys.sunrise);
/// let dMinR = minutes(response.data.sys.sunrise);
///let dHoursS = hours(response.data.sys.sunset);
/// let dMinS = minutes(response.data.sys.sunset);
///let sunriseElement = document.querySelector("#minTemp");
///let sunsetElement = document.querySelector("#maxTemp");
/// sunriseElement.innerHTML = `${dHoursR}:${dMinR}`;
/// sunsetElement.innerHTML = `${dHoursS}:${dMinS}`;
