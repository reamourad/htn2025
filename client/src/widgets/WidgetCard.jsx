// src/WidgetCard.jsx
import React from "react";


function WidgetCard({account}) {

  let radialColor = {
    border: "border-success",     // arc color
    bg: "bg-success/20",             // soft background
    text: "text-green-600",         // darker number text
  };

  if (account.priority_score < 40) {
    radialColor = {
      border: "border-error",
      bg: "bg-error/20",
      text: "text-red-500",
    };
  } else if (account.priority_score < 70) {
    radialColor = {
      border: "border-warning",
      bg: "bg-warning/20",
      text: "text-yellow-600",
    };
  }

  return (
    <a href="/details">
      <div
        className="card bg-base-100 w-96 cursor-pointer"
        style={{
          boxShadow:
            "0 20px 50px -5px rgba(220,236,255,0.5), 0 20px 30px -5px rgba(220,236,255,0.3)",
        }}
      >
        <div className="flex items-center gap-3 mb-7 mt-4 ml-4">
          {/* Company Logo */}
          <img
            src="/Widget1company.png"
            alt="Company Logo"
            className="w-6 h-6 object-contain"
          />

          {/* Company Name */}
          <div className="text-black">{account?.account_name}</div>
        </div>

        {/* Radial Progress + Title Centered */}
        <div className="flex flex-col items-center mb-6">
          <div
            className={`radial-progress ${radialColor.border} ${radialColor.text} ${radialColor.bg}`}
            style={{ "--value": `${account.priority_score}` }}
            aria-valuenow={account.priority_score}
            role="progressbar"
          >
            <b>{account.priority_score}%</b>
          </div>

          <h2 className="card-title mt-2">Priority Score</h2>
        </div>

        <div className="card-actions justify-center mb-4">
          <div className="flex gap-8">
            {/* Appetite */}
            <div className="flex flex-col items-center">
              <h1 className="text-sm mb-2 text-red-500 font-bold">Appetite</h1>
              <progress
                className="progress progress-error w-32"
                value={account.details.appetite_score}
                max="1"
              ></progress>
            </div>

            {/* Urgency */}
            <div className="flex flex-col items-center">
              <h1 className="text-sm mb-2 text-[#20DFA6] font-bold">Urgency</h1>
              <progress
                className="progress progress-success w-32"
                value="0.86"
                max="1"
              ></progress>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start mt-2 mb-4 ml-4">
          <h1 className="text-sm mb-2 ml-2 text-gray-400">1 day ago</h1>
        </div>
      </div>
    </a>
  );
}

export default WidgetCard;
