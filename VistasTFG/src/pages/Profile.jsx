"use client"
import { useAuth } from "../contexts/AuthContext.jsx"
import { useEffect, useState } from "react"
import api from "../services/api.js"

export default function Perfil() {
  const { user } = useAuth()
  const [viajesCount, setViajesCount] = useState(null)
  const [ultimoViaje, setUltimoViaje] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return

    api.get(`/viajes?usuario_id=${user.id}`)
      .then(res => {
        const viajes = res.data
        setViajesCount(viajes.length)

        if (viajes.length > 0) {
          const viajeMasReciente = viajes.sort((a, b) =>
            new Date(b.created_at) - new Date(a.created_at)
          )[0]
          setUltimoViaje(viajeMasReciente.created_at)
        }
      })
      .catch(() => {
        setViajesCount(0)
        setUltimoViaje(null)
      })
      .finally(() => setLoading(false))
  }, [user])

  if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )

  if (!user)
    return <p className="p-10 text-2xl text-center">No se ha podido cargar el perfil. Por favor, inicia sesión.</p>

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-indigo-50 to-white">
      <main className="flex-1 px-6 py-12 sm:px-12 lg:px-24">
        <div className="w-full">
          <section className="mb-14 text-center">
            <h1 className="text-5xl font-extrabold text-gray-900 mb-3">Hola, {user.name}</h1>
            <p className="text-lg text-gray-600">Este es tu panel personal de usuario</p>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
            <InfoCard
              label="Correo electrónico"
              value={user.email}
              iconPath="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
            />

            <InfoCard
              label="ID de Usuario"
              value={user.id}
              iconPath="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1"
            />

            <InfoCard
              label="Viajes Realizados"
              value={viajesCount ?? 0}
              iconPath="M13 10V3L4 14h7v7l9-11h-7z"
              valueClass="text-4xl font-extrabold text-indigo-700"
            />
          </section>

          <section className="bg-white rounded-2xl shadow-xl border px-10 py-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <DateInfo label="Miembro desde" date={user.created_at} />
              <DateInfo label="Último viaje" date={ultimoViaje} fallback="Sin viajes aún" />
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

function InfoCard({ label, value, iconPath, valueClass = "text-2xl font-semibold text-gray-900" }) {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-8 flex items-center space-x-6 hover:shadow-lg transition-all duration-200">
      <div className="bg-indigo-100 text-indigo-600 rounded-full p-4">
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={iconPath} />
        </svg>
      </div>
      <div>
        <p className="text-lg text-gray-500 font-medium">{label}</p>
        <p className={`${valueClass}`}>{value}</p>
      </div>
    </div>
  )
}

function DateInfo({ label, date, fallback = "No disponible" }) {
  const formatted = date
    ? new Date(date).toLocaleDateString("es-ES", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : fallback

  return (
    <div>
      <p className="text-lg text-gray-500 font-medium mb-2">{label}</p>
      <p className="text-2xl font-bold text-gray-800">{formatted}</p>
    </div>
  )
}