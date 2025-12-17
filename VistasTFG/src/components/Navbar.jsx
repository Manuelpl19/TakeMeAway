import React from "react";
import { NavLink, Link, useNavigate } from "react-router-dom"; // <--- 1. Importamos useNavigate
import Logo from "/media/logo2blanco.png"; 
import { useAuth } from "../contexts/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate(); // <--- 2. Iniciamos el hook

  // <--- 3. Nueva función para salir
  const handleLogout = async () => {
    // Truco: Primero nos vamos a la Landing (que es pública)
    navigate('/'); 
    // Y luego cerramos la sesión. 
    // Al estar ya en '/', el sistema no intentará mandarte al login.
    await logout();
  };

  const links = [
    { name: "Inicio", path: "/dashboard" }, 
    { name: "Mis Viajes", path: "/trips" },
    { name: "Conductores", path: "/driver" },
  ];

  const linkClass =
    "text-lg font-medium text-white transition-all duration-200 lg:text-base hover:text-opacity-70 focus:text-opacity-70";
  const activeLinkClass =
    "text-lg font-medium text-[#FFA726] hover:text-[#FFA726] transition-all duration-200 lg:text-base";

  return (
    <header className="sticky top-0 bg-black z-50 shadow-md">
      <div className="px-4 mx-auto max-w-7xl text-lg">
        <nav className="flex items-center justify-between h-16 lg:h-20">
          
          {/* Logo Inteligente */}
          <Link to={user ? "/dashboard" : "/"}>
            <div className="flex items-center text-white hover:opacity-80 transition">
              <img className="w-auto h-8 lg:h-10" src={Logo} alt="Logo" />
              <span className="ml-2 mt-1 font-bold tracking-wide">TakeMeAway</span>
            </div>
          </Link>

          {/* Enlaces de navegación */}
          {user && (
            <div className="hidden md:flex md:items-center md:space-x-10">
              <ul className="flex items-center space-x-10">
                {links.map((link, index) => (
                  <li key={index}>
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        isActive ? activeLinkClass : linkClass
                      }
                    >
                      {link.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Botones de autenticación */}
          <div className="flex items-center gap-3 mt-4 md:mt-0">
            {!user ? (
              <>
                <Link to="/login">
                  <button className="bg-transparent border border-white text-white px-5 py-2 rounded-full font-semibold hover:bg-white hover:text-black transition duration-200">
                    Iniciar Sesión
                  </button>
                </Link>
                <Link to="/register"> 
                  <button className="bg-white text-black px-5 py-2 rounded-full font-semibold hover:bg-gray-200 transition duration-200 shadow-sm">
                    Registrarse
                  </button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/profile">
                  <button className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-full font-semibold hover:bg-gray-700 transition duration-200 border border-gray-700">
                    <span className="text-sm">👤 {user.name}</span>
                  </button>
                </Link>
                <button
                  onClick={handleLogout} // <--- 4. Usamos nuestra nueva función aquí
                  className="bg-red-600 text-white px-5 py-2 rounded-full font-semibold hover:bg-red-700 transition duration-200 text-sm"
                >
                  Salir
                </button>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}