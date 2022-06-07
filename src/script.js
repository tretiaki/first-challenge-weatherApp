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
    handleIcon(response);
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
  celsiusTemp = response.data.main.temp;
  temperature = Math.round(celsiusTemp);
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

///try do do once more the problem probably is that it cannot find
///a city cause ur geo is a list of numbers not a name of the city

///function searchLocation(position) {
///let apiKey = "ab1ed0621301801bfeccd71121482ee3";
///let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

//// axios.get(apiUrl).then(search(position));
///}

///function getCurrentLocation(event) {
/// event.preventDefault();
/// navigator.geolocation.getCurrentPosition(searchLocation);
///}
////let currentLocationButton = document.querySelector("#button");
///currentLocationButton.addEventListener("click", getCurrentLocation);
function handleIcon(response) {
  let wIcon = document.querySelector("#icon");
  const { id } = response.data.weather[0];

  if (id == 800) {
    wIcon.setAttribute(
      "src",
      "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/clear-day.svg"
    );
  } else if (id >= 200 && id <= 232) {
    wIcon.setAttribute(
      "src",
      "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/thunderstorms.svg"
    );
  } else if (id >= 300 && id <= 321) {
    wIcon.setAttribute(
      "src",
      "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/overcast-day-drizzle.svg"
    );
  } else if (id >= 500 && id <= 531) {
    wIcon.setAttribute(
      "src",
      "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/rain.svg"
    );
  } else if (id >= 600 && id <= 622) {
    wIcon.setAttribute(
      "src",
      "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/overcast-day-hail.svg"
    );
  } else if (id >= 701 && id <= 781) {
    wIcon.setAttribute(
      "src",
      "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/haze.svg"
    );
  } else if (id >= 801 && id <= 804) {
    wIcon.setAttribute(
      "src",
      "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/cloudy.svg"
    );
  }
}

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
