<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Zona extends Model
{
    use HasFactory;

    protected $fillable = ['nombre'];

    // Relación de 1 a muchos con conductores
    public function conductores()
    {
        return $this->hasMany(Conductor::class);
    }
}
