<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $this->call([
            ZonaSeeder::class,
            UsuarioSeeder::class,
            SucursalSeeder::class,
            ConductorSeeder::class,
            ViajeSeeder::class,
            PagoSeeder::class,
            ValoracionSeeder::class,
            BonoSeeder::class,
        ]);
    }
}
