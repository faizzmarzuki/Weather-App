import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WeatherForecast from "./pages/Weather";
import WeatherDetails from "./pages/WeatherDetails";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<WeatherForecast />} />
          <Route path="/details/:date" element={<WeatherDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
