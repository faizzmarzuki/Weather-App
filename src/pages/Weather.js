import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import CardMain from "../components/cardMain";
import CardSide from "../components/cardSide";

const WeatherForecast = () => {
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const response = await axios.get(
          "https://api.openweathermap.org/data/2.5/forecast?q=durian%20tunggal&units=metric&appid={API_KEY}"
        );
        setForecast(response.data.list);
      } catch (error) {
        console.error(error);
      }
    };

    fetchForecast();
  }, []);

  // Calculate average temperature and weather for each date
  const calculateAverageTemperatureAndWeather = () => {
    const currentDate = new Date().toISOString().split("T")[0];

    const dataByDate = {
      [currentDate]: {
        temperatures: [],
        weather: [],
      },
    };

    forecast.forEach((item) => {
      const date = item.dt_txt.split(" ")[0];
      const temperature = item.main.temp;
      const weather = item.weather[0].description;

      if (date === currentDate) {
        dataByDate[currentDate].temperatures.push(temperature);
        dataByDate[currentDate].weather.push(weather);
      } else {
        if (!dataByDate[date]) {
          dataByDate[date] = {
            temperatures: [],
            weather: [],
          };
        }
        dataByDate[date].temperatures.push(temperature);
        dataByDate[date].weather.push(weather);
      }
    });

    const averageTemperatureAndWeather = {};

    for (const date in dataByDate) {
      const temperatures = dataByDate[date].temperatures;
      const sum = temperatures.reduce((acc, curr) => acc + curr, 0);
      const averageTemperature = (sum / temperatures.length).toFixed(2);
      const weather = dataByDate[date].weather[0];

      averageTemperatureAndWeather[date] = {
        averageTemperature,
        weather,
      };
    }

    return averageTemperatureAndWeather;
  };

  const averageTemperatureAndWeather = calculateAverageTemperatureAndWeather();

  return (
    <div>
      <h1 className="flex items-center justify-center py-10 font-sans font-semibold text-2xl">
        5-Day Weather Forecast
      </h1>

      <div className="flex px-5">
        <div className="w-1/3 sticky top-0">
          <h2 className="flex items-center justify-center py-2 font-sans font-semibold text-2xl">
            Today
          </h2>
          <ul>
            <li className="pt-10">
              <Link
                to={`/details/${Object.keys(averageTemperatureAndWeather)[0]}`}
              >
                <CardMain
                  date={Object.keys(averageTemperatureAndWeather)[0]}
                  temperature={
                    averageTemperatureAndWeather[
                      Object.keys(averageTemperatureAndWeather)[0]
                    ].averageTemperature
                  }
                  weather={
                    averageTemperatureAndWeather[
                      Object.keys(averageTemperatureAndWeather)[0]
                    ].weather
                  }
                />
              </Link>
            </li>
          </ul>
        </div>
        <div className="w-2/3">
          <h2 className="flex items-center justify-center py-2 font-sans font-semibold text-2xl">
            Other Dates
          </h2>
          <ul>
            {Object.keys(averageTemperatureAndWeather)
              .slice(1)
              .map((date) => (
                <li key={date} className="pt-10">
                  <Link to={`/details/${date}`}>
                    <CardSide
                      date={date}
                      temperature={
                        averageTemperatureAndWeather[date].averageTemperature
                      }
                      weather={averageTemperatureAndWeather[date].weather}
                    />
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};


export default WeatherForecast;