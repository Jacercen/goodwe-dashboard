import { Routes, Route } from "react-router-dom";

import Data from "./pages/Data";
import Plant from "./pages/Plant";
import PowerFlow from "./pages/PowerFlow";
import Inverter from "./pages/Inverter";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Statistics from "./pages/Statistics";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/data" element={<Data />} />
      <Route path="/statistics" element={<Statistics />} />
      <Route path="/plant" element={<Plant />} />
      <Route path="/powerflow" element={<PowerFlow />} />
      <Route path="/inverter" element={<Inverter />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
