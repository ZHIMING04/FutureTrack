<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('academic_subjects', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('subject_code')->nullable();
            $table->string('subject_name');
            $table->string('grade');
            $table->decimal('grade_points', 3, 1)->nullable();
            $table->enum('exam_type', ['SPM', 'STPM', 'MUET', 'Other'])->default('SPM');
            $table->integer('year')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('academic_subjects');
    }
};
