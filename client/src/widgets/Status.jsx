// src/MapWidget.jsx
import React from "react";

function Status() {
  return (
    <div className="card bg-base-50 w-[300px] shadow-md p-4">
      {/* Map image */}
      <div className="flex justify-center">
        <img
          src="/status.png"
          alt="Status Widget"
          className="w-[250px] h-auto object-contain rounded-lg"
        />
      </div>
    </div>
  );
}

export default Status;
