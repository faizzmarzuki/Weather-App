import React from "react";

const CardSide = ({ date, temperature, weather}) => {
  return (
    <div className="max-w-xs mx-auto bg-white shadow-lg rounded-lg overflow-hidden hover:bg-slate-50">
      <div className="p-4">
        <div className="flex items-center">
          <div>
            <p className="w-2/3 text-lg font-semibold">{temperature}°C</p>
            <p className="text-gray-600">{weather}</p>
            <div className="mt-4">
              <p className="text-gray-600">{date}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardSide;
