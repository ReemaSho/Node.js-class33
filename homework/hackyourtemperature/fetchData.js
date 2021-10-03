import express from "express";
import API_KEY from "./sources/keys.js";
import fetch from "node-fetch";
//my server
const app = express();
app.post("/:cityName", async (req, res) => {
  const cityNameInput = req.params.cityName;
  try {
    const endpoint = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${cityNameInput}&appid=${API_KEY}&units=metric`
    );
    if (endpoint.status === 200) {
      const cityWeatherInfo = await endpoint.json();
      const cityTemperature = cityWeatherInfo.main.temp;
      res.json({
        cityName: cityWeatherInfo.name,
        temperature: cityTemperature,
      });
    } else {
      res.status(404);
      res.json({ weatherText: "City not found!" });
    }
  } catch (error) {
    console.log(error.message);
  }
});
export default app;
