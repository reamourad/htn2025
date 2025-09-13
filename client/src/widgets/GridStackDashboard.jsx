// src/GridStackDashboard.jsx

import React, { useRef, useEffect } from 'react';
import { GridStack } from 'gridstack';
import 'gridstack/dist/gridstack.min.css';
import WidgetCard from './WidgetCard'; // 👈 Import your component


function GridStackDashboard() {
    const gridRef = useRef(null);

    useEffect(() => {
        if (gridRef.current) {
            // Initialize GridStack with iOS-like behavior
            GridStack.init({
                float: true,          // Disable auto-compaction
                cellHeight: 400,  // Set the height of each grid row
                column: 4,           // Number of grid columns
                disableOneColumnMode: true,
                resizable: {
                    handles: 'all'     // Disable resizing from the corners
                },
            }, gridRef.current);
        }
    }, []);

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold text-center mb-8">GridStack Dashboard</h1>
            <div className="grid-stack" ref={gridRef}>

                {/* Widget 1: A medium-sized widget (4x4) */}
                <div className="grid-stack-item" data-gs-x="0" data-gs-y="0" data-gs-w="4" data-gs-h="4">
                    <div className="grid-stack-item-content">
                        <WidgetCard />  {/* 👈 Your widget component here */}
                    </div>
                </div>

                {/* Widget 2: A small-sized widget (2x2) */}
                <div className="grid-stack-item" data-gs-x="4" data-gs-y="0" data-gs-w="2" data-gs-h="2">
                    <div className="grid-stack-item-content">
                        <WidgetCard />  {/* 👈 Your widget component here */}
                    </div>
                </div>

                {/* Widget 3: A large-sized widget (8x4) */}
                <div className="grid-stack-item" data-gs-x="6" data-gs-y="0" data-gs-w="2" data-gs-h="2">
                    <div className="grid-stack-item-content">
                        <WidgetCard />  {/* 👈 Your widget component here */}
                    </div>
                </div>

            </div>
        </div>
    );
}

export default GridStackDashboard;