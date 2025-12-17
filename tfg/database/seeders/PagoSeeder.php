<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Pago;

class PagoSeeder extends Seeder
{
    public function run()
    {
        Pago::create([
            'cantidad' => 20.00,
            'metodo_pago' => 'Tarjeta',
            'usuario_id' => 1,  
        ]);

        Pago::create([
            'cantidad' => 15.50,
            'metodo_pago' => 'Efectivo',
            'usuario_id' => 2,
        ]);
    }
}
