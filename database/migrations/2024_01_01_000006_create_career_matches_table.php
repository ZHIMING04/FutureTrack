<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('career_matches', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('career_id')->constrained()->onDelete('cascade');
            $table->integer('match_percentage'); // 0-100
            $table->json('matching_factors')->nullable(); // What factors contributed to the match
            $table->boolean('is_primary_goal')->default(false);
            $table->timestamp('calculated_at');
            $table->timestamps();
            
            $table->unique(['user_id', 'career_id']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('career_matches');
    }
};
