<!DOCTYPE html>
<html>
  <head><meta charset="utf-8"><title>Viaje solicitado</title></head>
  <body>
    <h1>¡Tienes un nuevo viaje!</h1>
    <p>Hola {{ $viaje->conductor->nombre }},</p>
    <p>El usuario <strong>{{ $viaje->usuario->name }}</strong> te ha solicitado un viaje:</p>
    <ul>
      <li>Origen (B): {{ $viaje->lat_inicio }}, {{ $viaje->lng_inicio }}</li>
      <li>Destino (C): {{ $viaje->lat_fin }}, {{ $viaje->lng_fin }}</li>
      <li>Precio estimado: {{ $viaje->precio }} €</li>
      <li>Kilómetros calculados: {{ $viaje->kilometros }} km</li>
    </ul>
    <p>Gracias por usar TakeMeAway.</p>
  </body>
</html>
