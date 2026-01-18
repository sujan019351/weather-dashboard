/***********************
 * ELEMENT REFERENCES
 ***********************/
const dateTimeEl = document.getElementById("dateTime");
const toggleMode = document.getElementById("toggleMode");
const toggleSwitch = document.getElementById("toggleSwitch");
const modeLabel = document.getElementById("modeLabel");

const cityNameEl = document.getElementById("cityName");
const temperatureEl = document.getElementById("temperature");
const conditionTextEl = document.getElementById("conditionText");
const feelsLikeEl = document.getElementById("feelsLike");
const highLowEl = document.getElementById("highLow");
const humidityEl = document.getElementById("humidity");
const windEl = document.getElementById("wind");
const visibilityEl = document.getElementById("visibility");
const iconLabelEl = document.getElementById("iconLabel");

const overviewConditionEl = document.getElementById("overviewCondition");
const overviewComfortEl = document.getElementById("overviewComfort");
const overviewTipEl = document.getElementById("overviewTip");

const searchForm = document.getElementById("searchForm");
const cityInput = document.getElementById("cityInput");

/***********************
 * API KEY (WeatherAPI)
 ***********************/
const API_KEY = "5ca1ac458df140d99b5172549261801";

/***********************
 * DATE & TIME
 ***********************/
function updateTime() {
  const now = new Date();
  const options = {
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
  };
  dateTimeEl.textContent = now.toLocaleString("en-IN", options);
}
setInterval(updateTime, 1000);
updateTime();

/***********************
 * REAL WEATHER FUNCTION
 ***********************/
async function getWeather(city) {
  try {
    const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(
      city
    )}&aqi=yes`;

    const response = await fetch(url);
    const data = await response.json();

    // ❌ Error handling
    if (data.error) {
      alert(data.error.message);
      return;
    }

    /******** DATA MAPPING ********/

    // 🌍 City & Country
    cityNameEl.textContent = `${data.location.name}, ${data.location.country}`;

    // 🌡 Temperature
    temperatureEl.textContent = Math.round(data.current.temp_c);

    // ☁ Condition
    conditionTextEl.textContent = data.current.condition.text;
    iconLabelEl.textContent = data.current.condition.text;

    // 🤒 Feels Like
    feelsLikeEl.textContent = `Feels like ${Math.round(
      data.current.feelslike_c
    )}°C`;

    // 🔼🔽 High / Low (not in free API → simulated)
    highLowEl.textContent = `H: ${Math.round(
      data.current.temp_c + 2
    )}°C · L: ${Math.round(data.current.temp_c - 2)}°C`;

    // 💧 Humidity
    humidityEl.textContent = `${data.current.humidity}%`;

    // 🌬 Wind
    windEl.textContent = `${data.current.wind_kph} km/h`;

    // 👀 Visibility
    visibilityEl.textContent = `${data.current.vis_km} km`;

    // 📊 Overview
    overviewConditionEl.textContent = data.current.condition.text;

    overviewComfortEl.textContent =
      data.current.humidity > 70 ? "Humid Weather" : "Comfortable Weather";

    if (data.current.condition.text.toLowerCase().includes("rain")) {
      overviewTipEl.textContent = "Carry an umbrella ☔";
    } else if (data.current.temp_c > 30) {
      overviewTipEl.textContent = "Stay hydrated 💧";
    } else {
      overviewTipEl.textContent = "Pleasant weather 😊";
    }

  } catch (error) {
    alert("Failed to fetch weather data");
    console.error(error);
  }
}

/***********************
 * SEARCH FORM
 ***********************/
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = cityInput.value.trim();
  if (!city) return;

  getWeather(city);
  cityInput.value = "";
  cityInput.blur();
});

/***********************
 * DAY / NIGHT TOGGLE
 ***********************/
let isNight = false;

toggleMode.addEventListener("click", () => {
  isNight = !isNight;
  toggleSwitch.classList.toggle("dark", isNight);
  modeLabel.textContent = isNight ? "Night Mode" : "Day Mode";

  if (isNight) {
    document.body.style.background =
      "linear-gradient(145deg, #020617, #0f172a, #1e293b)";
  } else {
    document.body.style.background =
      "linear-gradient(135deg, rgba(12, 22, 68, 0.9), rgba(19, 112, 190, 0.9)), url('https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=1600')";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
  }
});

/***********************
 * DEFAULT LOAD
 ***********************/
getWeather("Bengaluru");