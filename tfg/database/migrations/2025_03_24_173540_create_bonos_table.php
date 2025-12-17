<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('bonos', function (Blueprint $table) {
            $table->id();
            $table->integer('viajes'); // Número de viajes necesarios para obtener el bono
            $table->foreignId('usuario_id')->constrained('usuarios'); // Relación con usuarios
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('bonos');
    }

};
