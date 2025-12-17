<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pago extends Model
{
    use HasFactory;

    protected $fillable = ['cantidad', 'metodo_pago', 'usuario_id'];

    // Relación con Usuario
    public function usuario()
    {
        return $this->belongsTo(Usuario::class);
    }
}
