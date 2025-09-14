// src/MapWidget.jsx
import React from "react";

function Map() {
  return (
    <div className="card bg-base-50 w-[300px] shadow-md p-4">
      {/* Map image */}
      <div className="flex justify-center">
        <img
          src="/map.png"
          alt="Map Widget"
          className="w-[250px] h-auto object-contain rounded-lg"
        />
      </div>
    </div>
  );
}

export default Map;
