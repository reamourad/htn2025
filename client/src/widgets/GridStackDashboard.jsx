// src/GridStackDashboard.jsx
import React, { useRef, useEffect } from 'react';
import { GridStack } from 'gridstack';
import 'gridstack/dist/gridstack.min.css';
import WidgetCard from './WidgetCard';
import HomeScreenAccounts from './HomeScreenAccounts';
import Menu from './Menu';

function GridStackDashboard() {
  const gridRef = useRef(null);

  useEffect(() => {
    if (gridRef.current) {
      GridStack.init(
        {
          float: false, // widgets respect y positions
          column: 3,
          disableOneColumnMode: false,
          resizable: { handles: 'all' },
        },
        gridRef.current
      );
    }
  }, []);

  return (
    <div className="flex">
      {/* Sidebar Menu (fixed left) */}
      <Menu />

      {/* Main Dashboard shifted right */}
      <div className="flex-1 ml-24 p-8">
        {/* 👆 ml-24 ensures space for sidebar (adjust to match Menu width) */}
        <h1 className="text-2xl font-bold mb-8">Overview</h1>

        <div className="grid-stack" ref={gridRef}>
          {/* Grouped Section: New Assignments */}
          <div
            className="grid-stack-item"
            data-gs-x="0"
            data-gs-y="0"
            data-gs-w="12"
            data-gs-auto-position="true"
          >
            <div className="collapse bg-base-100 border border-base-300 rounded-lg p-4">
              <h1 className="text-2xl font-bold mb-4">New Assignments</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <WidgetCard />
                <WidgetCard />
                <WidgetCard />
              </div>
            </div>
          </div>

          {/* Second row widget (Widget 4) */}
          <div className="grid-stack-item" data-gs-auto-position="true">
            <div className="collapse bg-base-100 border border-base-300 rounded-lg p-4">
              <HomeScreenAccounts />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GridStackDashboard;
