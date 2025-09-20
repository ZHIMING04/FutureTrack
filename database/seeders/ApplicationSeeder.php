<?php

namespace Database\Seeders;

use App\Models\Application;
use App\Models\Deadline;
use Illuminate\Database\Seeder;

class ApplicationSeeder extends Seeder
{
    public function run()
    {
        $applications = [
            [
                'name' => 'UPU Main Application',
                'description' => 'Main cycle application for public universities',
                'organization' => 'UPU',
                'requirements' => ['SPM results', 'MUET (optional)', 'Personal statement'],
                'website_url' => 'https://upu.mohe.gov.my',
                'is_active' => true,
            ],
            [
                'name' => 'Matriculation Program Application',
                'description' => 'Ministry of Education pre-university program',
                'organization' => 'Ministry of Education',
                'requirements' => ['SPM results', 'Health certificate', 'Parent income statement'],
                'website_url' => 'https://matric.moe.gov.my',
                'is_active' => true,
            ],
            [
                'name' => 'PTPTN Scholarship',
                'description' => 'Higher education loan for Malaysian students',
                'organization' => 'PTPTN',
                'requirements' => ['SPM results', 'Family income proof', 'University offer letter'],
                'website_url' => 'https://ptptn.gov.my',
                'is_active' => true,
            ],
        ];

        foreach ($applications as $application) {
            $createdApplication = Application::create($application);
            
            // Create deadlines for each application
            if ($createdApplication->name === 'UPU Main Application') {
                Deadline::create([
                    'application_id' => $createdApplication->id,
                    'title' => 'UPU Main Application',
                    'description' => 'Main cycle application window',
                    'due_date' => now()->addDays(15),
                    'urgency_level' => 'Critical',
                    'is_active' => true,
                ]);
            } elseif ($createdApplication->name === 'Matriculation Program Application') {
                Deadline::create([
                    'application_id' => $createdApplication->id,
                    'title' => 'Matriculation Program Application',
                    'description' => 'Ministry of Education',
                    'due_date' => now()->addDays(28),
                    'urgency_level' => 'High',
                    'is_active' => true,
                ]);
            } elseif ($createdApplication->name === 'PTPTN Scholarship') {
                Deadline::create([
                    'application_id' => $createdApplication->id,
                    'title' => 'PTPTN Scholarship',
                    'description' => 'Higher education loan',
                    'due_date' => now()->addDays(45),
                    'urgency_level' => 'Medium',
                    'is_active' => true,
                ]);
            }
        }
    }
}
