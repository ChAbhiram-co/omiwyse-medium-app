import React, { useState } from "react";
import { Button, TextField, Card, Typography } from "@mui/material";

function Weather() {
  //This creates a state variable called city, with an initial value of an empty string "".
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [coordinates, setCoordinates] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const apiKey = "6de3b62461bd0065c082f4cb49208213";

  const fetchWeather = () => {
    if (!city) return;
    setLoading(true);
    setError(null);
    setWeather(null);
    setCoordinates(null);
    setShowMap(false);

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)//this first api
      .then(response => response.json()) // Convert the response body to JSON.transforming the raw data that the server sends back in the response into a format that can be easily used and understood by JavaScript.
      .then(data => {
        // Check if the status code from the API response is 200 (success). If not, throw an error with the message from the API.
        if (data.cod !== 200) {
          throw new Error(data.message);
        }
        const { lat, lon } = data.coord;
        setCoordinates({ lat, lon });
        return fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
      })// second api
      .then(response => response.json())
      .then(forecastData => {
        setWeather({
          currentWeather: forecastData.list[0],
          forecast: forecastData.list.slice(1, 3),
        });
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  };

  const showGoogleMap = () => {
    setShowMap(true);
  };

  return (
    <div className="weather">
      <Typography variant="h4" gutterBottom>Weather Forecast</Typography>
      <div className="input-section">
        <TextField
          label="Enter city name"
          variant="outlined"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={fetchWeather} disabled={loading}>
          {loading ? "Fetching..." : "Fetch Weather"}
        </Button>
      </div>
      {error && <Typography color="error">{error}</Typography>}
      {weather && (
        <div className="forecast">
          <Card className="current" sx={{ padding: 2, marginBottom: 2 }}>
            <Typography variant="h6">Current Weather</Typography>
            <Typography>Date & Time: {new Date(weather.currentWeather.dt * 1000).toLocaleString()}</Typography>
            <Typography>Temperature: {weather.currentWeather.main.temp}°C</Typography>
            <Typography>Weather: {weather.currentWeather.weather[0].description}</Typography>
            <Typography>Wind Speed: {weather.currentWeather.wind.speed} m/s</Typography>
          </Card>
          <Typography variant="h6">Weather Forecast</Typography>
          {weather.forecast.map((item, index) => (
            <Card key={index} className="forecast-item" sx={{ padding: 2, marginBottom: 2 }}>
              <Typography>Date & Time: {new Date(item.dt * 1000).toLocaleString()}</Typography>
              <Typography>Temperature: {item.main.temp}°C</Typography>
              <Typography>Feels Like: {item.main.feels_like}°C</Typography>
              <Typography>Min Temperature: {item.main.temp_min}°C</Typography>
              <Typography>Max Temperature: {item.main.temp_max}°C</Typography>
              <Typography>Pressure: {item.main.pressure} hPa</Typography>
              <Typography>Weather: {item.weather[0].description}</Typography>
              <Typography>Wind Speed: {item.wind.speed} m/s</Typography>
            </Card>
          ))}
          {coordinates && (
            <Button variant="contained" color="secondary" onClick={showGoogleMap}>
              Show Map Here
            </Button>
          )}
        </div>
      )}
      {showMap && coordinates && (
        <div className="map-container" style={{ width: "110%", height: "450px", marginTop: "20px" }}>
          <iframe
            width="100%"
            height="100%"
            src={`https://www.google.com/maps?q=${coordinates.lat},${coordinates.lon}&output=embed`} // here i used lat and log from api to get location
            title="Google Map"
            style={{ border: "0" }}
            //allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
}

export default Weather;
















// .catch((err) => {
       // console.error("Error:", err);
        //setError(err.message);
      //})








// .catch((err) => {
//   setError(err.message);   
//   //setWeather(null);  
// });