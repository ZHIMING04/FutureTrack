<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('applications', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // e.g., "UPU Main Application", "Matriculation Program"
            $table->text('description');
            $table->string('organization'); // e.g., "UPU", "Ministry of Education"
            $table->json('requirements')->nullable(); // Array of required documents
            $table->string('website_url')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('applications');
    }
};
