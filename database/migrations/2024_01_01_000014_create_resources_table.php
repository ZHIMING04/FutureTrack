<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('resources', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->enum('type', ['Guide', 'Article', 'Video', 'Template'])->default('Article');
            $table->string('category')->nullable(); // e.g., "Applications", "Pathways", "Careers"
            $table->text('content')->nullable(); // For articles/guides
            $table->string('file_url')->nullable(); // For downloadable files
            $table->string('video_url')->nullable(); // For videos
            $table->integer('read_time_minutes')->nullable();
            $table->integer('views_count')->default(0);
            $table->decimal('rating', 3, 1)->default(0); // 0.0 to 5.0
            $table->json('tags')->nullable();
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('resources');
    }
};
