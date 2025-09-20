<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('simulations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('name'); // User-defined name for the simulation
            $table->json('pathway_data'); // Selected pathway and requirements
            $table->json('grade_adjustments'); // User's grade improvements
            $table->integer('admission_likelihood'); // Calculated percentage
            $table->string('timeline'); // e.g., "2 years STPM + 4 years degree"
            $table->string('estimated_cost'); // e.g., "RM 18,000 - 28,000"
            $table->json('risk_assessment')->nullable(); // Warnings and risks
            $table->json('improvement_suggestions')->nullable();
            $table->boolean('is_saved')->default(false);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('simulations');
    }
};
