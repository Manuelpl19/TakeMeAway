<?php

namespace App\Http\Controllers;

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration
{
    public function up()
    {
            Schema::create('viajes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('usuario_id')->constrained('usuarios');
            $table->foreignId('conductor_id')->constrained('conductores');
            $table->decimal('lat_inicio', 10, 7);
            $table->decimal('lng_inicio', 10, 7);
            $table->decimal('lat_fin', 10, 7);
            $table->decimal('lng_fin', 10, 7);
            $table->decimal('kilometros', 8, 2);
            $table->decimal('precio', 8, 2);
            $table->timestamps();
        });
    }

     public function down()
    {
            Schema::dropIfExists('viajes');
    }
    };
