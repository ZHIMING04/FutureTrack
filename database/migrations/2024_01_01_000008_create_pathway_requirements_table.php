<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('pathway_requirements', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pathway_id')->constrained()->onDelete('cascade');
            $table->enum('requirement_type', ['SPM', 'STPM', 'Matriculation', 'Foundation', 'Other']);
            $table->string('subject_name');
            $table->string('minimum_grade');
            $table->text('description')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('pathway_requirements');
    }
};
