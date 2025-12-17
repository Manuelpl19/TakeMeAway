<?php

namespace App\Http\Controllers;

use App\Models\PersonalAccessToken;
use Illuminate\Http\Request;

class PersonalAccessTokenController extends Controller
{
    public function index()
    {
        return response()->json(PersonalAccessToken::all());
    }

    public function store(Request $request)
    {
        $token = PersonalAccessToken::create($request->all());
        return response()->json($token, 201);
    }

    public function show(PersonalAccessToken $token)
    {
        return response()->json($token);
    }

    public function update(Request $request, PersonalAccessToken $token)
    {
        $token->update($request->all());
        return response()->json($token);
    }

    public function destroy(PersonalAccessToken $token)
    {
        $token->delete();
        return response()->json(null, 204);
    }
}
