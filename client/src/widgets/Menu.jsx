// src/Menu.jsx
import React from "react";

function Menu() {
  return (
    <>
          <div
      className="fixed top-15 left-12 z-50 p-2 w-16 h-16 bg-white rounded-full flex items-center justify-center"
    >
      <img
        src="/white-federato-logo.png"
        alt="Logo"
        className="w-full h-full object-contain"
      />
    </div>

      {/* Menu sidebar */}
      <div
        className="fixed top-40 left-10 z-50 bg-[#E0E7FF] shadow-xl rounded-4xl p-2 w-20"
      >
        <ul className="menu flex flex-col space-y-3">

          {/* Home */}
          <li>
            <a className="flex items-center space-x-2 group">
              <img src="/home.png" alt="home" className="h-5 w-5" />
              <span className="opacity-0 group-hover:opacity-100 transition-all duration-200 px-2 py-1 rounded-3xl transform group-hover:w-32 scale-110 inline-block">
                Home
              </span>
            </a>
          </li>

          {/* Applications */}
          <li>
            <a className="flex items-center space-x-2 group">
              <img src="/applications.png" alt="applications" className="h-5 w-5" />
              <span className="opacity-0 group-hover:opacity-100 transition-all duration-200 px-2 py-1 rounded-3xl transform group-hover:w-32 scale-110 inline-block">
                Applications
              </span>
            </a>
          </li>

          {/* Broker Management */}
          <li>
            <a className="flex items-center space-x-2 group">
              <img src="/brokermgmt.png" alt="broker management" className="h-5 w-5" />
              <span className="opacity-0 group-hover:opacity-100 transition-all duration-200 px-2 py-1 rounded-3xl inline-block w-auto group-hover:w-36 text-black overflow-hidden whitespace-nowrap">
                Broker Management
              </span>
            </a>
          </li>

          {/* Submissions */}
          <li>
            <a className="flex items-center space-x-2 group">
              <img src="/submissions.png" alt="submissions" className="h-5 w-5" />
              <span className="opacity-0 group-hover:opacity-100 transition-all duration-200 px-2 py-1 rounded-3xl transform group-hover:w-32 scale-110 inline-block">
                Submissions
              </span>
            </a>
          </li>

          {/* Organization */}
          <li>
            <a className="flex items-center space-x-2 group">
              <img src="/organization.png" alt="organization" className="h-5 w-5" />
              <span className="opacity-0 group-hover:opacity-100 transition-all duration-200 px-2 py-1 rounded-3xl transform group-hover:w-32 scale-110 inline-block">
                Organization
              </span>
            </a>
          </li>

          {/* Goals & Rules */}
          <li>
            <a className="flex items-center space-x-2 group">
              <img src="/goalsrules.png" alt="goals and rules" className="h-5 w-5" />
              <span className="opacity-0 group-hover:opacity-100 transition-all duration-200 px-2 py-1 rounded-3xl transform group-hover:w-32 scale-110 inline-block">
                Goals & Rules
              </span>
            </a>
          </li>

          {/* Settings */}
          <li>
            <a className="flex items-center space-x-2 group">
              <img src="/settings.png" alt="settings" className="h-5 w-5" />
              <span className="opacity-0 group-hover:opacity-100 transition-all duration-200 px-2 py-1 rounded-3xl transform group-hover:w-32 scale-110 inline-block">
                Settings
              </span>
            </a>
          </li>

          

        </ul>

        {/* Profile icon at bottom-left */}
      <div
        className="fixed bottom-8 left-12 z-50 p-2 w-16 h-16shadow-lg flex items-center justify-center"
      >
        <img
          src="/profile.png"
          alt="Profile"
          className="w-full h-full object-contain"
        />
      </div>
      </div>
    </>
  );
}

export default Menu;
