// src/GridStackDashboard.jsx
import React, { useRef, useEffect, useState } from "react";
import { GridStack } from "gridstack";
import "gridstack/dist/gridstack.min.css";
import WidgetCard from "./WidgetCard";
import HomeScreenAccounts from "./HomeScreenAccounts";
import Menu from "./Menu";


function GridStackDashboard() {
  const gridRef = useRef(null);

  const [ranked, setRanked] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch ranked results
  useEffect(() => {
    async function fetchResults() {
      try {
        const response = await fetch("http://127.0.0.1:8000/results");
        if (!response.ok) {
          throw new Error(`Server error ${response.status}`);
        }

        const data = await response.json();
        setRanked(data.ranked || []); // expect array from API
        console.log("Fetched ranked:", data.ranked);
      } catch (err) {
        console.error("Error fetching results:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchResults();
  }, []);

  // Initialize GridStack AFTER ranked data is available
  useEffect(() => {
    if (gridRef.current && ranked.length > 0) {
      GridStack.init(
        {
          float: true,           // widgets don’t auto-compact
          cellHeight: "330px",   // row height
          column: 4,             // number of columns
          disableOneColumnMode: true,
          resizable: {
            handles: "ne",      // resize from all sides
          },
          draggable: {
            handle: ".grid-stack-item-content", // drag by content
          },
        },
        gridRef.current
      );
    }
  }, [ranked]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex">
      {/* Sidebar Menu */}
      <Menu />

      {/* Main Dashboard */}
      <div className="flex-1 ml-43 p-8">
        <h1 className="text-4xl font-bold mb-8">Overview</h1>

        <div className="grid-stack" ref={gridRef}>
          {/* Dynamic ranked accounts */}

          {ranked.map((account, i) => (
            <div
              key={account.id ?? i}
              className="grid-stack-item"
              data-gs-x="0"
              data-gs-y={i}   // 👈 place each in its own row
              data-gs-w="1"
              data-gs-h="1"
            >
              <div className="grid-stack-item-content">
                <WidgetCard account={account} />
              </div>
            </div>
          ))}

          {/* Extra static widget */}
          <div
            className="grid-stack-item"
            data-gs-x="0"
            data-gs-y={ranked.length}
            data-gs-w="2"
            data-gs-h="2"
          >
            <div className="grid-stack-item-content">
              <HomeScreenAccounts />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GridStackDashboard;
