<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Pathway;
use App\Models\PathwayRequirement;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PathwayPlannerController extends Controller
{
    public function index()
    {
        $user = User::first();
        
        if (!$user) {
            return Inertia::render('PathwayPlanner', [
                'user' => null,
                'pathwayData' => null
            ]);
        }

        // Get primary career goal
        $primaryCareer = $user->careerMatches()->where('is_primary_goal', true)->first();
        $careerGoal = $primaryCareer ? $primaryCareer->career->title : 'Data Engineer';

        // Get pathways with requirements
        $pathways = Pathway::with('pathwayRequirements')->get();

        // Calculate match percentages for each pathway
        $pathwayData = $pathways->map(function ($pathway) use ($user) {
            $matchPercentage = $this->calculatePathwayMatch($pathway, $user);
            
            return [
                'id' => $pathway->id,
                'name' => $pathway->name,
                'description' => $pathway->description,
                'totalDuration' => $pathway->total_duration,
                'costRange' => $pathway->cost_range,
                'competitiveness' => $pathway->competitiveness,
                'pros' => $pathway->pros,
                'cons' => $pathway->cons,
                'matchPercentage' => $matchPercentage,
                'eligibilityScore' => $matchPercentage,
                'requirements' => $pathway->pathwayRequirements->map(function ($req) {
                    return [
                        'type' => $req->requirement_type,
                        'subject' => $req->subject_name,
                        'minimumGrade' => $req->minimum_grade,
                        'description' => $req->description
                    ];
                })
            ];
        })->sortByDesc('matchPercentage')->values();

        return Inertia::render('PathwayPlanner', [
            'user' => [
                'name' => $user->name,
                'initials' => $user->initials
            ],
            'careerGoal' => $careerGoal,
            'pathways' => $pathwayData
        ]);
    }

    private function calculatePathwayMatch($pathway, $user)
    {
        // Simple matching logic based on user's academic subjects
        $userSubjects = $user->academicSubjects->where('exam_type', 'SPM');
        $requirements = $pathway->pathwayRequirements->where('requirement_type', 'SPM');
        
        if ($requirements->isEmpty()) {
            return 85; // Default match for pathways without SPM requirements
        }

        $matchedRequirements = 0;
        $totalRequirements = $requirements->count();

        foreach ($requirements as $requirement) {
            $userSubject = $userSubjects->where('subject_name', 'like', '%' . $requirement->subject_name . '%')->first();
            
            if ($userSubject) {
                // Simple grade comparison (A = 4, B+ = 3.3, B = 3, etc.)
                $userGradePoints = $userSubject->grade_points ?? 0;
                $requiredPoints = $this->getGradePoints($requirement->minimum_grade);
                
                if ($userGradePoints >= $requiredPoints) {
                    $matchedRequirements++;
                }
            }
        }

        return $totalRequirements > 0 ? round(($matchedRequirements / $totalRequirements) * 100) : 85;
    }

    private function getGradePoints($grade)
    {
        $gradePoints = [
            'A+' => 4.0, 'A' => 4.0, 'A-' => 3.7,
            'B+' => 3.3, 'B' => 3.0, 'B-' => 2.7,
            'C+' => 2.3, 'C' => 2.0, 'C-' => 1.7,
            'D' => 1.0, 'E' => 0.5, 'F' => 0.0,
            'Credit' => 3.0, 'Pass' => 2.0
        ];

        return $gradePoints[$grade] ?? 2.0;
    }
}
