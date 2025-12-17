import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Landing() {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-64px)] font-sans relative overflow-hidden">
      
      {/* ================= FONDO CON TEXTURA DE PUNTOS (BLOQUEADO 🔒) ================= */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
      
      {/* ================= SECCIÓN IZQUIERDA (BLOQUEADA 🔒) ================= */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 py-12 md:px-16 lg:px-24 z-10">
        
        {/* Etiqueta superior */}
        <span className="mb-6 inline-block w-fit px-3 py-1 bg-black text-white rounded-md text-xs font-bold tracking-widest uppercase shadow-lg">
          TakeMeAway
        </span>
        
        {/* Titular */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-black leading-tight mb-6 tracking-tight">
          Muévete <br />
          con clase.
        </h1>
        
        {/* Subtítulo */}
        <p className="text-xl text-gray-600 mb-10 max-w-lg leading-relaxed font-medium">
          La plataforma de transporte que prioriza tu tiempo y comodidad.
          Conductores profesionales a un clic de distancia.
        </p>

        {/* BOTONES */}
        <div className="flex flex-col sm:flex-row gap-4 w-full mb-12">
          <Link to="/register" className="w-full sm:w-auto">
            <button className="w-full px-8 py-4 bg-black text-white text-lg font-bold rounded-lg hover:bg-gray-800 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
              Empezar Ahora
            </button>
          </Link>
          
          <Link to="/login" className="w-full sm:w-auto">
            <button className="w-full px-8 py-4 bg-white text-black border-2 border-black text-lg font-bold rounded-lg hover:bg-gray-50 transition-all duration-300">
              Iniciar Sesión
            </button>
          </Link>
        </div>

        {/* CARACTERÍSTICAS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 border-t border-gray-200 pt-8">
            <div className="group p-2 transition-all">
                <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-300 inline-block">🛡️</div>
                <h3 className="font-bold text-gray-900">Seguridad</h3>
                <p className="text-xs text-gray-500 mt-1">Viajes monitorizados y seguros.</p>
            </div>
            <div className="group p-2 transition-all">
                <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-300 inline-block">⚡</div>
                <h3 className="font-bold text-gray-900">Rapidez</h3>
                <p className="text-xs text-gray-500 mt-1">Tu conductor en menos de 5 min.</p>
            </div>
            <div className="group p-2 transition-all">
                <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-300 inline-block">💎</div>
                <h3 className="font-bold text-gray-900">Calidad</h3>
                <p className="text-xs text-gray-500 mt-1">Coches de gama alta y limpios.</p>
            </div>
        </div>

      </div>

      {/* ================= SECCIÓN DERECHA (IMAGEN DE CIUDAD NOCTURNA) ================= */}
      <div className="w-full lg:w-1/2 relative min-h-[500px] lg:h-auto bg-black">
        <img 
          // FOTO: Tráfico nocturno abstracto, elegante, luces de ciudad.
          src="https://images.unsplash.com/photo-1495435229349-e86db7bfa013?q=80&w=1974&auto=format&fit=crop"
          alt="Conducción nocturna ciudad" 
          className="w-full h-full object-cover opacity-90"
        />
        
        {/* Degradado lateral para fundir con el blanco */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white via-white/10 to-transparent hidden lg:block"></div>
      </div>

    </div>
  );
}