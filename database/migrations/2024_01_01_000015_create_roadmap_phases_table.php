<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('roadmap_phases', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // e.g., "Pre-University Preparation", "Application Phase"
            $table->text('description');
            $table->integer('order'); // For sequencing phases
            $table->json('tasks')->nullable(); // Array of tasks in this phase
            $table->date('start_date')->nullable();
            $table->date('end_date')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('roadmap_phases');
    }
};
