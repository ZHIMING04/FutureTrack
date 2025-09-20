<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('interest_assessments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->integer('question_number');
            $table->text('question');
            $table->enum('category', ['Activities', 'Interests', 'Skills', 'Values'])->default('Activities');
            $table->enum('answer', ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'])->nullable();
            $table->timestamp('answered_at')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('interest_assessments');
    }
};
