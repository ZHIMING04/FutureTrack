<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->enum('role', ['student', 'mentor', 'admin'])->default('student')->after('password');
            $table->string('phone')->nullable()->after('role');
            $table->string('ic_number')->nullable()->after('phone');
            $table->enum('current_education_level', ['SPM Student', 'STPM Student', 'Matriculation Student', 'Foundation Student', 'Degree Student'])->nullable()->after('ic_number');
            $table->string('school')->nullable()->after('current_education_level');
            $table->string('profile_picture')->nullable()->after('school');
            $table->json('preferences')->nullable()->after('profile_picture');
        });
    }

    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'role',
                'phone',
                'ic_number',
                'current_education_level',
                'school',
                'profile_picture',
                'preferences'
            ]);
        });
    }
};
