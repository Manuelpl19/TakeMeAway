import React, { useState } from 'react';

function Buscador({ onSearch }) {
  const [busqueda, setBusqueda] = useState('');

  const obtenerValor = (e) => {
    const valor = e.target.value;
    setBusqueda(valor);
    onSearch(valor);
  };

  return (
    <div className="mt-2 relative">
            <svg xmlns="http://www.w3.org/2000/svg" className="mb-6 absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input type="text" onChange={obtenerValor} placeholder="Buscar" className="w-full py-3 pl-12 pr-4 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600" />
          </div>
  );
}

export default Buscador;
