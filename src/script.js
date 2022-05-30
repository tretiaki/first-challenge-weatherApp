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

function search(city) {
  let apiKey = "ab1ed0621301801bfeccd71121482ee3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(function (response) {
    handleCity(response);
    handleTemperature(response);
    handleDetails(response);
  });
}

function searchForCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search").value.trim();
  search(city);
}
let form = document.querySelector("form");
form.addEventListener("submit", searchForCity);

function handleTemperature(response) {
  console.log(response.data);
  temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#currentDegree");
  temperatureElement.innerHTML = temperature;
}
function handleCity(response) {
  let city = response.data.name;
  console.log(city);
  let currentCity = document.querySelector(".city");
  currentCity.innerHTML = city;
}
function handleDetails(response) {
  console.log(response.data);
  let humidity = response.data.main.humidity;
  let currentHumidity = document.querySelector("#humidity");
  currentHumidity.innerHTML = `${humidity}%`;

  let feelsLike = Math.round(response.data.main.feels_like);
  let currentFeelsLike = document.querySelector("#feelsLike");
  currentFeelsLike.innerHTML = `${feelsLike}°`;

  let weather = response.data.weather[0].main;
  let weatherDescriptionElement = document.querySelector("#weatherdescription");
  weatherDescriptionElement.innerHTML = `${weather}`;

  let wind = Math.round(response.data.wind.speed);
  let windSpeed = document.querySelector("#wind");
  windSpeed.innerHTML = `${wind} km/h`;

  let min = Math.round(response.data.main.temp_min);
  let minTemperature = document.querySelector("#minTemp");
  minTemperature.innerHTML = `${min}°`;

  let max = Math.round(response.data.main.temp_max);
  let maxTemperature = document.querySelector("#maxTemp");
  maxTemperature.innerHTML = `${max}°`;
}
search("Kyiv");
