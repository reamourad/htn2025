import './App.css';
import "gridstack/dist/gridstack.min.css";
import WidgetCard from './widgets/WidgetCard';
import GridStackDashboard from "./widgets/GridStackDashboard.jsx";
import Menu from './widgets/Menu';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Settings from "./pages/Settings";
import DetailsTest from "./widgets/DetailsTest.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GridStackDashboard />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/details" element={<DetailsTest />} />
      </Routes>
    </Router>
  );
}

export default App;
