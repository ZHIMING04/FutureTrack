<?php

namespace Database\Seeders;

use App\Models\Career;
use App\Models\CareerMatch;
use App\Models\User;
use Illuminate\Database\Seeder;

class CareerSeeder extends Seeder
{
    public function run()
    {
        $careers = [
            [
                'title' => 'Data Engineer',
                'description' => 'Design and build systems for collecting, storing, and analyzing data at scale',
                'domain' => 'Technology',
                'demand_level' => 'High',
                'demand_index' => 92,
                'salary_range_min' => '5000',
                'salary_range_max' => '12000',
                'study_duration' => '3-4 years',
                'key_skills' => ['Python', 'SQL', 'Big Data', 'Cloud Computing'],
                'degree_programs' => ['Computer Science', 'Data Science', 'Information Technology'],
                'is_ai_recommended' => true,
            ],
            [
                'title' => 'Software Developer',
                'description' => 'Create software applications and systems for various platforms',
                'domain' => 'Technology',
                'demand_level' => 'Very High',
                'demand_index' => 95,
                'salary_range_min' => '4000',
                'salary_range_max' => '10000',
                'study_duration' => '3-4 years',
                'key_skills' => ['Programming', 'Software Design', 'Problem Solving', 'Testing'],
                'degree_programs' => ['Computer Science', 'Software Engineering', 'Information Technology'],
                'is_ai_recommended' => false,
            ],
            [
                'title' => 'Data Scientist',
                'description' => 'Analyze complex data to help organizations make informed decisions',
                'domain' => 'Technology',
                'demand_level' => 'High',
                'demand_index' => 88,
                'salary_range_min' => '6000',
                'salary_range_max' => '15000',
                'study_duration' => '3-4 years',
                'key_skills' => ['Machine Learning', 'Statistics', 'Python', 'R'],
                'degree_programs' => ['Data Science', 'Computer Science', 'Statistics'],
                'is_ai_recommended' => true,
            ],
            [
                'title' => 'Cybersecurity Analyst',
                'description' => 'Protect organizations from cyber threats and security breaches',
                'domain' => 'Technology',
                'demand_level' => 'High',
                'demand_index' => 85,
                'salary_range_min' => '4500',
                'salary_range_max' => '11000',
                'study_duration' => '3-4 years',
                'key_skills' => ['Network Security', 'Risk Assessment', 'Incident Response', 'Ethical Hacking'],
                'degree_programs' => ['Computer Science', 'Cybersecurity', 'Information Technology'],
                'is_ai_recommended' => false,
            ],
        ];

        foreach ($careers as $career) {
            Career::create($career);
        }

        // Create career matches for the main user
        $user = User::first();
        if ($user) {
            $careerMatches = [
                ['career_id' => 1, 'match_percentage' => 95, 'matching_factors' => ['High interest in data', 'Strong math skills', 'Problem-solving ability'], 'is_primary_goal' => true],
                ['career_id' => 2, 'match_percentage' => 88, 'matching_factors' => ['Programming interest', 'Logical thinking', 'Technical aptitude'], 'is_primary_goal' => false],
                ['career_id' => 3, 'match_percentage' => 92, 'matching_factors' => ['Analytical skills', 'Math background', 'Data interest'], 'is_primary_goal' => false],
            ];

            foreach ($careerMatches as $match) {
                CareerMatch::create(array_merge($match, [
                    'user_id' => $user->id,
                    'calculated_at' => now()
                ]));
            }
        }
    }
}
