<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sucursal extends Model
{
    use HasFactory;
    protected $table = 'sucursales';  


    protected $fillable = ['codigo'];

    // Relación de 1 a muchos con conductores
    public function conductores()
    {
        return $this->hasMany(Conductor::class);
    }
}
