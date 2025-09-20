<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\StudentProfile;
use App\Models\AcademicSubject;
use App\Models\InterestAssessment;
use App\Models\CareerMatch;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Schema;

class UserSeeder extends Seeder
{
    public function run()
    {
        // Create main student user
        $userData = [
            'name' => 'Sarah Ahmad',
            'email' => 'sarah.ahmad@email.com',
            'password' => Hash::make('password'),
        ];

        // Add additional fields if they exist in the database
        if (Schema::hasColumn('users', 'role')) {
            $userData['role'] = 'student';
        }
        if (Schema::hasColumn('users', 'phone')) {
            $userData['phone'] = '+60123456789';
        }
        if (Schema::hasColumn('users', 'ic_number')) {
            $userData['ic_number'] = '050815-12-5678';
        }
        if (Schema::hasColumn('users', 'current_education_level')) {
            $userData['current_education_level'] = 'SPM Student';
        }
        if (Schema::hasColumn('users', 'school')) {
            $userData['school'] = 'SMK Taman Desa';
        }
        if (Schema::hasColumn('users', 'preferences')) {
            $userData['preferences'] = [
                'notifications' => true,
                'theme' => 'light',
                'language' => 'en'
            ];
        }

        $user = User::create($userData);

        // Create student profile
        StudentProfile::create([
            'user_id' => $user->id,
            'interests' => ['Technology', 'Data Analysis', 'Problem Solving', 'Programming'],
            'skills' => [
                'Programming' => ['Python', 'HTML/CSS', 'JavaScript (basic)'],
                'Software' => ['Microsoft Office Suite', 'Canva', 'Adobe Photoshop'],
                'Languages' => ['Malay (native)', 'English (fluent)', 'Mandarin (conversational)']
            ],
            'achievements' => [
                'activities' => [
                    'Computer Club Secretary (2023-2024)',
                    'National Science Competition Participant (2023)',
                    'Volunteer at local community center (2022-2024)'
                ],
                'awards' => [
                    'Best Student in Mathematics (2023)',
                    'State-level Science Quiz Champion (2023)',
                    'Microsoft Office Specialist Certification (2024)'
                ]
            ]
        ]);

        // Create academic subjects (detailed SPM results)
        $subjects = [
            ['subject_name' => 'Bahasa Melayu', 'grade' => 'A', 'exam_type' => 'SPM', 'year' => 2024, 'subject_code' => '1103', 'grade_points' => 4.0],
            ['subject_name' => 'English', 'grade' => 'A-', 'exam_type' => 'SPM', 'year' => 2024, 'subject_code' => '1119', 'grade_points' => 3.7],
            ['subject_name' => 'Mathematics', 'grade' => 'A', 'exam_type' => 'SPM', 'year' => 2024, 'subject_code' => '1449', 'grade_points' => 4.0],
            ['subject_name' => 'Additional Mathematics', 'grade' => 'B+', 'exam_type' => 'SPM', 'year' => 2024, 'subject_code' => '1449', 'grade_points' => 3.3],
            ['subject_name' => 'Physics', 'grade' => 'A-', 'exam_type' => 'SPM', 'year' => 2024, 'subject_code' => '4531', 'grade_points' => 3.7],
            ['subject_name' => 'Chemistry', 'grade' => 'B+', 'exam_type' => 'SPM', 'year' => 2024, 'subject_code' => '4541', 'grade_points' => 3.3],
            ['subject_name' => 'Biology', 'grade' => 'B', 'exam_type' => 'SPM', 'year' => 2024, 'subject_code' => '4551', 'grade_points' => 3.0],
            ['subject_name' => 'History', 'grade' => 'B', 'exam_type' => 'SPM', 'year' => 2024, 'subject_code' => '2001', 'grade_points' => 3.0],
            ['subject_name' => 'Information Technology', 'grade' => 'A', 'exam_type' => 'SPM', 'year' => 2024, 'subject_code' => '6351', 'grade_points' => 4.0],
            ['subject_name' => 'MUET', 'grade' => 'Band 4', 'exam_type' => 'MUET', 'year' => 2024, 'subject_code' => 'MUET', 'grade_points' => 0],
        ];

        foreach ($subjects as $subject) {
            AcademicSubject::create(array_merge($subject, ['user_id' => $user->id]));
        }

        // Create interest assessment questions (sample)
        $questions = [
            ['question_number' => 1, 'question' => 'I enjoy working with computers and technology', 'category' => 'Activities', 'answer' => 'Strongly Agree', 'answered_at' => now()],
            ['question_number' => 2, 'question' => 'I like solving complex problems', 'category' => 'Activities', 'answer' => 'Agree', 'answered_at' => now()],
            ['question_number' => 3, 'question' => 'I prefer working in teams', 'category' => 'Activities', 'answer' => 'Neutral', 'answered_at' => now()],
            ['question_number' => 4, 'question' => 'I am interested in analyzing data and finding patterns', 'category' => 'Interests', 'answer' => 'Agree', 'answered_at' => now()],
            ['question_number' => 5, 'question' => 'I enjoy learning new programming languages and technologies', 'category' => 'Learning', 'answer' => 'Strongly Agree', 'answered_at' => now()]
        ];

        foreach ($questions as $question) {
            InterestAssessment::create(array_merge($question, ['user_id' => $user->id]));
        }

        // Create career matches (will be populated after careers are seeded)
        // This will be handled in CareerSeeder
    }
}
