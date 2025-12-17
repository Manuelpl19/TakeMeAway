<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Usuario;

class UsuarioSeeder extends Seeder
{
    public function run()
    {
        $usuarios = [
            [
                'email'           => 'juan@example.com',
                'name'          => 'Juan Pérez',
                'password'        => bcrypt('123456'),
                'cantidad_viajes' => 10,
                'zona_id'         => 1,
                'role'            => 'usuario',
            ],
            [
                'email'           => 'maria@example.com',
                'name'          => 'María López',
                'password'        => bcrypt('123456'),
                'cantidad_viajes' => 20,
                'zona_id'         => 2,
                'role'            => 'usuario',
            ],
            [
                'email'           => 'pedro@example.com',
                'name'          => 'Pedro García',
                'password'        => bcrypt('123456'),
                'cantidad_viajes' => 15,
                'zona_id'         => 3,
                'role'            => 'usuario',
            ],
        ];

        foreach ($usuarios as $data) {
            Usuario::updateOrCreate(
                ['email' => $data['email']],
                $data
            );
        }
    }
}
