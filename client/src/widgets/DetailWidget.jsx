// src/WidgetCard.jsx
import React from "react";

function DetailWidget() {
  return (
      <div
        className="card bg-base-100 w-180 cursor-pointer p-4"
        style={{
          boxShadow:
            "0 20px 50px -5px rgba(220,236,255,0.5), 0 20px 30px -5px rgba(220,236,255,0.3)",
        }}
      >
        {/* Top-right status badge */}
        <div className="absolute top-4 right-4">
          <span className="badge badge-warning">Created</span>
        </div>

        {/* Header: logo + company name */}
        <div className="flex items-center gap-3 mb-4">
          <img
            src="/Widget1company.png"
            alt="F10 Goal RETENTION BOUND Company Logo"
            className="w-6 h-6 object-contain"
          />
          <div className="text-black text-2xl font-bold">
            F10 Goal RETENTION BOUND
          </div>
        </div>

        {/* Main content: text on the left, radial progress on the right */}
        <div className="flex justify-between items-start gap-3">
          {/* Left: Description text */}
          <div className="flex-1">
            <h1 className="text-left text-gray-500 text-base">
              F10 Goal RETENTION BOUND is a company based in Santa Monica, CA that deals with distribution of auto parts, primarily to mechanics.
            </h1>

            <div className="mt-4 space-y-2">
              <ul className="list-disc list-inside font-semibold text-black-600">
                State of Risk: California <br />
                Date Created: 2025-08-06T00:00:00.000Z 
              </ul>
            </div>
          </div>

          {/* Right: Radial Progress */}
          <div className="flex flex-col items-center ml-4">
            <h2 className="card-title mb-1 mt-1 text-center">Priority Score: High</h2>
            <div
              className="radial-progress text-[#20DFA6]"
              style={{ "--value": 85 }}
              aria-valuenow={85}
              role="progressbar"
            >
              <b>85%</b>
            </div>
          </div>
        </div>
      </div>
   
  );
}

export default DetailWidget;
