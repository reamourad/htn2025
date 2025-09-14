// src/GridStackDashboard.jsx
import React, { useRef, useEffect } from 'react';
import { GridStack } from 'gridstack';
import 'gridstack/dist/gridstack.min.css';
import HomeScreenAccounts from './HomeScreenAccounts';
import Menu from './Menu';
import Map from './Map';
import DetailsWidget from './DetailWidget';
import DetailsScreenTable from './DetailsScreenTable';
import Status from './Status';

function DetailsTest() {
  const gridRef = useRef(null);

  useEffect(() => {
    if (gridRef.current) {
      // Initialize GridStack with iOS-like behavior
      GridStack.init(
          {
            float: true,          // Disable auto-compaction
            cellHeight: '280px',  // Set the height of each grid row
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
        <div className="flex-1 ml-43 p-4">
          {/* 👆 ml-28 ensures space for sidebar (adjust to match Menu width) */}
          <h1 className="text-4xl font-bold mb-8">Details</h1>

          <div className="grid-stack" ref={gridRef}>
            <div
                className="grid-stack-item"
                data-gs-x="0"
                data-gs-y="0"
                data-gs-w="1"   // spans all 4 columns
                data-gs-h="1"   // one row tall (optional, defaults)
                data-gs-auto-position="true"
            >
              <div className="overflow-x-auto">
                <div className="flex  min-w-max">
                  <DetailsWidget className="min-w-[100px]" />
                  <Map className="max-w-[10px]" />
                  <Status className="max-w-[10px]" />   
                </div>
              </div>
            </div>


            {/* Third row widget (DetailsScreenTable) */}
            <div className="grid-stack-item" data-gs-auto-position="true">
              <div className="justify-center collapse bg-base-100 border border-base-200 rounded-lg p-4 overflow-x-auto">
                <DetailsScreenTable />
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default DetailsTest;
