<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Bono;

class BonoSeeder extends Seeder
{
    public function run()
    {
        // Insertar bonos de prueba
        Bono::create([
            'usuario_id' => 1,  // ID de usuario
            'viajes' => 5,
        ]);

        Bono::create([
            'usuario_id' => 2,  // ID de usuario
            'viajes' => 10,
        ]);
    }
}
