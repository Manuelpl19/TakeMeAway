<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('conductores', function (Blueprint $table) {
            $table->id();

            // Relación con usuarios
            $table->foreignId('usuario_id')
                  ->constrained('usuarios')
                  ->cascadeOnDelete();

            // Email propio del conductor
            $table->string('email')->unique();

            // Datos personales
            $table->string('nombre');
            $table->string('apellidos');

            // Zona de trabajo
            $table->foreignId('zona_id')
                  ->constrained('zonas')
                  ->cascadeOnDelete();

            // Valoración media
            $table->decimal('valoracion', 5, 2)->default(0.00);

            // Ubicación inicial (latitud/longitud)
            $table->decimal('lat_inicio', 10, 6);
            $table->decimal('lng_inicio', 10, 6);

            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('conductores');
    }
};
