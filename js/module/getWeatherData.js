import fetchApi from "./fetchApi.js";
import displayWeather from "./displayWeather.js";
//import forecastWeather from "./forecastWeather.js";

export default function getWeatherData() {
  const submitButton = document.querySelector(".header__search-form");
  const searchInput = document.querySelector(".header__search-input");
  submitButton.addEventListener("click", async (e) => {  // gå til andre side
    e.preventDefault();

    const city = searchInput.value;
    const data = await fetchApi(city);

    displayWeather(data);
    searchInput.value = "";
    //forecast weather
    // forecastWeather(data);
  });
}
