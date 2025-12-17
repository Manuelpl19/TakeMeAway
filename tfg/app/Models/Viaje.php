<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Viaje extends Model
{
    protected $table = 'viajes';

    protected $fillable = [
        'usuario_id',
        'conductor_id',
        'lat_inicio',
        'lng_inicio',
        'lat_fin',
        'lng_fin',
        'kilometros',
        'precio',
    ];

        // Relación con Usuario para acceder a su información
    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'usuario_id');
    }

    // Relación con Conductor para usar sus datos
    public function conductor()
    {
        return $this->belongsTo(Conductor::class, 'conductor_id');
    }


}
