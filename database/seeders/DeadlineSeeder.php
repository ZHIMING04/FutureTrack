<?php

namespace Database\Seeders;

use App\Models\Deadline;
use App\Models\Application;
use Illuminate\Database\Seeder;

class DeadlineSeeder extends Seeder
{
    public function run()
    {
        // Get applications to create deadlines for
        $applications = Application::all();

        if ($applications->isEmpty()) {
            $this->command->warn('No applications found. Please run ApplicationSeeder first.');
            return;
        }

        $deadlines = [
            [
                'application_id' => $applications->first()->id,
                'title' => 'University Application Deadline',
                'description' => 'Submit your university application form and required documents',
                'due_date' => now()->addDays(30),
                'urgency_level' => 'High',
                'is_active' => true,
            ],
            [
                'application_id' => $applications->first()->id,
                'title' => 'Scholarship Application',
                'description' => 'Apply for merit-based scholarship program',
                'due_date' => now()->addDays(45),
                'urgency_level' => 'Medium',
                'is_active' => true,
            ],
            [
                'application_id' => $applications->first()->id,
                'title' => 'Portfolio Submission',
                'description' => 'Submit your academic portfolio and achievements',
                'due_date' => now()->addDays(15),
                'urgency_level' => 'Critical',
                'is_active' => true,
            ],
            [
                'application_id' => $applications->skip(1)->first()?->id ?? $applications->first()->id,
                'title' => 'Interview Schedule',
                'description' => 'Schedule and attend university interview',
                'due_date' => now()->addDays(60),
                'urgency_level' => 'Medium',
                'is_active' => true,
            ],
            [
                'application_id' => $applications->skip(2)->first()?->id ?? $applications->first()->id,
                'title' => 'Document Verification',
                'description' => 'Submit original documents for verification',
                'due_date' => now()->addDays(20),
                'urgency_level' => 'High',
                'is_active' => true,
            ],
        ];

        foreach ($deadlines as $deadlineData) {
            Deadline::create($deadlineData);
        }

        $this->command->info('Deadlines seeded successfully!');
    }
}
