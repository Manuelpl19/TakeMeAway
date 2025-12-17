import React, { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { useAuth } from '../contexts/AuthContext.jsx'
import api from '../services/api.js'

export default function Viajes() {
  const { user } = useAuth()
  const [viajes, setViajes] = useState([])

  useEffect(() => {
    if (!user) return
    api.get(`/viajes?usuario_id=${user.id}`)
      .then(r => setViajes(r.data))
      .catch(console.error)
  }, [user])

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 text-xl">
        Cargando viajes…
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-indigo-50 px-6 py-12 sm:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl p-10 border">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-10 text-center">Historial de Viajes</h1>

        {viajes.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">No tienes viajes registrados aún.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left border-collapse">
              <thead>
                <tr className="bg-indigo-100 text-indigo-800">
                  <th className="px-6 py-4 text-lg font-semibold border-b">ID</th>
                  <th className="px-6 py-4 text-lg font-semibold border-b">Kilómetros</th>
                  <th className="px-6 py-4 text-lg font-semibold border-b">Fecha</th>
                </tr>
              </thead>
              <tbody>
                {viajes.map(v => (
                  <tr key={v.id} className="hover:bg-indigo-50 transition">
                    <td className="px-6 py-4 border-b text-gray-800 text-md">{v.id}</td>
                    <td className="px-6 py-4 border-b text-gray-800 text-md">{v.kilometros}</td>
                    <td className="px-6 py-4 border-b text-gray-700 text-md">
                      {format(new Date(v.created_at), 'dd/MM/yyyy - HH:mm')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}