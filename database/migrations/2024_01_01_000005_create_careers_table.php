<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('careers', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->string('domain')->nullable(); // e.g., Technology, Healthcare, Business
            $table->enum('demand_level', ['Low', 'Medium', 'High', 'Very High'])->default('Medium');
            $table->integer('demand_index')->default(50); // 0-100 scale
            $table->string('salary_range_min')->nullable();
            $table->string('salary_range_max')->nullable();
            $table->string('study_duration')->nullable(); // e.g., "3-4 years"
            $table->json('key_skills')->nullable(); // Array of required skills
            $table->json('degree_programs')->nullable(); // Array of relevant degree programs
            $table->text('requirements')->nullable();
            $table->boolean('is_ai_recommended')->default(false);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('careers');
    }
};
