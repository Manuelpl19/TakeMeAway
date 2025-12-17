<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
{
    Schema::create('pagos', function (Blueprint $table) {
        $table->id();
        $table->decimal('cantidad', 8, 2);
        $table->string('metodo_pago');
        $table->foreignId('usuario_id')->constrained('usuarios'); 
        $table->timestamps();
    });
}

public function down()
{
    Schema::dropIfExists('pagos');
}

};
