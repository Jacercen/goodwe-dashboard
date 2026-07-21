import Dashboard from "./pages/Dashboard";
import PlantSelectionPage from "./pages/PlantSelectionPage";
import LoginPage from "./pages/LoginPage";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/plants" element={<PlantSelectionPage />} />
      <Route path="/dashboard/:plantId" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
