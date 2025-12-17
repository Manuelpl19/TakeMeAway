<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('usuarios', function (Blueprint $t) {
            $t->timestamp('email_verified_at')->nullable()->after('password');
            $t->rememberToken()->after('email_verified_at');
        });
    }

    public function down()
    {
        Schema::table('usuarios', function (Blueprint $t) {
            $t->dropColumn(['email_verified_at', 'remember_token']);
        });
    }
};
