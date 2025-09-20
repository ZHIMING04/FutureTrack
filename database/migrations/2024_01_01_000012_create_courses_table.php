<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('courses', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->enum('type', ['Individual Course', 'Bundle'])->default('Individual Course');
            $table->string('duration'); // e.g., "60 hours"
            $table->decimal('price', 10, 2)->nullable();
            $table->decimal('original_price', 10, 2)->nullable();
            $table->json('included_courses')->nullable(); // For bundles
            $table->json('skills_covered')->nullable();
            $table->string('difficulty_level')->nullable(); // Beginner, Intermediate, Advanced
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('courses');
    }
};
