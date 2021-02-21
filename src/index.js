function currentDate() {
  let now = new Date();
  let mainDate = document.querySelector("#todays-date");

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[now.getDay()];
  let hours = now.getHours();
  let minutes = now.getMinutes();

  mainDate.innerHTML = `${day} ${hours}:${minutes}`;
}
currentDate();

function changeCity(event) {
  event.preventDefault();
  let input = document.querySelector("#search-input");
  let city = document.querySelector("#main-city");
  city.innerHTML = input.value;
  let apiKey = "47cade4c3ac315c8cba1fb1e18be0d29";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(showTemp);
  axios.get(apiURL).then(locationTemp);
}

function showTemp(response) {
  let temp = document.querySelector("#temperature");
  let currentTemp = Math.round(response.data.main.temp);
  temp.innerHTML = `${currentTemp} °C`;
}

function locationTemp(response) {
  let currentTemp = Math.round(response.data.main.temp);
  let mainTemp = document.querySelector("#temperature");
  let h1 = document.querySelector("#main-city");
  let description = document.querySelector("#description"); 
  let humidity = document.querySelector("#humidity"); 
  let wind = document.querySelector ("#wind"); 
  let icon = document.querySelector ("#icon"); 
  mainTemp.innerHTML = `${currentTemp} °C`;
  h1.innerHTML = response.data.name;
  description.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = response.data.main.humidity; 
  wind.innerHTML = Math.round(response.data.wind.speed); 
  icon.setAttribute ("class", `http://openweathermap.org/img/wn/${respond.data.weather[0].icon}.png`);
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "47cade4c3ac315c8cba1fb1e18be0d29";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiURL).then(locationTemp);
}

function getPosition(event) {
  event.preventDefault();
}

navigator.geolocation.getCurrentPosition(showPosition);

let search = document.querySelector("form");
search.addEventListener("submit", changeCity);

let button = document.querySelector("button");
button.addEventListener("click", getPosition);