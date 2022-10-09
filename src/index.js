function formatDate(timestamp) {
  let currentTime = new Date(timestamp);
  let hour = currentTime.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = currentTime.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
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
  return `${day} ${date}, ${hour}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function showForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="forecast-day">${formatDay(forecastDay.dt)}</div>
          <img
                  src="http://openweathermap.org/img/wn/${
                    forecastDay.weather[0].icon
                  }@2x.png"
                  alt=""
                  width="42"
          />
          <div class="forecast-temperatures">
            <span class="forecast-temp-max">${Math.round(
              forecastDay.temp.max
            )} °C</span>
            <span class="forecast-temp-min">${Math.round(
              forecastDay.temp.min
            )} °C</span>
          </div>
      </div>
    
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = `a43564c91a6c605aeb564c9ed02e3858`;
  let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  console.log(apiUrl);
  axios.get(apiUrl).then(showForecast);
}

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
  console.log(response.data);

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

  let dataDate = document.querySelector(".current-day");
  dataDate.innerHTML = formatDate(response.data.dt * 1000);

  let dataIcon = document.querySelector("#icon");
  dataIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  dataIcon.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
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
