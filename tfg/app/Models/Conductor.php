<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Conductor extends Model
{
    use HasFactory;

    // Tabla en español
    protected $table = 'conductores';

    // Solo estas columnas son válidas ahora
    protected $fillable = [
        'usuario_id',
        'nombre',
        'apellidos',
        'zona_id',
        'valoracion',
        'lat_inicio',
        'lng_inicio',
    ];

    // Relación con Usuario (para sacar el email)
    public function usuario()
    {
        return $this->belongsTo(\App\Models\Usuario::class, 'usuario_id');
    }

    // Relación con Zona
    public function zona()
    {
        return $this->belongsTo(\App\Models\Zona::class, 'zona_id');
    }

     public function viajes()
    {
        return $this->hasMany(\App\Models\Viaje::class);
    }
}
