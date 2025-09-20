<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('university_courses', function (Blueprint $table) {
            $table->id();
            $table->string('university_name');
            $table->string('course_name');
            $table->string('course_code');
            $table->text('description');
            $table->enum('level', ['Foundation', 'Diploma', 'Bachelor', 'Master', 'PhD']);
            $table->integer('duration_years');
            $table->decimal('tuition_fee', 10, 2)->nullable();
            $table->string('entry_requirements');
            $table->json('subjects_required'); // SPM subjects required
            $table->json('career_paths'); // Related career paths
            $table->string('faculty');
            $table->string('campus_location');
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('university_courses');
    }
};