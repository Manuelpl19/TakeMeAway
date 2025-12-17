<?php


namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Sucursal;

class SucursalSeeder extends Seeder
{
    public function run()
    {
        Sucursal::create([
            'codigo' => 001,
        ]);

        Sucursal::create([
            'codigo' => 002,
        ]);
    }
}
