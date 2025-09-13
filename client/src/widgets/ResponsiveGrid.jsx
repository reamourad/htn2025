import { Responsive as ResponsiveGridLayout } from "react-grid-layout";
import WidgetCard from './WidgetCard';

const layouts = {
    lg: [
        { i: "1", x: 0, y: 0, w: 4, h: 2 },
        { i: "2", x: 4, y: 0, w: 4, h: 2 },
        { i: "3", x: 8, y: 0, w: 4, h: 2 },
    ],
};

function MyResponsiveGrid() {
    return (
        <ResponsiveGridLayout
            className="layout"
            layouts={layouts}
            breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
            cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        >
            <div key="1"><WidgetCard></WidgetCard></div>
            <div key="2"><WidgetCard></WidgetCard></div>
            <div key="3"><WidgetCard></WidgetCard></div>
        </ResponsiveGridLayout>
    );
}

export default MyResponsiveGrid;
