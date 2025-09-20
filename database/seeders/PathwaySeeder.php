<?php

namespace Database\Seeders;

use App\Models\Pathway;
use App\Models\PathwayRequirement;
use Illuminate\Database\Seeder;

class PathwaySeeder extends Seeder
{
    public function run()
    {
        $pathways = [
            [
                'name' => 'STPM → Degree',
                'description' => 'Complete STPM (2 years) then proceed to university degree (3-4 years)',
                'total_duration' => '2 + 3-4 years',
                'cost_range_min' => '15000',
                'cost_range_max' => '25000',
                'competitiveness' => 'High',
                'pros' => ['Direct entry to most universities', 'Internationally recognized', 'Flexible subject choices'],
                'cons' => ['More intensive and competitive', 'Limited subject flexibility', 'Higher cost'],
                'is_active' => true,
            ],
            [
                'name' => 'Matriculation → Degree',
                'description' => 'Complete Matriculation (1 year) then proceed to university degree (3-4 years)',
                'total_duration' => '1 + 3-4 years',
                'cost_range_min' => '8000',
                'cost_range_max' => '18000',
                'competitiveness' => 'Very High',
                'pros' => ['Shorter pre-university duration', 'Lower cost', 'Government sponsored'],
                'cons' => ['Extremely competitive admission', 'Limited seats available', 'Less flexible'],
                'is_active' => true,
            ],
            [
                'name' => 'Foundation → Degree',
                'description' => 'Complete Foundation program (1 year) then proceed to university degree (3-4 years)',
                'total_duration' => '1 + 3-4 years',
                'cost_range_min' => '10000',
                'cost_range_max' => '20000',
                'competitiveness' => 'Medium',
                'pros' => ['Direct pathway to specific university', 'Specialized preparation', 'Guaranteed entry'],
                'cons' => ['Limited to specific university', 'Higher cost than Matriculation', 'Less transferable'],
                'is_active' => true,
            ],
        ];

        foreach ($pathways as $pathway) {
            $createdPathway = Pathway::create($pathway);
            
            // Create requirements for each pathway
            if ($createdPathway->name === 'STPM → Degree') {
                $requirements = [
                    ['requirement_type' => 'SPM', 'subject_name' => 'Mathematics', 'minimum_grade' => 'Credit', 'description' => 'Minimum Credit grade required'],
                    ['requirement_type' => 'SPM', 'subject_name' => 'Additional Mathematics', 'minimum_grade' => 'Credit', 'description' => 'Minimum Credit grade required'],
                    ['requirement_type' => 'SPM', 'subject_name' => 'English', 'minimum_grade' => 'Credit', 'description' => 'Minimum Credit grade required'],
                    ['requirement_type' => 'STPM', 'subject_name' => 'Mathematics/Further Mathematics', 'minimum_grade' => 'B-', 'description' => 'Minimum B- grade required'],
                    ['requirement_type' => 'STPM', 'subject_name' => 'Science/ICT subject', 'minimum_grade' => 'C', 'description' => 'Minimum C grade required'],
                ];
            } elseif ($createdPathway->name === 'Matriculation → Degree') {
                $requirements = [
                    ['requirement_type' => 'SPM', 'subject_name' => 'Mathematics', 'minimum_grade' => 'A-', 'description' => 'Minimum A- grade required'],
                    ['requirement_type' => 'SPM', 'subject_name' => 'Additional Mathematics', 'minimum_grade' => 'B+', 'description' => 'Minimum B+ grade required'],
                    ['requirement_type' => 'SPM', 'subject_name' => 'Science subjects', 'minimum_grade' => 'B+', 'description' => 'Minimum B+ grade required'],
                    ['requirement_type' => 'Matriculation', 'subject_name' => 'CGPA', 'minimum_grade' => '3.0+', 'description' => 'Minimum CGPA 3.0 required'],
                ];
            } else {
                $requirements = [
                    ['requirement_type' => 'SPM', 'subject_name' => 'Mathematics', 'minimum_grade' => 'Credit', 'description' => 'Minimum Credit grade required'],
                    ['requirement_type' => 'SPM', 'subject_name' => 'English', 'minimum_grade' => 'Credit', 'description' => 'Minimum Credit grade required'],
                    ['requirement_type' => 'Foundation', 'subject_name' => 'CGPA', 'minimum_grade' => '2.5+', 'description' => 'Minimum CGPA 2.5 required'],
                ];
            }

            foreach ($requirements as $requirement) {
                PathwayRequirement::create(array_merge($requirement, ['pathway_id' => $createdPathway->id]));
            }
        }
    }
}
