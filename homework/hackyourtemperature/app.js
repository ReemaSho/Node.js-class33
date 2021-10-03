import express from "express";
import exphbs from "express-handlebars";
import fetch from "node-fetch";
import API_KEY from "./sources/keys.js";

//my server
const app = express();

//set the engine
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.use(express.urlencoded({ extended: false }));

//home page
app.get("/", (req, res) => {
  res.send("<h1>hello from backend to frontend!</h1>");
});

//routing;
app.get("/weather", (req, res) => {
  res.render("weather", { title: "Weather Data" });
});
//handle post request from the client
app.post("/weather", async (req, res) => {
  const { cityName } = req.body;
  try {
    const endpoint = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
    );
    if (endpoint.status === 200) {
      const cityWeatherInfo = await endpoint.json();
      const cityTemperature = cityWeatherInfo.main.temp;
      res.render("weather", {
        title: "Weather Data",
        weatherText: `The temperature in ${cityWeatherInfo.name} is ${cityTemperature} C`,
      });
    } else {
      res.status(404);
      res.render("weather", {
        title: "Weather Data",
        weatherText: "City not found!",
      });
    }
  } catch (error) {
    console.log(error.message);
  }
});

export default app;
