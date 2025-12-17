<?php

namespace App\Http\Controllers;

use App\Models\Sucursal;
use Illuminate\Http\Request;

class SucursalController extends Controller
{
    public function index()
    {
        return response()->json(Sucursal::all());
    }

    public function store(Request $request)
    {
        $sucursal = Sucursal::create($request->all());
        return response()->json($sucursal, 201);
    }

    public function show(Sucursal $sucursal)
    {
        return response()->json($sucursal);
    }

    public function update(Request $request, Sucursal $sucursal)
    {
        $sucursal->update($request->all());
        return response()->json($sucursal);
    }

    public function destroy(Sucursal $sucursal)
    {
        $sucursal->delete();
        return response()->json(null, 204);
    }
}
