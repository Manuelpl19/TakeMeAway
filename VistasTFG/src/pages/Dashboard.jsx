import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';

// Servicios y Contexto
import tripService from '../services/tripService';
import { useAuth } from '../contexts/AuthContext';
import QRPayment from '../components/QRPayment';

// ----------------------------------------------------------------------
// CONFIGURACIÓN DE ICONOS
// ----------------------------------------------------------------------
import iconMarker from 'leaflet/dist/images/marker-icon.png';
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
    iconUrl: iconMarker,
    iconRetinaUrl: iconRetina,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// Icono Rojo para destino
const RedIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

// ----------------------------------------------------------------------
// COMPONENTE DE RUTAS (Leaflet Routing Machine)
// ----------------------------------------------------------------------
function RoutingControl({ origin, destination, color }) {
  const map = useMapEvents({});

  useEffect(() => {
    if (!map || !origin || !destination) return;

    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(origin[0], origin[1]),
        L.latLng(destination[0], destination[1])
      ],
      router: L.Routing.osrmv1({
        serviceUrl: 'https://router.project-osrm.org/route/v1',
        profile: 'car'
      }),
      lineOptions: {
        styles: [{ color: color || '#6FA1EC', weight: 4 }]
      },
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      showAlternatives: false,
      createMarker: () => null
    }).addTo(map);

    return () => map.removeControl(routingControl);
  }, [map, origin, destination, color]);

  return null;
}

// ----------------------------------------------------------------------
// COMPONENTE PRINCIPAL (DASHBOARD)
// ----------------------------------------------------------------------
export default function Dashboard() {
  const { user } = useAuth();

  // Estados
  const [userLocation, setUserLocation] = useState(null); // Punto B
  const [destination, setDestination] = useState(null);   // Punto C
  const [address, setAddress] = useState('');             // Nombre de la calle (Texto)
  
  const [drivers, setDrivers] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState(null);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [tripConfirmed, setTripConfirmed] = useState(false);
  const [paymentLink, setPaymentLink] = useState('');

  // 1. Geolocalización al iniciar
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
        },
        () => {
          // Fallback (Córdoba)
          setUserLocation([37.888175, -4.779383]);
        }
      );
    } else {
      setUserLocation([37.888175, -4.779383]);
    }
  }, []);

  // ------------------------------------------------------
  // FUNCIÓN: Geocoding Inverso (Coords -> Texto)
  // ------------------------------------------------------
  const getStreetName = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const data = await response.json();
      
      // Intentamos construir una dirección limpia
      const calle = data.address.road || data.address.pedestrian || data.address.street || data.name;
      const numero = data.address.house_number || '';
      
      if (calle) {
        return numero ? `${calle}, ${numero}` : calle;
      }
      
      // Fallback si no hay calle exacta
      return data.display_name.split(',')[0];
      
    } catch (error) {
      console.error("Error obteniendo dirección:", error);
      return `${lat.toFixed(4)}, ${lng.toFixed(4)}`; // Si falla, devolvemos números
    }
  };

  // ------------------------------------------------------
  // MANEJADOR DE CLICS EN EL MAPA
  // ------------------------------------------------------
  function MapClickHandler() {
    useMapEvents({
      click: async (e) => {
        if (tripConfirmed) return; // Bloquear si ya hay viaje
        
        const { lat, lng } = e.latlng;
        
        // 1. Actualizamos coordenadas y reseteamos estados
        setDestination([lat, lng]);
        setDrivers([]);
        setSelectedDriver(null);
        setError('');

        // 2. Feedback visual inmediato
        setAddress("Calculando dirección..."); 
        
        // 3. Llamada a la API de nombres de calles
        const calleReal = await getStreetName(lat, lng);
        setAddress(calleReal);
      }
    });
    return null;
  }

  // ------------------------------------------------------
  // ACCIONES DEL USUARIO
  // ------------------------------------------------------
  
  // Buscar Conductores
  const handleSearchDrivers = async () => {
    if (!userLocation || !destination) {
      setError('Por favor, selecciona un destino en el mapa.');
      return;
    }
    setLoading(true);
    setError('');
    
    try {
      const data = await tripService.calculatePrices(userLocation, destination);
      setDrivers(data);
    } catch (err) {
      console.error(err);
      setError('Error al calcular precios. Asegúrate de que el backend está corriendo.');
    } finally {
      setLoading(false);
    }
  };

  // Confirmar Viaje
  const handleConfirmTrip = async () => {
    if (!selectedDriver) return;

    try {
      const tripData = {
        conductor_id: selectedDriver.id,
        lat_inicio: userLocation[0],
        lng_inicio: userLocation[1],
        lat_fin: destination[0],
        lng_fin: destination[1],
        precio: selectedDriver.precio,
      };

      await tripService.bookTrip(tripData);
      
      // Link de pago (Mock)
      const revolutLink = import.meta.env.VITE_REVOLUT_LINK || '#';
      const finalLink = `${revolutLink}?amount=${selectedDriver.precio}&currency=EUR`;
      
      setPaymentLink(finalLink);
      setTripConfirmed(true);

    } catch (err) {
      console.error(err);
      setError('Hubo un problema al registrar tu viaje.');
    }
  };

  if (!userLocation) return <div className="flex h-screen items-center justify-center">Cargando mapa...</div>;

  return (
    <div className="flex h-[calc(100vh-64px)]">
      
      {/* ---------------- PANEL IZQUIERDO ---------------- */}
      <div className="w-full md:w-1/3 p-6 bg-white shadow-xl z-10 overflow-y-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Pedir un viaje</h1>
        <p className="text-gray-500 text-sm mb-6">Hola, {user?.name || user?.email}</p>

        {/* Info de ruta */}
        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 mb-6 space-y-3">
            {/* ORIGEN */}
            <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                <div className="text-sm">
                    <p className="text-gray-500 text-xs">Origen</p>
                    <p className="font-medium text-gray-700">Tu ubicación actual</p>
                </div>
            </div>
            
            <div className="h-4 border-l border-gray-300 ml-1.5"></div>
            
            {/* DESTINO (Aquí está el cambio visual importante) */}
            <div className="flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                <div className="text-sm w-full">
                    <p className="text-gray-500 text-xs">Destino</p>
                    <p className="font-medium text-gray-700 truncate" title={address}>
                        {destination 
                            ? (address || 'Cargando dirección...') 
                            : 'Haz clic en el mapa'}
                    </p>
                </div>
            </div>
        </div>

        {/* Error Feedback */}
        {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4 border border-red-100">
                {error}
            </div>
        )}

        {/* Botón Buscar */}
        {!tripConfirmed && !drivers.length && (
            <button
                onClick={handleSearchDrivers}
                disabled={!destination || loading}
                className={`w-full py-3 rounded-lg font-semibold text-white transition-all ${
                    !destination || loading 
                    ? 'bg-gray-300 cursor-not-allowed' 
                    : 'bg-black hover:bg-gray-800 shadow-lg hover:shadow-xl'
                }`}
            >
                {loading ? 'Calculando rutas...' : 'Ver precios y coches'}
            </button>
        )}

        {/* Lista de Conductores */}
        {!tripConfirmed && drivers.length > 0 && (
            <div className="space-y-3 mb-6 animate-fadeIn">
                <h3 className="font-semibold text-gray-700">Conductores disponibles:</h3>
                {drivers.map(driver => (
                    <div 
                        key={driver.id}
                        onClick={() => setSelectedDriver(driver)}
                        className={`p-4 rounded-xl border cursor-pointer transition-all flex justify-between items-center ${
                            selectedDriver?.id === driver.id 
                            ? 'border-black bg-gray-50 ring-1 ring-black' 
                            : 'border-gray-200 hover:border-gray-400'
                        }`}
                    >
                        <div>
                            <p className="font-bold text-gray-800">{driver.nombre} {driver.apellidos}</p>
                            <p className="text-xs text-gray-500">
                                {driver.distancia_conductor ? `A ${driver.distancia_conductor}` : 'Cerca'} • Toyota Prius
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="font-bold text-lg">{driver.precio}€</p>
                        </div>
                    </div>
                ))}
                
                {selectedDriver && (
                    <button
                        onClick={handleConfirmTrip}
                        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-bold shadow-lg mt-4"
                    >
                        Pagar y Reservar
                    </button>
                )}
            </div>
        )}

        {/* Estado Confirmado */}
        {tripConfirmed && (
            <div className="bg-green-50 p-6 rounded-xl text-center border border-green-200 animate-fadeIn">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                    ✓
                </div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">¡Viaje Reservado!</h2>
                <p className="text-gray-600 text-sm mb-4">Tu conductor viene en camino.</p>
                
                {paymentLink && <QRPayment url={paymentLink} />}
                
                <button 
                    onClick={() => window.location.reload()} 
                    className="mt-6 text-sm text-gray-500 underline"
                >
                    Pedir otro viaje
                </button>
            </div>
        )}
      </div>

      {/* ---------------- MAPA ---------------- */}
      <div className="flex-1 relative bg-gray-200">
        <MapContainer
            center={userLocation}
            zoom={15}
            style={{ width: '100%', height: '100%' }}
            zoomControl={false}
        >
            <TileLayer
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                attribution='&copy; OpenStreetMap & CartoDB'
            />
            
            <Marker position={userLocation}>
                <Popup>Estás aquí</Popup>
            </Marker>

            {destination && (
                <Marker position={destination} icon={RedIcon} />
            )}

            {destination && (
                <RoutingControl 
                    origin={userLocation} 
                    destination={destination} 
                    color="#000000"
                />
            )}

            <MapClickHandler />
        </MapContainer>
      </div>
    </div>
  );
}