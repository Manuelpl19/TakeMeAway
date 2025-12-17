<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Valoracion extends Model
{
    use HasFactory;
    protected $table = 'valoraciones';

    protected $fillable = ['conductor_id','usuario_id','puntuacion','comentario'];

    // Relación con Usuario
    public function usuario()
    {
        return $this->belongsTo(Usuario::class);
    }
}
