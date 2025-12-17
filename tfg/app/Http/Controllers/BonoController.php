<?php

namespace App\Http\Controllers;

use App\Models\Bono;
use Illuminate\Http\Request;

class BonoController extends Controller
{
    public function index()
    {
        return response()->json(Bono::all());
    }

    public function store(Request $request)
    {
        $bono = Bono::create($request->all());
        return response()->json($bono, 201);
    }

    public function show(Bono $bono)
    {
        return response()->json($bono);
    }

    public function update(Request $request, Bono $bono)
    {
        $bono->update($request->all());
        return response()->json($bono);
    }

    public function destroy(Bono $bono)
    {
        $bono->delete();
        return response()->json(null, 204);
    }
}
