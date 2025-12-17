import React, { useEffect, useState } from 'react';
import api from '../services/api';

export default function Conductores() {
  const [conductores, setConductores] = useState([]);

  useEffect(() => {
    api.get('/conductores')
      .then(res => setConductores(res.data))
      .catch(err => console.error('Error al cargar conductores:', err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
          Nuestros Conductores
        </h1>

        {conductores.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">Cargando conductores...</p>
        ) : (
          <div className="flex flex-wrap justify-center gap-8">
            {conductores.map((c, i) => (
              <div
                key={i}
                className="bg-white w-64 p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center"
              >
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-2xl font-bold mb-4">
                  {c.nombre?.charAt(0).toUpperCase() ?? 'C'}
                </div>
                <h2 className="text-lg font-semibold text-gray-800">
                  {c.nombre}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  {c.usuario?.email ?? 'Sin email'}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Viajes realizados: <strong>{c.viajes_count}</strong>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}