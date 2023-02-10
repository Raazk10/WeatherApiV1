export default function displayWeather(data) {
  // query selector
  const card = document.querySelector(".main__card");

  const description = document.querySelector(
    ".main__card-text--weatherdescription"
  );
  const temperature = document.querySelector(".main__card-text--temperature");
  const windSpeed = document.querySelector(".main__card-text--windspeed");
  const cityName = document.querySelector(".main__card-title--city");
  const localTime = document.querySelector(".main__card-text--localtime");
  const icon = document.querySelector(".main__icon");
  const searchCityButton = document.querySelector(".header__search-button");
  const recentSearchList = document.querySelector(
    ".aside__recent-searches-list"
  );

  const searchedCity = data.location.name;
  card.classList.remove("main__card--visible");

  const newSearch = `<li id="${searchedCity}">${searchedCity} <button class="remove-button">x</button></li>`;
  recentSearchList.insertAdjacentHTML("afterbegin", newSearch);

  cityName.textContent = data.location.name;
  description.textContent = data.current.condition.text;
  icon.innerHTML = `<img src="${data.current.condition.icon}" alt="${data.current.condition.text}">`;
  temperature.textContent = data.current.temp_c + "°C";
  windSpeed.textContent = "Wind Speed: " + data.current.wind_kph + " kph";
  localTime.textContent = "Local Time: " + data.location.localtime;
}
