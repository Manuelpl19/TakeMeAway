<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Viaje;
use App\Models\Conductor;
use Illuminate\Support\Facades\Mail;
use App\Mail\ViajeSolicitado; // ver más abajo
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;


class ViajeController extends Controller
{
    /** GET /api/viajes?usuario_id=... */
    public function index(Request $req)
    {
        $req->validate([
            'usuario_id' => 'required|integer|exists:usuarios,id',
        ]);
        $viajes = Viaje::where('usuario_id', $req->usuario_id)->get();
        return response()->json($viajes, 200);
    }

    /** POST /api/calcular-precios */
    public function calcularPrecios(Request $req)
    {
        $req->validate([
            'latB' => 'required|numeric',
            'lngB' => 'required|numeric',
            'latC' => 'required|numeric',
            'lngC' => 'required|numeric',
        ]);

        // 1. Intentamos buscar en la Base de Datos
        // Usamos 'get()' simple sin relaciones complejas para evitar fallos
        $conductoresDB = Conductor::all(); 

        $resultados = [];

        // Distancia del viaje (Cliente -> Destino)
        $distanciaViaje = $this->haversine($req->latB, $req->lngB, $req->latC, $req->lngC);
        $precioBase = 2.50 + ($distanciaViaje * 1.10);
        if ($precioBase < 3.50) $precioBase = 3.50;

        // 2. Si la BD está vacía, CREAMOS CONDUCTORES FALSOS (Salvavidas para la Demo 🆘)
        if ($conductoresDB->isEmpty()) {
            $resultados = [
                [
                    'id' => 999, // ID falso
                    'nombre' => 'Conductor',
                    'apellidos' => 'Demo 1',
                    'email' => 'demo1@test.com',
                    'lat_inicio' => $req->latB, // Lo ponemos al lado del usuario
                    'lng_inicio' => $req->lngB,
                    'precio' => round($precioBase, 2),
                    'distancia_conductor' => '0.1 km'
                ],
                [
                    'id' => 888,
                    'nombre' => 'María',
                    'apellidos' => 'Express',
                    'email' => 'maria@test.com',
                    'lat_inicio' => $req->latB,
                    'lng_inicio' => $req->lngB,
                    'precio' => round($precioBase * 1.05, 2), // Un poco más caro
                    'distancia_conductor' => '0.5 km'
                ]
            ];
            
            // Devolvemos los falsos y terminamos aquí
            return response()->json($resultados, 200);
        }

        // 3. Si SÍ hay datos en la BD, procesamos los reales
        foreach ($conductoresDB as $c) {
            // Intentamos sacar nombre/email de forma segura
            $nombre = $c->nombre ?? ($c->usuario ? $c->usuario->name : 'Conductor');
            $email  = $c->email  ?? ($c->usuario ? $c->usuario->email : 'sin@email.com');

            $resultados[] = [
                'id'         => $c->id,
                'nombre'     => $nombre,
                'apellidos'  => $c->apellidos ?? '',
                'email'      => $email,
                'lat_inicio' => $c->lat_inicio,
                'lng_inicio' => $c->lng_inicio,
                'precio'     => round($precioBase * (1 + (rand(-5, 5)/100)), 2),
                'distancia_conductor' => '1.2 km' // Simulado
            ];
        }

        return response()->json($resultados, 200);
    }
    /** POST /api/viajes */
    public function store(Request $req)
    {
        $req->validate([
            'conductor_id' => 'required|integer|exists:conductores,id',
            'lat_inicio'   => 'required|numeric',
            'lng_inicio'   => 'required|numeric',
            'lat_fin'      => 'required|numeric',
            'lng_fin'      => 'required|numeric',
            'precio'       => 'required|numeric',
        ]);

        // calcula kilómetros reales entre B y C
        $km = $this->haversine(
            $req->lat_inicio, $req->lng_inicio,
            $req->lat_fin,    $req->lng_fin
        );

        $viaje = Viaje::create([
            'usuario_id'   => Auth::id(),
            'conductor_id' => $req->conductor_id,
            'lat_inicio'   => $req->lat_inicio,
            'lng_inicio'   => $req->lng_inicio,
            'lat_fin'      => $req->lat_fin,
            'lng_fin'      => $req->lng_fin,
            'precio'       => $req->precio,
            'kilometros'   => round($km, 2),
        ]);

        // envía correo al conductor
        $conductor = Conductor::findOrFail($req->conductor_id);
        try {
            Mail::to($conductor->usuario->email)
                ->send(new ViajeSolicitado($viaje));
        } catch (\Throwable $e) {
            Log::error('Error enviando correo: ' . $e->getMessage());
            // Si falla el envío simplemente continuamos
        }

        return response()->json($viaje, 201);
    }

    /** Haversine en km */
    private function haversine($lat1, $lon1, $lat2, $lon2)
    {
        $R = 6371; // radio Tierra en km
        $dLat = deg2rad($lat2 - $lat1);
        $dLon = deg2rad($lon2 - $lon1);
        $a = sin($dLat/2) * sin($dLat/2)
           + cos(deg2rad($lat1)) * cos(deg2rad($lat2))
           * sin($dLon/2) * sin($dLon/2);
        $c = 2 * atan2(sqrt($a), sqrt(1-$a));
        return $R * $c;
    }
}
