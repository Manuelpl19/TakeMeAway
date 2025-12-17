<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{public function up()
    {
        Schema::create('valoraciones', function (Blueprint $table) {
            $table->id();
            $table->foreignId('usuario_id')->constrained('usuarios'); // Relación con usuarios
            $table->integer('estrellas'); // Estrellas de la valoración
            $table->text('mensaje'); // Mensaje de la valoración
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('valoraciones');
    }

};
