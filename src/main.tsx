import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Routes, Route } from "react-router";
import LoginPage from './pages/Login.tsx';
import MedsPage from './pages/MedsPage.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/medecines" element={<MedsPage />} />
    </Routes>
  </BrowserRouter>
  </StrictMode>,
)
