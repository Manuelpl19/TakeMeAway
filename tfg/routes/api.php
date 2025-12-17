<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ViajeController;
use App\Http\Controllers\ConductorController;



Route::post('register', [AuthController::class, 'register']);
Route::post('login',    [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('logout',          [AuthController::class, 'logout']);
    Route::get('usuarios/me',      [AuthController::class, 'me']);

    Route::post('/calcular-precios', [ViajeController::class, 'calcularPrecios']);    // Guardar un viaje
    Route::post( 'viajes', [ViajeController::class, 'store']);
    // Listar los viajes del usuario
    Route::get('viajes', [ViajeController::class, 'index']);

    Route::apiResource('conductores', ConductorController::class);
    // … demás resources si lo necesitas
});
