import express from "express";
import exphbs from "express-handlebars";
import fetch from "node-fetch";
import bodyParser from "body-parser";
import API_KEY from "./sources/keys.js";

//my server
const app = express();

//set the engine
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

//home page
app.get("/", function (req, res) {
  res.send("<h1>hello from backend to frontend!</h1>");
});

// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false });

//
app.use(express.json());

//routing
app.get("/weather", (req, res) => {
  res.render("weather", { title: "Weather Data" });
});
//handle post request from the client
app.post("/weather", urlencodedParser, async (req, res) => {
  const cityName = req.body.cityName;
  try {
    const endpoint = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
    );
    if (endpoint.status === 200) {
      const cityTemperature = await endpoint.json();
      const temperature = cityTemperature.main.temp;
      res.render("weather", {
        weatherText: `The temperature in ${cityName} is ${temperature} °C!`,
      });
    } else {
      res.render("weather", { weatherText: "City not found!" });
    }
  } catch (error) {
    console.log(error.message);
  }
});
export default app;
