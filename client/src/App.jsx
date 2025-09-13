
import './App.css'
import "gridstack/dist/gridstack.min.css";
import WidgetCard from './widgets/WidgetCard';
import GridStackDashboard from "./widgets/GridStackDashboard.jsx";
import Menu from './widgets/Menu';

function App() {

  return (
      <div>
          <GridStackDashboard />
          <Menu />
      </div>

  )
}

export default App
