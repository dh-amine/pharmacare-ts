import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Routes, Route } from "react-router";
import LoginPage from './pages/Login.tsx';
import MedsPage from './pages/MedsPage.tsx';
import MainSelection from './pages/MainSelection.tsx';
import ActionneurPage from './pages/ActionneurPage.tsx';
import ProLoginPage from './pages/ProLoginPage.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<ProLoginPage />} />
      <Route path="/select" element={<MainSelection />} />
      <Route path="/medecines" element={<MedsPage />} />
      <Route path="/actionneur" element={<ActionneurPage />} />
    </Routes>
  </BrowserRouter>
  </StrictMode>,
)
