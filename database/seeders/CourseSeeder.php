<?php

namespace Database\Seeders;

use App\Models\Course;
use Illuminate\Database\Seeder;

class CourseSeeder extends Seeder
{
    public function run()
    {
        $courses = [
            [
                'title' => 'Data Engineer Starter Pack',
                'description' => 'Complete foundation for aspiring data engineers',
                'type' => 'Bundle',
                'duration' => '60 hours',
                'price' => 599.00,
                'original_price' => 749.00,
                'included_courses' => ['Python Basics for Data Science', 'SQL for Beginners', 'Statistics Fundamentals'],
                'skills_covered' => ['Python', 'SQL', 'Statistics', 'Data Analysis'],
                'difficulty_level' => 'Beginner',
                'is_active' => true,
                'is_featured' => true,
            ],
            [
                'title' => 'Business Communication Bundle',
                'description' => 'Essential skills for business professionals',
                'type' => 'Bundle',
                'duration' => '20 hours',
                'price' => 249.00,
                'original_price' => 328.00,
                'included_courses' => ['Public Speaking & Communication', 'Critical Thinking for Problem Solving'],
                'skills_covered' => ['Communication', 'Public Speaking', 'Critical Thinking'],
                'difficulty_level' => 'Beginner',
                'is_active' => true,
                'is_featured' => true,
            ],
            [
                'title' => 'Python Basics for Data Science',
                'description' => 'Learn Python programming fundamentals for data analysis',
                'type' => 'Individual Course',
                'duration' => '20 hours',
                'price' => 199.00,
                'original_price' => 249.00,
                'included_courses' => null,
                'skills_covered' => ['Python', 'Data Analysis', 'Programming'],
                'difficulty_level' => 'Beginner',
                'is_active' => true,
                'is_featured' => false,
            ],
            [
                'title' => 'SQL for Beginners',
                'description' => 'Master SQL database queries and management',
                'type' => 'Individual Course',
                'duration' => '15 hours',
                'price' => 149.00,
                'original_price' => 199.00,
                'included_courses' => null,
                'skills_covered' => ['SQL', 'Database Management', 'Data Queries'],
                'difficulty_level' => 'Beginner',
                'is_active' => true,
                'is_featured' => false,
            ],
            [
                'title' => 'Statistics Fundamentals',
                'description' => 'Essential statistics for data analysis and research',
                'type' => 'Individual Course',
                'duration' => '25 hours',
                'price' => 179.00,
                'original_price' => 229.00,
                'included_courses' => null,
                'skills_covered' => ['Statistics', 'Data Analysis', 'Research Methods'],
                'difficulty_level' => 'Intermediate',
                'is_active' => true,
                'is_featured' => false,
            ],
        ];

        foreach ($courses as $course) {
            Course::create($course);
        }
    }
}
