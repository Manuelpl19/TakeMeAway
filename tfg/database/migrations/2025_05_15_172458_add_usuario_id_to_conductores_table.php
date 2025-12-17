<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Solo añadimos usuario_id si NO existe ya
        if (! Schema::hasColumn('conductores', 'usuario_id')) {
            Schema::table('conductores', function (Blueprint $table) {
                $table->foreignId('usuario_id')
                      ->after('id')
                      ->constrained('usuarios')
                      ->cascadeOnDelete();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Solo eliminamos usuario_id si existe
        if (Schema::hasColumn('conductores', 'usuario_id')) {
            Schema::table('conductores', function (Blueprint $table) {
                $table->dropForeign(['usuario_id']);
                $table->dropColumn('usuario_id');
            });
        }
    }
};
