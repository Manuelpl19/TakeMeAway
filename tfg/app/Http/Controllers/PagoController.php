<?php

namespace App\Http\Controllers;

use App\Models\Pago;
use Illuminate\Http\Request;

class PagoController extends Controller
{
    public function index()
    {
        return response()->json(Pago::all());
    }

    public function store(Request $request)
    {
        $pago = Pago::create($request->all());
        return response()->json($pago, 201);
    }

    public function show(Pago $pago)
    {
        return response()->json($pago);
    }

    public function update(Request $request, Pago $pago)
    {
        $pago->update($request->all());
        return response()->json($pago);
    }

    public function destroy(Pago $pago)
    {
        $pago->delete();
        return response()->json(null, 204);
    }
}
