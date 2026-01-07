const dateTimeEl = document.getElementById("dateTime");
const appEl = document.getElementById("app");
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

// Update time every second
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

// Fake sample weather data for UI demo (you can replace with real API)
const sampleConditions = [
  {
    condition: "Sunny",
    iconLabel: "Day • Clear Sky",
    comfort: "Hot • Dry",
    tip: "Wear sunglasses and stay hydrated.",
  },
  {
    condition: "Partly Cloudy",
    iconLabel: "Day • Clouds & Sun",
    comfort: "Warm • Light Breeze",
    tip: "Perfect for a short walk.",
  },
  {
    condition: "Overcast",
    iconLabel: "Day • Thick Clouds",
    comfort: "Cool • Calm",
    tip: "A light jacket is enough.",
  },
  {
    condition: "Rainy",
    iconLabel: "Rain Showers",
    comfort: "Cool • Humid",
    tip: "Carry an umbrella or raincoat.",
  },
  {
    condition: "Thunderstorm",
    iconLabel: "Storm • Lightning",
    comfort: "Windy • Humid",
    tip: "Better to stay indoors.",
  },
];

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function setFakeWeather(city) {
  const sample = sampleConditions[randomBetween(0, sampleConditions.length - 1)];
  const temp = randomBetween(18, 35);
  const feels = temp + randomBetween(0, 3);
  const high = temp + randomBetween(1, 4);
  const low = temp - randomBetween(2, 5);
  const humidity = randomBetween(40, 90);
  const wind = randomBetween(3, 22);
  const visibility = randomBetween(3, 10);

  cityNameEl.textContent = city;
  temperatureEl.textContent = temp;
  conditionTextEl.textContent = sample.condition;
  feelsLikeEl.textContent = `Feels like ${feels}°C`;
  highLowEl.textContent = `H: ${high}°C · L: ${low}°C`;
  humidityEl.textContent = `${humidity}%`;
  windEl.textContent = `${wind} km/h`;
  visibilityEl.textContent = `${visibility} km`;
  iconLabelEl.textContent = sample.iconLabel;

  overviewConditionEl.textContent = `${sample.condition}, Realistic Sample`;
  overviewComfortEl.textContent = sample.comfort;
  overviewTipEl.textContent = sample.tip;
}

// On search submit – just updates with fake data (presentation friendly)
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = cityInput.value.trim();
  if (!city) return;

  setFakeWeather(city);
  cityInput.blur();
  cityInput.value = "";

  // In real project: call your weather API here instead of setFakeWeather()
});

// Day / Night toggle UI
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

// Initial fake data
setFakeWeather("Bengaluru");
async function getWeather() {
  const city = document.getElementById("cityInput").value;

  const response = await fetch(`http://localhost:3000/weather/${city}`);
  const data = await response.json();

  document.getElementById("temp").innerText = data.temperature + "°C";
  document.getElementById("humidity").innerText = data.humidity + "%";
  document.getElementById("condition").innerText = data.condition;
}