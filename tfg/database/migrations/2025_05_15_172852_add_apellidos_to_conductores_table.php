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
        // Solo añadimos 'apellidos' si NO existe ya
        if (! Schema::hasColumn('conductores', 'apellidos')) {
            Schema::table('conductores', function (Blueprint $table) {
                $table->string('apellidos')
                      ->nullable()
                      ->after('nombre');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Solo eliminamos 'apellidos' si existe
        if (Schema::hasColumn('conductores', 'apellidos')) {
            Schema::table('conductores', function (Blueprint $table) {
                $table->dropColumn('apellidos');
            });
        }
    }
};
