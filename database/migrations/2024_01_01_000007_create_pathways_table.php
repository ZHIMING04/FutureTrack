<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('pathways', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // e.g., "STPM → Degree", "Matriculation → Degree"
            $table->text('description');
            $table->string('total_duration'); // e.g., "2 + 3-4 years"
            $table->string('cost_range_min')->nullable();
            $table->string('cost_range_max')->nullable();
            $table->enum('competitiveness', ['Low', 'Medium', 'High', 'Very High'])->default('Medium');
            $table->json('pros')->nullable(); // Array of advantages
            $table->json('cons')->nullable(); // Array of disadvantages
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('pathways');
    }
};
