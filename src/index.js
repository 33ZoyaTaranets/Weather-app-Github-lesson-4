//HW 4 feature 1
let currentTime = new Date();
let loadDay = document.querySelector(".current-day");
let daysF = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = daysF[currentTime.getDay()];
let date = currentTime.getDate();
let hour = currentTime.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = currentTime.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
loadDay.innerHTML = `${day} ${date}, ${hour}:${minutes}`;

//HW 4 feature 2

//HW 4 feature 3
//function showUnitC(event) {
//  event.preventDefault();
//  let currentTemperatureC = document.querySelector("#tempr");
//  currentTemperatureC.innerHTML = 29;
//}
//let celsiusTempr = document.querySelector("#celcius-link");
//celsiusTempr.addEventListener("click", showUnitC);

//function showUnitF(event) {
//  event.preventDefault();
//  let currentTemperatureF = document.querySelector("#tempr");
//  currentTemperatureF.innerHTML = Math.round((29 * 9) / 5 + 32);
//}
///let fahrenheitTempr = document.querySelector("#fahrenheit-link");
//fahrenheitTempr.addEventListener("click", showUnitF);

//HW 5-1

function searchCity(city) {
  let apiKey = `acfa3d9add7c7b0dbbb8af556ed317bf`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

let search = document.querySelector("#search-city");
search.addEventListener("submit", handleSubmit);

function showWeather(response) {
  console.log(response);

  let city = response.data.name;
  let country = response.data.sys.country;
  let dataCity = document.querySelector("#city");
  dataCity.innerHTML = `${city}, ${country}`;

  let temperatureElement = document.querySelector("#tempr");
  celsiusTempr = response.data.main.temp;
  temperatureElement.innerHTML = Math.round(celsiusTempr);

  let dataHumidity = document.querySelector("#data-humidity");
  let humidity = Math.round(response.data.main.humidity);
  dataHumidity.innerHTML = `${humidity}`;

  let dataWind = document.querySelector("#data-wind");
  let wind = Math.round(response.data.wind.speed);
  dataWind.innerHTML = `${wind}`;

  let dataImg = document.querySelector("#data-img");
  let img = response.data.weather[0].main;
  dataImg.innerHTML = `${img}`;

  let dataIcon = document.querySelector("#icon");
  dataIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  dataIcon.setAttribute("alt", response.data.weather[0].description);
}

function retrievePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "acfa3d9add7c7b0dbbb8af556ed317bf";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

function navigatorLoc(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let currentCity = document.querySelector("#current-location-button");
currentCity.addEventListener("click", navigatorLoc);

function showFahrenheitTempr(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#tempr");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTempr = (celsiusTempr * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTempr);
}

function showCelsiusTempr(event) {
  event.preventDefault();

  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#tempr");
  temperatureElement.innerHTML = Math.round(celsiusTempr);
}

let celsiusTempr = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTempr);

let celsiusLink = document.querySelector("#celcius-link");
celsiusLink.addEventListener("click", showCelsiusTempr);

searchCity("Kyiv");
