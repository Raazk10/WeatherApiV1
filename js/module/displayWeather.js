export default function displayWeather(data) {
  // fetch the forecast day

  // Destructure data
  const { name: cityName, localtime: localTime } = data.location;
  const { text: description, icon } = data.current.condition;
  const {
    temp_c: temperature,
    wind_mph: windSpeed,
    feelslike_c: feel,
  } = data.current;

  // Query selectors
  const card = document.querySelector(".main__card");
  const cityNameEl = document.querySelector(".main__card-title--city");
  const descriptionEl = document.querySelector(
    ".main__card-text--weatherdescription"
  );
  const temperatureEl = document.querySelector(".main__card-text--temperature");
  const windSpeedEl = document.querySelector(".main__card-text--windspeed");
  const feelslikeEl = document.querySelector(".main__card-text--feelslike");
  const iconEl = document.querySelector(".main__icon");

  // Update weather information
  cityNameEl.textContent = cityName;
  descriptionEl.textContent = description;
  iconEl.innerHTML = `<img src="${icon}" alt="${description}">`;
  temperatureEl.textContent = `${temperature}°C`;
  feelslikeEl.textContent = `Feels Like: ${feel}`;
  windSpeedEl.textContent = `Wind Speed: ${windSpeed} mph`;

  // Show card
  card.classList.remove("main__card--visible");

  // Add city to recent searches
  const searchedCity = data.location.name;
  updateRecentSearchesList(data, searchedCity);
}

function updateRecentSearchesList(data, searchedCity) {
  const recentSearchList = document.querySelector(
    ".aside__recent-searches-list"
  );

  // checking searched city
  const existingCity = recentSearchList.querySelector(`#${searchedCity}`);
  if (!existingCity) {
    const newSearch = `<li id="${searchedCity}">${searchedCity} <button class="remove-button">x</button></li>`;
    recentSearchList.insertAdjacentHTML("afterbegin", newSearch);
  }
  const removeCityButtons = document.querySelectorAll(".remove-button");
  removeCityButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const parentListItem = e.currentTarget.parentElement;
      parentListItem.remove();
    });
  });

  // forecast Weather
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  function getWeekDay(date) {
    const dayofWeekNumber = new Date(date).getDay();
    return daysOfWeek[dayofWeekNumber];
  }

  const forecastList = document.querySelector(".main__forecast-list");
  forecastList.innerHTML = "";
  const forecastDays = data.forecast.forecastday;
  console.log(forecastDays);

  forecastDays.forEach((forecast) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <p class="week">${getWeekDay(forecast.date)}</p>
      <div class="icon__container">
      <div class="icon__container-temperature">
      <p >Max: ${forecast.day.maxtemp_c}°C</p>
      <p >Min: ${forecast.day.mintemp_c}°C</p>
      </div>
      <img src="http://${forecast.day.condition.icon}" alt="Forecast icon">
      </div>
    `;

    forecastList.appendChild(li);
  });
}
