<?php

namespace App\Http\Controllers;

use App\Models\Vehiculo;
use Illuminate\Http\Request;

class VehiculoController extends Controller
{
    public function index()
    {
        return response()->json(Vehiculo::all());
    }

    public function store(Request $request)
    {
        $vehiculo = Vehiculo::create($request->all());
        return response()->json($vehiculo, 201);
    }

    public function show(Vehiculo $vehiculo)
    {
        return response()->json($vehiculo);
    }

    public function update(Request $request, Vehiculo $vehiculo)
    {
        $vehiculo->update($request->all());
        return response()->json($vehiculo);
    }

    public function destroy(Vehiculo $vehiculo)
    {
        $vehiculo->delete();
        return response()->json(null, 204);
    }
}
