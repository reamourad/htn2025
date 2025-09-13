import { create } from "zustand";

// Helper: ensure every item has a unique id
const ensureIds = (items) => {
    return items.map((item, idx) => ({
        ...item,
        id: item.id || `widget-${idx}-${Date.now()}`, // generate if missing
    }));
};

export const useLayout = create((set, get) => ({
    layout: [],

    setLayout: (layout) => set({ layout: ensureIds(layout) }),

    // Load layout from backend
    fetchLayout: async () => {
        try {
            const res = await fetch("http://127.0.0.1:5000/layout");
            const data = await res.json();

            if (data && data.length > 0) {
                set({ layout: ensureIds(data) }); // ✅ force IDs
            } else {
                // 👇 Default widgets if backend returns nothing
                const defaultWidgets = ensureIds([
                    {
                        x: 0,
                        y: 0,
                        w: 4,
                        h: 4,
                        title: "Welcome",
                        imageUrl: "https://placehold.co/400x240/welcome",
                    },
                    {
                        x: 4,
                        y: 0,
                        w: 4,
                        h: 4,
                        title: "Info",
                        imageUrl: "https://placehold.co/400x240/info",
                    },
                    {
                        x: 8,
                        y: 0,
                        w: 4,
                        h: 4,
                        title: "Tips",
                        imageUrl: "https://placehold.co/400x240/tips",
                    },
                ]);
                set({ layout: defaultWidgets });
            }
        } catch (err) {
            console.error("Fetch layout failed:", err);
            set({ layout: [] });
        }
    },

    // Save layout to backend
    saveLayout: async () => {
        const layout = ensureIds(get().layout); // ✅ re-ensure IDs before saving
        try {
            const res = await fetch("http://127.0.0.1:5000/layout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(layout),
            });
            await res.json();
            console.log("Layout saved");
            set({ layout }); // update store with fixed IDs
        } catch (err) {
            console.error("Save failed:", err);
        }
    },

    // Add a new widget with a guaranteed unique ID
    addWidget: () => {
        const layout = get().layout;
        const newWidget = {
            id: `widget-${Date.now()}`, // ✅ stable new ID
            x: 0,
            y: 0,
            w: 2,
            h: 2,
            title: "New Widget",
            imageUrl: "https://placehold.co/400x240",
        };
        set({ layout: [...layout, newWidget] });
    },
}));
