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
      // Initialize GridStack with iOS-like behavior
      GridStack.init(
          {
            float: true,          // Disable auto-compaction
            cellHeight: '330px',  // Set the height of each grid row
            column: 1,            // Number of grid columns
            disableOneColumnMode: true,
            resizable: {
              handles: 'ne',      // Disable resizing from the corners
            },
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
        <div className="flex-1 ml-43 p-8">
          {/* 👆 ml-28 ensures space for sidebar (adjust to match Menu width) */}
          <h1 className="text-4xl font-bold mb-8">Overview</h1>

          <div className="grid-stack" ref={gridRef}>
            {/* Grouped Section: New Assignments */}
            <div
                className="grid-stack-item"
                data-gs-x="0"
                data-gs-y="0"
                data-gs-w="2"   // spans all 4 columns
                data-gs-h="3"   // one row tall (optional, defaults)
                data-gs-auto-position="true"
            >
              <div className="overflow-x-auto">
                <div className="flex space-x-4 min-w-max">
                  <WidgetCard className="min-w-[300px]" />
                  <WidgetCard className="min-w-[300px]" />
                  <WidgetCard className="min-w-[300px]" />
                  <WidgetCard className="min-w-[300px]" />
                </div>
              </div>
            </div>

            {/* Second row widget (Widget 4) */}
            <div className="grid-stack-item" data-gs-auto-position="true">
              <div className="collapse bg-base-100 border border-base-300 rounded-lg p-4 overflow-x-auto">
                <HomeScreenAccounts />
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default GridStackDashboard;
