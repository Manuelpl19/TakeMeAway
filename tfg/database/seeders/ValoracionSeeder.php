<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Valoracion;

class ValoracionSeeder extends Seeder
{
    public function run()
    {
        Valoracion::create([
            'usuario_id' => 1,  
            'estrellas' => 5,
            'mensaje' => 'Excelente servicio.',
        ]);

        Valoracion::create([
            'usuario_id' => 2,
            'estrellas' => 4,
            'mensaje' => 'Buen servicio, aunque se retrasó un poco.',
        ]);
    }
}
