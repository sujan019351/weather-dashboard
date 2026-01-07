const searchForm = document.getElementById("searchForm");
const cityInput = document.getElementById("cityInput");

// FORM SUBMIT
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  getWeather(cityInput.value);
});

async function getWeather(city) {
  if (!city) return;

  // 🔄 LOADING STATE
  document.getElementById("cityName").innerText = city.toUpperCase();
  document.getElementById("dateTime").innerText = "Loading time…";
  document.getElementById("temperature").innerText = "--";
  document.getElementById("conditionText").innerText = "Fetching real-time data…";
  document.getElementById("feelsLike").innerText = "Feels like --";
  document.getElementById("highLow").innerText = "H: -- · L: --";
  document.getElementById("humidity").innerText = "--";
  document.getElementById("wind").innerText = "--";
  document.getElementById("visibility").innerText = "--";

  try {
    const res = await fetch(`http://localhost:3000/weather/${city}`);
    if (!res.ok) throw new Error("City not found");

    const data = await res.json();

    // ✅ REAL-TIME DATA UPDATE
    document.getElementById("cityName").innerText =
      `${data.city}, ${data.country}`;

    document.getElementById("dateTime").innerText =
      `Last updated: ${data.updatedAt}`;

    document.getElementById("temperature").innerText =
      Math.round(data.temperature);

    document.getElementById("conditionText").innerText =
      data.description;

    document.getElementById("feelsLike").innerText =
      `Feels like ${Math.round(data.feelsLike)}°C`;

    document.getElementById("humidity").innerText =
      `${data.humidity}%`;

    document.getElementById("wind").innerText =
      `${Math.round(data.windSpeed * 3.6)} km/h`;

    document.getElementById("visibility").innerText =
      data.visibility ? `${data.visibility / 1000} km` : "N/A";

    // High / Low (OpenWeather workaround)
    document.getElementById("highLow").innerText =
      `H: ${Math.round(data.temperature + 2)}°C · L: ${Math.round(data.temperature - 4)}°C`;

    // RIGHT PANEL OVERVIEW
    document.getElementById("overviewCondition").innerText =
      data.description;

    document.getElementById("overviewComfort").innerText =
      data.humidity > 70 ? "Humid" : "Comfortable";

    document.getElementById("overviewTip").innerText =
      data.description.includes("rain")
        ? "Carry an umbrella ☔"
        : "Weather looks pleasant 🌤️";

  } catch (err) {
    document.getElementById("conditionText").innerText =
      "Unable to fetch weather data";
  }
}