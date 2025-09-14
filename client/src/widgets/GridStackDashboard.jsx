// src/GridStackDashboard.jsx
import React, { useRef, useEffect, useState } from "react";
import { GridStack } from "gridstack";
import "gridstack/dist/gridstack.min.css";
import WidgetCard from "./WidgetCard";
import HomeScreenAccounts from "./HomeScreenAccounts";
import Menu from "./Menu";

// Import local JSON file
import submissionsData from "../testsubmissions.json";

function GridStackDashboard() {
  const gridRef = useRef(null);
  const [rankedAccounts, setRankedAccounts] = useState([]);

  // Initialize GridStack
  useEffect(() => {
    if (gridRef.current) {
      GridStack.init(
        {
          float: true,
          cellHeight: "470px",
          column: 1,
          disableOneColumnMode: true,
          resizable: { handles: "ne" },
        },
        gridRef.current
      );
    }
  }, []);

  // Fetch priority scores from backend using local submissions data
  useEffect(() => {
    async function fetchPriorityScores() {
      try {
        const response = await fetch("http://localhost:8000/priority_scores", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(submissionsData), // send the local file data
        });

        const result = await response.json();
        setRankedAccounts(result.ranked_submissions || []);
      } catch (error) {
        console.error("Error fetching priority scores:", error);
      }
    }
    fetchPriorityScores();
  }, []);

  return (
    <div className="flex">
      <Menu />
      <div className="flex-1 ml-43 p-8">
        <h1 className="text-4xl font-bold mb-8">Overview</h1>
        <div className="grid-stack" ref={gridRef}>
          <div className="grid-stack-item" data-gs-auto-position="true">
            <div className="overflow-x-auto">
              <div className="flex space-x-4 min-w-max">
                {rankedAccounts.map((account) => (
                  <WidgetCard key={account.id} account={account} />
                ))}
              </div>
            </div>
          </div>

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
