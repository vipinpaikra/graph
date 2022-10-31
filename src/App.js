import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import NewBarChart from "./components/BarChart/NewBarChart";
import IntractiveLegend from "./components/Scatter/IntractiveLegend";
import TempTimeLine from "./components/Line/TempTimeLine";
import GlobalMe from "./components/world map/GlobalMe";
import PieChart from "./components/Pie/PieChart";
import NoPage from "./NoPage";
import AreaChart from "./components/area/AreaChart";
import Area2 from "./components/area/Area2";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="Pie" element={<PieChart />} />
                <Route path="worldmap" element={<GlobalMe />} />
                <Route path="line" element={<TempTimeLine />} />
                <Route path="scatter" element={<IntractiveLegend />} />
                <Route path="barchart" element={<NewBarChart />} />
                <Route path="areachart" element={<Area2 />} />

                <Route path="*" element={<NoPage />} />
            </Routes>
        </Router>
    );
}

export default App;
