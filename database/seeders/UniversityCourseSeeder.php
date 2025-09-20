<?php

namespace Database\Seeders;

use App\Models\UniversityCourse;
use Illuminate\Database\Seeder;

class UniversityCourseSeeder extends Seeder
{
    public function run()
    {
        $courses = [
            // Data Engineering Courses
            [
                'university_name' => 'Universiti Malaya (UM)',
                'course_name' => 'Bachelor of Computer Science (Data Science)',
                'course_code' => 'CS-DS',
                'description' => 'Comprehensive program covering data science fundamentals, machine learning, and big data analytics.',
                'level' => 'Bachelor',
                'duration_years' => 4,
                'tuition_fee' => 15000.00,
                'entry_requirements' => 'SPM with credits in Mathematics, English, and 2 Science subjects',
                'subjects_required' => ['Mathematics', 'English', 'Physics', 'Chemistry'],
                'career_paths' => ['Data Engineer', 'Data Scientist', 'Machine Learning Engineer'],
                'faculty' => 'Faculty of Computer Science and Information Technology',
                'campus_location' => 'Kuala Lumpur'
            ],
            [
                'university_name' => 'Universiti Teknologi Malaysia (UTM)',
                'course_name' => 'Bachelor of Engineering (Computer Science)',
                'course_code' => 'CS-ENG',
                'description' => 'Engineering-focused computer science program with emphasis on software development and system design.',
                'level' => 'Bachelor',
                'duration_years' => 4,
                'tuition_fee' => 12000.00,
                'entry_requirements' => 'SPM with credits in Mathematics, English, and Physics',
                'subjects_required' => ['Mathematics', 'English', 'Physics'],
                'career_paths' => ['Data Engineer', 'Software Engineer', 'System Analyst'],
                'faculty' => 'Faculty of Computing',
                'campus_location' => 'Johor Bahru'
            ],
            [
                'university_name' => 'Universiti Putra Malaysia (UPM)',
                'course_name' => 'Bachelor of Science (Information Technology)',
                'course_code' => 'IT-BSC',
                'description' => 'IT program focusing on database management, network administration, and information systems.',
                'level' => 'Bachelor',
                'duration_years' => 3,
                'tuition_fee' => 10000.00,
                'entry_requirements' => 'SPM with credits in Mathematics and English',
                'subjects_required' => ['Mathematics', 'English'],
                'career_paths' => ['Data Engineer', 'Database Administrator', 'IT Consultant'],
                'faculty' => 'Faculty of Computer Science and Information Technology',
                'campus_location' => 'Serdang'
            ],
            [
                'university_name' => 'Universiti Kebangsaan Malaysia (UKM)',
                'course_name' => 'Master of Science (Data Science)',
                'course_code' => 'DS-MSC',
                'description' => 'Advanced program in data science, machine learning, and artificial intelligence.',
                'level' => 'Master',
                'duration_years' => 2,
                'tuition_fee' => 20000.00,
                'entry_requirements' => 'Bachelor degree in related field with CGPA 3.0',
                'subjects_required' => ['Mathematics', 'Statistics'],
                'career_paths' => ['Data Scientist', 'Machine Learning Engineer', 'AI Specialist'],
                'faculty' => 'Faculty of Information Science and Technology',
                'campus_location' => 'Bangi'
            ],

            // Data Science Courses
            [
                'university_name' => 'Universiti Malaya (UM)',
                'course_name' => 'Bachelor of Science (Statistics)',
                'course_code' => 'STAT-BSC',
                'description' => 'Statistics program with focus on data analysis, probability, and statistical modeling.',
                'level' => 'Bachelor',
                'duration_years' => 3,
                'tuition_fee' => 8000.00,
                'entry_requirements' => 'SPM with credits in Mathematics and English',
                'subjects_required' => ['Mathematics', 'English'],
                'career_paths' => ['Data Scientist', 'Statistician', 'Research Analyst'],
                'faculty' => 'Faculty of Science',
                'campus_location' => 'Kuala Lumpur'
            ],
            [
                'university_name' => 'Universiti Teknologi Malaysia (UTM)',
                'course_name' => 'Master of Science (Artificial Intelligence)',
                'course_code' => 'AI-MSC',
                'description' => 'Advanced AI program covering machine learning, deep learning, and neural networks.',
                'level' => 'Master',
                'duration_years' => 2,
                'tuition_fee' => 18000.00,
                'entry_requirements' => 'Bachelor degree in Computer Science or related field',
                'subjects_required' => ['Mathematics', 'Programming'],
                'career_paths' => ['Data Scientist', 'AI Engineer', 'Machine Learning Engineer'],
                'faculty' => 'Faculty of Computing',
                'campus_location' => 'Johor Bahru'
            ],

            // Software Engineering Courses
            [
                'university_name' => 'Universiti Malaya (UM)',
                'course_name' => 'Bachelor of Computer Science (Software Engineering)',
                'course_code' => 'SE-BSC',
                'description' => 'Software engineering program focusing on software development lifecycle and project management.',
                'level' => 'Bachelor',
                'duration_years' => 4,
                'tuition_fee' => 14000.00,
                'entry_requirements' => 'SPM with credits in Mathematics, English, and 2 Science subjects',
                'subjects_required' => ['Mathematics', 'English', 'Physics', 'Chemistry'],
                'career_paths' => ['Software Engineer', 'Full Stack Developer', 'DevOps Engineer'],
                'faculty' => 'Faculty of Computer Science and Information Technology',
                'campus_location' => 'Kuala Lumpur'
            ],
            [
                'university_name' => 'Universiti Teknologi Malaysia (UTM)',
                'course_name' => 'Bachelor of Engineering (Software Engineering)',
                'course_code' => 'SE-ENG',
                'description' => 'Engineering approach to software development with focus on system design and architecture.',
                'level' => 'Bachelor',
                'duration_years' => 4,
                'tuition_fee' => 13000.00,
                'entry_requirements' => 'SPM with credits in Mathematics, English, and Physics',
                'subjects_required' => ['Mathematics', 'English', 'Physics'],
                'career_paths' => ['Software Engineer', 'System Architect', 'Technical Lead'],
                'faculty' => 'Faculty of Computing',
                'campus_location' => 'Johor Bahru'
            ],

            // Business and Management Courses
            [
                'university_name' => 'Universiti Malaya (UM)',
                'course_name' => 'Bachelor of Business Administration (Information Systems)',
                'course_code' => 'BBA-IS',
                'description' => 'Business program with focus on information systems, digital transformation, and business analytics.',
                'level' => 'Bachelor',
                'duration_years' => 3,
                'tuition_fee' => 9000.00,
                'entry_requirements' => 'SPM with credits in Mathematics and English',
                'subjects_required' => ['Mathematics', 'English'],
                'career_paths' => ['Business Analyst', 'Project Manager', 'IT Consultant'],
                'faculty' => 'Faculty of Business and Accountancy',
                'campus_location' => 'Kuala Lumpur'
            ],
            [
                'university_name' => 'Universiti Putra Malaysia (UPM)',
                'course_name' => 'Master of Business Administration (Technology Management)',
                'course_code' => 'MBA-TM',
                'description' => 'MBA program focusing on technology management, innovation, and digital business strategies.',
                'level' => 'Master',
                'duration_years' => 2,
                'tuition_fee' => 25000.00,
                'entry_requirements' => 'Bachelor degree with 2 years work experience',
                'subjects_required' => ['English', 'Mathematics'],
                'career_paths' => ['Technology Manager', 'Product Manager', 'Business Consultant'],
                'faculty' => 'Faculty of Economics and Management',
                'campus_location' => 'Serdang'
            ],

            // Foundation Programs
            [
                'university_name' => 'Universiti Malaya (UM)',
                'course_name' => 'Foundation in Science',
                'course_code' => 'FOUND-SCI',
                'description' => 'Foundation program preparing students for science and technology degree programs.',
                'level' => 'Foundation',
                'duration_years' => 1,
                'tuition_fee' => 5000.00,
                'entry_requirements' => 'SPM with 5 credits including Mathematics and Science',
                'subjects_required' => ['Mathematics', 'Physics', 'Chemistry', 'Biology'],
                'career_paths' => ['Data Engineer', 'Data Scientist', 'Software Engineer'],
                'faculty' => 'Foundation Centre',
                'campus_location' => 'Kuala Lumpur'
            ],
            [
                'university_name' => 'Universiti Teknologi Malaysia (UTM)',
                'course_name' => 'Foundation in Engineering',
                'course_code' => 'FOUND-ENG',
                'description' => 'Foundation program for engineering and technology degree programs.',
                'level' => 'Foundation',
                'duration_years' => 1,
                'tuition_fee' => 4500.00,
                'entry_requirements' => 'SPM with 5 credits including Mathematics and Physics',
                'subjects_required' => ['Mathematics', 'Physics', 'Chemistry'],
                'career_paths' => ['Data Engineer', 'Software Engineer', 'System Engineer'],
                'faculty' => 'Foundation Centre',
                'campus_location' => 'Johor Bahru'
            ]
        ];

        foreach ($courses as $course) {
            UniversityCourse::create($course);
        }
    }
}