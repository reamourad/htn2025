import React, { useRef, useEffect } from "react";
import { GridStack } from "gridstack";
import "gridstack/dist/gridstack.min.css";
import WidgetCard from "./WidgetCard";
import { useLayout } from "./useLayout";

function GridStackDashboard() {
    const gridRef = useRef(null);
    const gridInstanceRef = useRef(null);

    const { layout, fetchLayout, saveLayout, setLayout, addWidget } =
        useLayout();

    // Fetch layout on mount
    useEffect(() => {
        fetchLayout();
    }, [fetchLayout]);

    // Init GridStack and sync with store
    useEffect(() => {
        if (!layout || !gridRef.current) return;

        if (gridInstanceRef.current) {
            gridInstanceRef.current.destroy(false);
        }

        const grid = GridStack.init(
            {
                float: true,
                cellHeight: 100,
                column: 12,
                margin: 8,
                disableOneColumnMode: true,
                resizable: { handles: "all" },
            },
            gridRef.current
        );

        gridInstanceRef.current = grid;

        // Sync DOM to store
        grid.batchUpdate();
        layout.forEach((item) => {
            const el = gridRef.current.querySelector(
                `[data-gs-id='${item.id}']`
            );
            if (el && el.gridstackNode) {
                grid.update(el, {
                    x: item.x,
                    y: item.y,
                    w: item.w,
                    h: item.h,
                });
            }
        });
        grid.commit();

        return () => {
            grid.destroy(false);
            gridInstanceRef.current = null;
        };
    }, [layout]);

    // Manual Save button
    const handleSave = () => {
        const grid = gridInstanceRef.current;
        if (!grid) return;
        const current = grid.save(false);
        // Merge store data
        const byId = new Map(layout.map((w) => [w.id, w]));
        const merged = current.map((item) => ({ ...byId.get(item.id), ...item }));
        setLayout(merged);
        saveLayout();
    };

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold text-center mb-4">Zustand GridStack</h1>

            <div className="flex gap-2 mb-4">
                <button onClick={handleSave} className="btn btn-primary">
                    Save Layout
                </button>
                <button onClick={addWidget} className="btn btn-secondary">
                    Add Widget
                </button>
            </div>

            <div className="grid-stack" ref={gridRef}>
                {layout.map((item) => (
                    <div
                        key={item.id}
                        className="grid-stack-item"
                        data-gs-id={item.id}
                        data-gs-x={item.x}
                        data-gs-y={item.y}
                        data-gs-w={item.w}
                        data-gs-h={item.h}
                    >
                        <div className="grid-stack-item-content">
                            <WidgetCard title={item.title} imageUrl={item.imageUrl} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default GridStackDashboard;
