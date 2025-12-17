<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        // Sólo añadimos las columnas si NO existen aún
        if (! Schema::hasColumn('conductores', 'lat_inicio') ||
            ! Schema::hasColumn('conductores', 'lng_inicio')
        ) {
            Schema::table('conductores', function (Blueprint $table) {
                if (! Schema::hasColumn('conductores', 'lat_inicio')) {
                    $table->decimal('lat_inicio', 10, 7)
                          ->nullable()
                          ->after('valoracion');
                }
                if (! Schema::hasColumn('conductores', 'lng_inicio')) {
                    $table->decimal('lng_inicio', 10, 7)
                          ->nullable()
                          ->after('lat_inicio');
                }
            });
        }
    }

    public function down()
    {
        // Sólo las borramos si existen
        Schema::table('conductores', function (Blueprint $table) {
            if (Schema::hasColumn('conductores', 'lng_inicio')) {
                $table->dropColumn('lng_inicio');
            }
            if (Schema::hasColumn('conductores', 'lat_inicio')) {
                $table->dropColumn('lat_inicio');
            }
        });
    }
};
