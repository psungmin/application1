const API_KEY = "506f9bf0667350f3658efbd93a04e5d7";
const WEATHER_API = "https://api.openweathermap.org/data/2.5/weather?";

// const weatherTemp = document.querySelector(".js-weather .weatherTemp__text");
const hotWeather = document.querySelector(".js-weather .hotWeather");
const warmWeather = document.querySelector(".js-weather .warmWeather");
const coldWeather = document.querySelector(".js-weather .coldWeather");
const weatherName = document.querySelector(".js-weather .weatherName__text");

function getWeather(coords) {
  fetch(
    `${WEATHER_API}lat=${coords.lat}&lon=${
      coords.lng
    }&appid=${API_KEY}&units=metric`
  )
    .then(response => response.json())
    .then(json => {
      const temperature = json.main.temp;
      const name = json.name;
      let parsed_temp = parseInt(temperature);

      weatherName.innerHTML = `${name}`;
      if(parsed_temp > 20) {
        hotWeather.innerHTML = `${Math.floor(temperature)}°`;
      } else if(parsed_temp <= 20 && parsed_temp > 0) {
        warmWeather.innerHTML =`${Math.floor(temperature)}°`;
      } else {
        coldWeather.innerHTML =`${Math.floor(temperature)}°`;
      };

    });
}

function handleGeoSuccess(position) {
  const lat = position.coords.latitude;
  const lng = position.coords.longitude;
  const coords = {
    lat,
    lng
  };
  localStorage.setItem("coords", JSON.stringify(coords));
  getWeather(coords);
}

function handleGeoFailure() {
  console.log("no location");
}

function loadWeather() {
  const currentCoords = localStorage.getItem("coords");
  if (currentCoords !== null) {
    const parsedCoords = JSON.parse(currentCoords);
    getWeather(parsedCoords);
    return;
  } else {
    navigator.geolocation.getCurrentPosition(
      handleGeoSuccess,
      handleGeoFailure
    );
  }
}

function init() {
  loadWeather();
}

init();