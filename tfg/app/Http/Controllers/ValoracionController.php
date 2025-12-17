<?php

namespace App\Http\Controllers;

use App\Models\Valoracion;
use Illuminate\Http\Request;

class ValoracionController extends Controller
{
    public function index()
    {
        return response()->json(Valoracion::all());
    }

    public function store(Request $request)
    {
        $valoracion = Valoracion::create($request->all());
        return response()->json($valoracion, 201);
    }

    public function show(Valoracion $valoracion)
    {
        return response()->json($valoracion);
    }

    public function update(Request $request, Valoracion $valoracion)
    {
        $valoracion->update($request->all());
        return response()->json($valoracion);
    }

    public function destroy(Valoracion $valoracion)
    {
        $valoracion->delete();
        return response()->json(null, 204);
    }
}
