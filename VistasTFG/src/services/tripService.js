import api from './api';

export default {
  // 1. Calcular precios y buscar conductores cercanos
  calculatePrices: async (origin, destination) => {
    // origin y destination son arrays: [lat, lng]
    const payload = {
      latB: origin[0],
      lngB: origin[1],
      latC: destination[0],
      lngC: destination[1],
    };
    
    // Llamada al endpoint que crearemos en Laravel
    const response = await api.post('/calcular-precios', payload);
    return response.data;
  },

  // 2. Confirmar la reserva
  bookTrip: async (tripData) => {
    const response = await api.post('/viajes', tripData);
    return response.data;
  }
};