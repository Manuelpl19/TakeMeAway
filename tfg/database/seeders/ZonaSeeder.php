<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Zona;

class ZonaSeeder extends Seeder
{
    public function run()
    {
        // Crear algunas zonas manualmente
        Zona::create(['nombre' => 'Centro de Córdoba']);
        Zona::create(['nombre' => 'Centro de Málaga']);
        Zona::create(['nombre' => 'Centro de Sevilla']);

        
    }
}
