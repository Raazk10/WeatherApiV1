export default async function fetchApi(city) {
  const apikey = `9f0b6e2d3cb14df2a5e202815230902`;
  const url = `http://api.weatherapi.com/v1/forecast.json?key=${apikey}&q=${city}&days=5&aqi=no&alerts=no`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Fetch failed with status ${response.status}: ${response.statusText}`
      );
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}
