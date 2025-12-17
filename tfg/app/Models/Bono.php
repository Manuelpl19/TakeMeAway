<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bono extends Model
{
    use HasFactory;

    protected $fillable = ['viajes', 'usuario_id'];

    // Relación con Usuario
    public function usuario()
    {
        return $this->belongsTo(Usuario::class);
    }
}
