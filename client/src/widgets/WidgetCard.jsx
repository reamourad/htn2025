// src/WidgetCard.jsx

import React from 'react';


function WidgetCard({ account }) {
  const {
    account_name,
    priority_score,
    details: { appetite_score, win_score, urgency_score, profit_score },
  } = account;
  
    return (
      
<div className="card bg-base-100 w-96"
  style={{ boxShadow: "0 20px 50px -5px rgba(220,236,255,0.5), 0 20px 30px -5px rgba(220,236,255,0.3)" }}
><div className="flex items-center gap-3 mb-7 mt-4 ml-4">
  {/* Company Logo */}
  <img
    src="/Widget1company.png"
    alt="Company Logo"
    className="w-6 h-6 object-contain"
  />

  {/* Company Name */}
<div className="text-black">
  {widgetData?.account_name}
  </div>
</div>
{/* Radial Progress + Title Centered */}
<div className="flex flex-col items-center mb-6">
  <div
    className="radial-progress text-green-500"
    style={{ "--value": 85 }}
    aria-valuenow={85}
    role="progressbar"
  >
    85%
  </div>

  
  <h2 className="card-title mt-2">Priority Score</h2>
</div>

    <div className="card-actions justify-center mb-4">
<div className="flex gap-8">
  {/* Appetite */}
  <div className="flex flex-col items-center">
      <h1 className="text-sm mb-2 text-red-500 font-bold">Appetite</h1>
      <progress
      className="progress progress-error w-30"
      value="80"
      max="100"
    ></progress>
  </div>

  {/* Urgency */}
  <div className="flex flex-col items-center">
        <h1 className="text-sm mb-2 text-green-500 font-bold">Urgency</h1>

    <progress
      className="progress progress-success w-30"
      value="90"
      max="100"
    ></progress>
      </div>
</div>


    </div>
    <div className="flex flex-col items-start mt-2 mb-4 ml-4">
      <h1 className="text-sm mb-2 ml-2 text-gray-400">1 day ago</h1>
    </div>
  </div>
    )
}

export default WidgetCard;