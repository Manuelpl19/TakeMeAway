<?php

namespace App\Http\Controllers;

use App\Models\Conductor;
use Illuminate\Http\Request;

class ConductorController extends Controller
{
    public function index()
{
    return response()->json(
        Conductor::with(['usuario', 'zona']) // opcional si quieres el email o zona
                 ->withCount('viajes')
                 ->get()
    );
}

    public function store(Request $request)
    {
        $conductor = Conductor::create($request->all());
        return response()->json($conductor, 201);
    }

    public function show(Conductor $conductor)
    {
        return response()->json($conductor);
    }

    public function update(Request $request, Conductor $conductor)
    {
        $conductor->update($request->all());
        return response()->json($conductor);
    }

    public function destroy(Conductor $conductor)
    {
        $conductor->delete();
        return response()->json(null, 204);
    }
}
