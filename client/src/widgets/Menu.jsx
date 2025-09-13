// src/Menu.jsx
import React from "react";

function Menu() {
  return (
    <div className="fixed top-0 left-0 h-full w-15 z-50 flex flex-col justify-center bg-base-200 shadow-lg">
      <ul className="menu rounded-none p-2 w-full space-y-4">
        
        {/* Home */}
        <li>
          <a className="flex items-center space-x-2 group">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              Home
            </span>
          </a>
        </li>

        {/* Details */}
        <li>
          <a className="flex items-center space-x-2 group">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              Details
            </span>
          </a>
        </li>

        {/* Stats */}
        <li>
          <a className="flex items-center space-x-2 group">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              Stats
            </span>
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Menu;
