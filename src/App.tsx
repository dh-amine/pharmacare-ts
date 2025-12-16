import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";

// Tes pages
import LoginPage from "@/pages/Login";
import MainSelection from "@/pages/MainSelection"; // 
import MedDetailsPage from "@/pages/MedDetailsPage";
function App() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/login"); 
  }, []);

  return (
    <Routes>
      {/* Page Login */}
      <Route path="/login" element={<LoginPage />} />

      {/* Ta page de sélection */}
      <Route path="/select" element={<MainSelection />} />
      
      <Route path="/medecines/:id" element={<MedDetailsPage />} />
    </Routes>



  );
}

export default App;

