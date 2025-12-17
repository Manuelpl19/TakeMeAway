<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Usuario;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $req)
    {
        $req->validate([
            'name'     => 'required|string',
            'email'    => 'required|email|unique:usuarios,email',
            'password' => 'required|confirmed|min:6',
        ]);

        $user = Usuario::create([
            'name'     => $req->name,
            'email'    => $req->email,
            'password' => Hash::make($req->password),
        ]);

        $token = $user->createToken('api-token')->plainTextToken;

        return response()->json(['user'=>$user,'token'=>$token], 201);
    }

    public function login(Request $req)
    {
        $req->validate([
            'email'    => 'required|email',
            'password' => 'required',
        ]);

        $user = Usuario::where('email', $req->email)->firstOrFail();
        if (! Hash::check($req->password, $user->password)) {
            return response()->json(['message'=>'Credenciales inválidas'], 401);
        }

        $token = $user->createToken('api-token')->plainTextToken;
        return response()->json(['user'=>$user,'token'=>$token], 200);
    }

    public function logout(Request $req)
    {
        $req->user()->currentAccessToken()->delete();
        return response()->json(null,204);
    }

    /** Devuelve el usuario autenticado */
    public function me(Request $req)
    {
        return response()->json($req->user(), 200);
    }
}
