// src/Menu.jsx
import React from "react";

function Menu() {
  return (

    
      <div className="fixed top-1/2 left-15 -translate-y-1/2 z-50 bg-base-200 shadow-xl rounded-4xl p-2 w-20" style={{ backgroundColor: "#E0E7FF" }}>
        {/* Logo at top-left */}
      <div
        className="fixed top-10 left-2 z-50 p-2 w-16 h-16 bg-white rounded-full flex -mt-40"
      >
        <img
          src="/white-federato-logo.png"
          alt="Logo"
          className="w-full h-full object-contain"
        />
      </div>
        
        <ul className="menu flex flex-col space-y-3">

      
          {/* Home */}
          <li className="relative group">
            <a href="/" className="flex items-center">
              <img
                  src="/home.png"
                  alt="home"
                  className="h-5 w-5 hover:cursor-pointer"
              />
            </a>
            <span className="absolute left-8 top-0 opacity-0 group-hover:opacity-100 transition-all duration-200 px-2 py-1 rounded-3xl bg-white shadow-md text-black whitespace-nowrap pointer-events-none z-10">
            Home
          </span>
          </li>

          {/* Applications */}
          <li className="relative group">
            <a href="/details" className="flex items-center">
              <img
                  src="/applications.png"
                  alt="applications"
                  className="h-5 w-5 hover:cursor-pointer"
              />
            </a>
            <span className="absolute left-8 top-0 opacity-0 group-hover:opacity-100 transition-all duration-200 px-2 py-1 rounded-3xl bg-white shadow-md text-black whitespace-nowrap pointer-events-none z-10">
            Applications
          </span>
          </li>

          {/* Broker Management */}
          <li className="relative group">
            <a className="flex items-center">
              <img
                  src="/brokermgmt.png"
                  alt="broker management"
                  className="h-5 w-5 hover:cursor-pointer"
              />
            </a>
            <span className="absolute left-8 top-0 opacity-0 group-hover:opacity-100 transition-all duration-200 px-2 py-1 rounded-3xl bg-white shadow-md text-black whitespace-nowrap pointer-events-none z-10">
            Broker Management
          </span>
          </li>

          {/* Submissions */}
          <li className="relative group">
            <a className="flex items-center">
              <img
                  src="/submissions.png"
                  alt="submissions"
                  className="h-5 w-5 hover:cursor-pointer"
              />
            </a>
            <span className="absolute left-8 top-0 opacity-0 group-hover:opacity-100 transition-all duration-200 px-2 py-1 rounded-3xl bg-white shadow-md text-black whitespace-nowrap pointer-events-none z-10">
            Submissions
          </span>
          </li>

          {/* Organization */}
          <li className="relative group">
            <a className="flex items-center">
              <img
                  src="/organization.png"
                  alt="organization"
                  className="h-5 w-5 hover:cursor-pointer"
              />
            </a>
            <span className="absolute left-8 top-0 opacity-0 group-hover:opacity-100 transition-all duration-200 px-2 py-1 rounded-3xl bg-white shadow-md text-black whitespace-nowrap pointer-events-none z-10">
            Organization
          </span>
          </li>

          {/* Goals & Rules */}
          <li className="relative group">
            <a className="flex items-center">
              <img
                  src="/goalsrules.png"
                  alt="goals and rules"
                  className="h-5 w-5 hover:cursor-pointer"
              />
            </a>
            <span className="absolute left-8 top-0 opacity-0 group-hover:opacity-100 transition-all duration-200 px-2 py-1 rounded-3xl bg-white shadow-md text-black whitespace-nowrap pointer-events-none z-10">
            Goals & Rules
          </span>
          </li>

          {/* Settings */}
          <li className="relative group">
            <a href="/settings" className="flex items-center">
              <img
                  src="/settings.png"
                  alt="settings"
                  className="h-5 w-5 hover:cursor-pointer"
              />
            </a>
            <span className="absolute left-8 top-0 opacity-0 group-hover:opacity-100 transition-all duration-200 px-2 py-1 rounded-3xl bg-white shadow-md text-black whitespace-nowrap pointer-events-none z-10">
            Settings
          </span>
          </li>

          {/* Profile icon at bottom-left */}
      <div
      className="fixed bottom-0 left-2 z-70  w-16 h-16 bg-white rounded-full shadow-lg flex -mb-30"
      >
        <img
          src="/profile.png"
          alt="Profile"
          className="w-full h-full object-contain"
        />
      </div>

        </ul>
      </div>
  );
}

export default Menu;