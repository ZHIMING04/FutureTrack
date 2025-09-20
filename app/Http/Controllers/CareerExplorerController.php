<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Career;
use App\Models\CareerMatch;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CareerExplorerController extends Controller
{
    public function index(Request $request)
    {
        $user = User::first();
        
        if (!$user) {
            return Inertia::render('CareerExplorer', [
                'user' => null,
                'careerData' => null
            ]);
        }

        // Get careers with matches
        $careers = Career::with(['careerMatches' => function ($query) use ($user) {
            $query->where('user_id', $user->id);
        }])->get();

        // Format career data
        $careerData = $careers->map(function ($career) {
            $match = $career->careerMatches->first();
            
            return [
                'id' => $career->id,
                'title' => $career->title,
                'description' => $career->description,
                'domain' => $career->domain,
                'matchPercentage' => $match ? $match->match_percentage : 0,
                'demandLevel' => $career->demand_level,
                'demandIndex' => $career->demand_index,
                'salaryRange' => $career->salary_range,
                'studyDuration' => $career->study_duration,
                'keySkills' => $career->key_skills,
                'degreePrograms' => $career->degree_programs,
                'isAiRecommended' => $career->is_ai_recommended,
                'isPrimaryGoal' => $match ? $match->is_primary_goal : false
            ];
        })->sortByDesc('matchPercentage')->values();

        // Get filters
        $domains = Career::distinct()->pluck('domain')->filter()->values();
        $matchLevels = ['High Match', 'Medium Match', 'Low Match'];

        return Inertia::render('CareerExplorer', [
            'user' => [
                'name' => $user->name,
                'initials' => $user->initials
            ],
            'careers' => $careerData,
            'filters' => [
                'domains' => $domains,
                'matchLevels' => $matchLevels
            ]
        ]);
    }

    public function setPrimaryGoal(Request $request)
    {
        $user = User::first();
        
        if (!$user) {
            return redirect()->back()->with('error', 'User not found');
        }

        $request->validate([
            'career_id' => 'required|exists:careers,id'
        ]);

        // Remove primary goal from all careers
        CareerMatch::where('user_id', $user->id)->update(['is_primary_goal' => false]);

        // Set new primary goal
        CareerMatch::updateOrCreate(
            [
                'user_id' => $user->id,
                'career_id' => $request->career_id
            ],
            [
                'is_primary_goal' => true,
                'calculated_at' => now()
            ]
        );

        return redirect()->back()->with('success', 'Primary career goal updated successfully');
    }
}
