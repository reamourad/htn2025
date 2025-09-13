// src/Menu.jsx
import React from "react";

function Menu() {
  return (
    <div className="fixed top-1/2 left-6 -translate-y-1/2 z-50 bg-base-200 shadow-xl rounded-4xl p-2 w-20">
      <ul className="menu flex flex-col space-y-3">
        
        {/* Home */}
        <li>
          <a className="flex items-center space-x-2 group">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
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
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-sm">
              Home
            </span>
          </a>
        </li>

        {/* Applications */}
        <li>
          <a className="flex items-center space-x-2 group">
            <img
              src="/applications.png"
              alt="applications"
              className="h-5 w-5"
            />
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-sm">
                Applications
            </span>
          </a>
        </li>

        {/* Broker Management */}
        <li>
          <a className="flex items-center space-x-2 group">
            <img
              src="/brokermgmt.png"
              alt="broker management"
              className="h-5 w-5"
            />
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-sm">
              Broker Management
            </span>
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Menu;
