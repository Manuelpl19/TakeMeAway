import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Componentes UI
import Navbar       from './components/Navbar.jsx';
import Footer       from './components/Footer.jsx';
import RequireAuth  from './components/RequireAuth.jsx';

// Páginas
import Login        from './pages/Login.jsx';
import Register     from './pages/Register.jsx';
import Dashboard    from './pages/Dashboard.jsx';
import Home         from './pages/Home.jsx';
import Trips        from './pages/Trips.jsx';
import DriverPanel  from './pages/DriverPanel.jsx';
import Profile      from './pages/Profile.jsx';
import Landing      from './pages/Landing.jsx'; // <--- 1. IMPORTA ESTO

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* --- RUTAS PÚBLICAS (Las ve cualquiera) --- */}
        
        <Route path="/"         element={<Landing />} /> 
        
        <Route path="/login"    element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* --- RUTAS PROTEGIDAS --- */}
        <Route element={<RequireAuth />}>
          <Route path="/dashboard" element={<Dashboard />} />
          
          <Route path="/home"      element={<Home />} />
          <Route path="/trips"     element={<Trips />} />
          <Route path="/driver"    element={<DriverPanel />} />
          <Route path="/profile"   element={<Profile />} />
        </Route>

        {/* Si ponen una ruta rara, al Landing */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Footer />
    </>
  );
}