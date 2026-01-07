import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Weather Dashboard Backend Running 🌦️");
});

// Weather route
app.get("/weather/:city", async (req, res) => {
  const city = req.params.city;

  try {
    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather",
      {
        params: {
          q: city,
          appid: process.env.API_KEY,
          units: "metric"
        }
      }
    );

    const w = response.data;

    res.json({
      city: w.name,
      country: w.sys.country,
      temperature: w.main.temp,
      feelsLike: w.main.feels_like,
      humidity: w.main.humidity,
      pressure: w.main.pressure,
      windSpeed: w.wind.speed,
      visibility: w.visibility,
      description: w.weather[0].description,
      updatedAt: new Date(w.dt * 1000).toLocaleString()
    });

  } catch (error) {
    res.status(404).json({ error: "City not found or API error" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});