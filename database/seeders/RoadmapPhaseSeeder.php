<?php

namespace Database\Seeders;

use App\Models\RoadmapPhase;
use App\Models\UserProgress;
use App\Models\User;
use Illuminate\Database\Seeder;

class RoadmapPhaseSeeder extends Seeder
{
    public function run()
    {
        $phases = [
            [
                'name' => 'Pre-University Preparation',
                'description' => 'Focus on SPM preparation and post-SPM planning',
                'order' => 1,
                'tasks' => [
                    'Complete SPM examinations',
                    'Receive SPM results',
                    'Research university options',
                    'Prepare application documents',
                ],
                'start_date' => now()->subMonths(6),
                'end_date' => now()->addMonths(3),
                'is_active' => true,
            ],
            [
                'name' => 'Application Phase',
                'description' => 'Submit applications to various programs and institutions',
                'order' => 2,
                'tasks' => [
                    'Submit UPU application',
                    'Apply for Matriculation',
                    'Apply for PTPTN scholarship',
                    'Prepare for interviews',
                ],
                'start_date' => now()->addMonths(3),
                'end_date' => now()->addMonths(6),
                'is_active' => true,
            ],
            [
                'name' => 'Pre-University Studies',
                'description' => 'Complete STPM, Matriculation, or Foundation program',
                'order' => 3,
                'tasks' => [
                    'Enroll in chosen pre-university program',
                    'Maintain good academic performance',
                    'Participate in extracurricular activities',
                    'Prepare for university applications',
                ],
                'start_date' => now()->addMonths(6),
                'end_date' => now()->addMonths(18),
                'is_active' => true,
            ],
            [
                'name' => 'University Application',
                'description' => 'Apply to universities and degree programs',
                'order' => 4,
                'tasks' => [
                    'Research degree programs',
                    'Submit university applications',
                    'Attend university interviews',
                    'Accept university offer',
                ],
                'start_date' => now()->addMonths(18),
                'end_date' => now()->addMonths(24),
                'is_active' => true,
            ],
        ];

        foreach ($phases as $phase) {
            RoadmapPhase::create($phase);
        }

        // Create user progress for the main user
        $user = User::first();
        if ($user) {
            $progressItems = [
                [
                    'roadmap_phase_id' => 1,
                    'task_name' => 'Complete SPM examinations',
                    'description' => 'Finish all SPM subjects',
                    'status' => 'Completed',
                    'due_date' => now()->subDays(30),
                    'completed_at' => now()->subDays(30),
                ],
                [
                    'roadmap_phase_id' => 1,
                    'task_name' => 'Receive SPM results',
                    'description' => 'Collect SPM results from school',
                    'status' => 'Completed',
                    'due_date' => now()->subDays(15),
                    'completed_at' => now()->subDays(15),
                ],
                [
                    'roadmap_phase_id' => 1,
                    'task_name' => 'Research university options',
                    'description' => 'Explore different universities and programs',
                    'status' => 'In Progress',
                    'due_date' => now()->addDays(30),
                ],
                [
                    'roadmap_phase_id' => 1,
                    'task_name' => 'Prepare application documents',
                    'description' => 'Gather required documents for applications',
                    'status' => 'Not Started',
                    'due_date' => now()->addDays(45),
                ],
            ];

            foreach ($progressItems as $progress) {
                UserProgress::create(array_merge($progress, ['user_id' => $user->id]));
            }
        }
    }
}
