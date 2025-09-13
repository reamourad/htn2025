// src/Menu.jsx
import React from "react";

function Menu() {
  return (
    <div className="fixed top-0 left-0 h-full w-20 z-50 flex flex-col justify-center bg-base-200 shadow-lg">
      <ul className="menu rounded-none p-2 w-full">
        <li>
          <a className="tooltip tooltip-right" data-tip="Home">
            🏠
          </a>
        </li>
        <li>
          <a className="tooltip tooltip-right" data-tip="Details">
            ℹ️
          </a>
        </li>
        <li>
          <a className="tooltip tooltip-right" data-tip="Stats">
            📊
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Menu;
