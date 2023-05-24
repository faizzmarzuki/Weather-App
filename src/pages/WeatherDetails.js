import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const WeatherDetails = () => {
  const { date } = useParams();
  const [hourlyTemperatures, setHourlyTemperatures] = useState([]);

  useEffect(() => {
    const fetchHourlyTemperatures = async () => {
      try {
        const response = await axios.get(
          "https://api.openweathermap.org/data/2.5/forecast?q=durian%20tunggal&units=metric&appid={API_KEY}"
        );
        const filteredData = response.data.list.filter(
          (item) => item.dt_txt.split(" ")[0] === date
        );
        setHourlyTemperatures(filteredData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchHourlyTemperatures();
  }, [date]);

  const calculateAverageTemperature = () => {
    const sum = hourlyTemperatures.reduce(
      (acc, item) => acc + item.main.temp,
      0
    );
    const averageTemperature = (sum / hourlyTemperatures.length).toFixed(2);
    return averageTemperature;
  };

  const averageTemperature = calculateAverageTemperature();

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Weather Details for {date}</h2>
      <div className="max-w-sm w-full bg-white shadow-lg rounded-lg p-4 mb-4">
        <p className="font-semibold mb-2">
          Average Temperature: {averageTemperature}
        </p>
        <ul>
          {hourlyTemperatures.map((item) => (
            <li
              key={item.dt}
              className="flex items-center justify-between py-2 border-b"
            >
              <span className="text-lg">{item.dt_txt.split(" ")[1]}</span>
              <span>{item.main.temp}°C</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WeatherDetails;
