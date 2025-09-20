<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Simulation;
use App\Models\Pathway;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WhatIfSimulatorController extends Controller
{
    public function index()
    {
        $user = User::first();
        
        if (!$user) {
            return Inertia::render('WhatIfSimulator', [
                'user' => null,
                'simulationData' => null
            ]);
        }

        // Get user's current academic performance
        $currentGrades = $user->academicSubjects->where('exam_type', 'SPM')->mapWithKeys(function ($subject) {
            return [$subject->subject_name => $subject->grade_points];
        });

        // Get available pathways
        $pathways = Pathway::all()->map(function ($pathway) {
            return [
                'id' => $pathway->id,
                'name' => $pathway->name,
                'description' => $pathway->description
            ];
        });

        // Get saved simulations
        $savedSimulations = Simulation::where('user_id', $user->id)
                                    ->where('is_saved', true)
                                    ->orderBy('created_at', 'desc')
                                    ->get()
                                    ->map(function ($simulation) {
                                        return [
                                            'id' => $simulation->id,
                                            'name' => $simulation->name,
                                            'admissionLikelihood' => $simulation->admission_likelihood,
                                            'timeline' => $simulation->timeline,
                                            'estimatedCost' => $simulation->estimated_cost,
                                            'createdAt' => $simulation->created_at->format('M d, Y')
                                        ];
                                    });

        $simulationData = [
            'user' => [
                'name' => $user->name,
                'initials' => $user->initials
            ],
            'currentGrades' => $currentGrades,
            'pathways' => $pathways,
            'savedSimulations' => $savedSimulations,
            'simulationControls' => [
                'selectedPathway' => $pathways->first()['id'] ?? null,
                'gradeImprovements' => [
                    'mathematics' => ['current' => $currentGrades['Mathematics'] ?? 0, 'target' => 4.0],
                    'additionalMathematics' => ['current' => $currentGrades['Additional Mathematics'] ?? 0, 'target' => 3.3],
                    'scienceAverage' => ['current' => $currentGrades['Physics'] ?? 0, 'target' => 3.7],
                    'preUniversityCGPA' => ['target' => 3.2]
                ]
            ]
        ];

        return Inertia::render('WhatIfSimulator', $simulationData);
    }

    public function simulate(Request $request)
    {
        $user = User::first();
        
        if (!$user) {
            return redirect()->back()->with('error', 'User not found');
        }

        $request->validate([
            'pathway_id' => 'required|exists:pathways,id',
            'grade_adjustments' => 'required|array'
        ]);

        $pathway = Pathway::find($request->pathway_id);
        $gradeAdjustments = $request->grade_adjustments;

        // Calculate admission likelihood based on grade improvements
        $admissionLikelihood = $this->calculateAdmissionLikelihood($gradeAdjustments, $pathway);
        
        // Calculate timeline and cost
        $timeline = $pathway->total_duration;
        $estimatedCost = $pathway->cost_range;

        // Generate risk assessment
        $riskAssessment = $this->generateRiskAssessment($gradeAdjustments, $pathway);

        // Generate improvement suggestions
        $improvementSuggestions = $this->generateImprovementSuggestions($gradeAdjustments, $pathway);

        $simulationResult = [
            'admissionLikelihood' => $admissionLikelihood,
            'timeline' => $timeline,
            'estimatedCost' => $estimatedCost,
            'riskAssessment' => $riskAssessment,
            'improvementSuggestions' => $improvementSuggestions
        ];

        return response()->json($simulationResult);
    }

    public function save(Request $request)
    {
        $user = User::first();
        
        if (!$user) {
            return redirect()->back()->with('error', 'User not found');
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'pathway_data' => 'required|array',
            'grade_adjustments' => 'required|array',
            'admission_likelihood' => 'required|integer|min:0|max:100',
            'timeline' => 'required|string',
            'estimated_cost' => 'required|string'
        ]);

        Simulation::create([
            'user_id' => $user->id,
            'name' => $request->name,
            'pathway_data' => $request->pathway_data,
            'grade_adjustments' => $request->grade_adjustments,
            'admission_likelihood' => $request->admission_likelihood,
            'timeline' => $request->timeline,
            'estimated_cost' => $request->estimated_cost,
            'risk_assessment' => $request->risk_assessment ?? [],
            'improvement_suggestions' => $request->improvement_suggestions ?? [],
            'is_saved' => true
        ]);

        return redirect()->back()->with('success', 'Simulation saved successfully');
    }

    private function calculateAdmissionLikelihood($gradeAdjustments, $pathway)
    {
        // Simple calculation based on grade improvements
        $averageImprovement = array_sum($gradeAdjustments) / count($gradeAdjustments);
        $baseLikelihood = 70; // Base likelihood
        $improvementFactor = ($averageImprovement - 3.0) * 10; // Scale improvement
        
        return min(100, max(0, $baseLikelihood + $improvementFactor));
    }

    private function generateRiskAssessment($gradeAdjustments, $pathway)
    {
        $risks = [];
        
        if ($gradeAdjustments['additionalMathematics'] < 3.5) {
            $risks[] = [
                'type' => 'warning',
                'message' => 'Additional Mathematics grade may limit STEM program options',
                'severity' => 'medium'
            ];
        }

        if ($gradeAdjustments['mathematics'] < 3.7) {
            $risks[] = [
                'type' => 'warning',
                'message' => 'Mathematics grade below A- may affect competitive programs',
                'severity' => 'low'
            ];
        }

        return $risks;
    }

    private function generateImprovementSuggestions($gradeAdjustments, $pathway)
    {
        $suggestions = [];
        
        if ($gradeAdjustments['mathematics'] < 4.0) {
            $suggestions[] = 'Focus on strengthening Mathematics fundamentals';
        }
        
        if ($gradeAdjustments['additionalMathematics'] < 3.5) {
            $suggestions[] = 'Practice more Additional Mathematics problems';
        }

        $suggestions[] = 'Consider taking extra classes in weak subjects';
        $suggestions[] = 'Focus on understanding concepts rather than memorization';

        return $suggestions;
    }
}
