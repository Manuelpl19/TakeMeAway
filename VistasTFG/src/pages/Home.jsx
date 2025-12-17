// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { useLocation } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet-routing-machine';

function Routing({ waypoints, profile }) {
  const map = useMap();
  useEffect(() => {
    if (!map) return;
    const control = L.Routing.control({
      waypoints,
      router: L.Routing.osrmv1({
        serviceUrl: 'https://router.project-osrm.org/route/v1',
        profile,
      }),
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      showAlternatives: false,
    }).addTo(map);
    return () => map.removeControl(control);
  }, [map, waypoints, profile]);
  return null;
}

export default function Home() {
  const { state } = useLocation();
  const {
    locationA: initA = '37.878865,-4.779342',
    locationB: initB = '37.888200,-4.779400',
    locationC: initC = '37.892500,-4.752778',
  } = state || {};

  const [locA, setLocA] = useState(initA);
  const [locB, setLocB] = useState(initB);
  const [locC, setLocC] = useState(initC);

  // Helper: string → LatLng
  const toLatLng = str => {
    const [lat, lng] = str.split(',').map(Number);
    return L.latLng(lat, lng);
  };

  const A = toLatLng(locA);
  const B = toLatLng(locB);
  const C = toLatLng(locC);

  return (
    <div className="flex min-h-screen">
      {/* Panel */}
      <div className="w-1/3 p-6">
        <h1 className="text-2xl font-bold mb-4">TAKEMEAWAY</h1>
        <p><strong>Salida (A):</strong> {locA}</p>
        <p><strong>Tu ubicación (B):</strong> {locB}</p>
        <p><strong>Destino (C):</strong> {locC}</p>
      </div>

      {/* Mapa */}
      <div className="flex-1">
        <MapContainer
          center={B}
          zoom={13}
          style={{ width: '100%', height: '100vh' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          <Marker position={A}>
            <Popup>Punto A</Popup>
          </Marker>
          <Marker position={B}>
            <Popup>Tu ubicación</Popup>
          </Marker>
          <Marker position={C}>
            <Popup>Destino</Popup>
          </Marker>

          {/* Ruta A→B andando */}
          <Routing waypoints={[A, B]} profile="foot" />

          {/* Ruta B→C en coche */}
          <Routing waypoints={[B, C]} profile="car" />
        </MapContainer>
      </div>
    </div>
  );
}
