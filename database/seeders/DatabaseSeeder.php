<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $this->call([
            UserSeeder::class,
            CareerSeeder::class,
            PathwaySeeder::class,
            ApplicationSeeder::class,
            DeadlineSeeder::class,
            CourseSeeder::class,
            ResourceSeeder::class,
            RoadmapPhaseSeeder::class,
        ]);
    }
}