<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\RoadmapPhase;
use App\Models\UserProgress;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MyRoadmapController extends Controller
{
    public function index()
    {
        $user = User::first();
        
        if (!$user) {
            return Inertia::render('MyRoadmap', [
                'user' => null,
                'roadmapData' => null
            ]);
        }

        // Get primary career goal
        $primaryCareer = $user->careerMatches()->where('is_primary_goal', true)->first();
        $careerGoal = $primaryCareer ? $primaryCareer->career->title : 'Data Engineer';

        // Get roadmap phases with user progress
        $phases = RoadmapPhase::with(['userProgress' => function ($query) use ($user) {
            $query->where('user_id', $user->id);
        }])->orderBy('order')->get();

        // Get current phase
        $currentPhase = $phases->first(); // For now, assume first phase is current

        // Get progress statistics
        $progressStats = [
            'completed' => UserProgress::where('user_id', $user->id)->where('status', 'Completed')->count(),
            'inProgress' => UserProgress::where('user_id', $user->id)->where('status', 'In Progress')->count(),
            'upcoming' => UserProgress::where('user_id', $user->id)->where('status', 'Not Started')->count()
        ];

        // Get main and backup paths
        $mainPath = [
            'title' => 'Main Path',
            'description' => 'STPM → Computer Science Degree',
            'summary' => 'Total Duration: ~7 years • Estimated Cost: RM 22,000'
        ];

        $backupPath = [
            'title' => 'Backup Path',
            'description' => 'Asasi Foundation → Computer Science Degree',
            'summary' => 'Total Duration: ~6 years • Estimated Cost: RM 20,000'
        ];

        // Get current progress tasks
        $currentProgress = UserProgress::where('user_id', $user->id)
                                     ->where('roadmap_phase_id', $currentPhase->id)
                                     ->orderBy('due_date')
                                     ->get()
                                     ->map(function ($progress) {
                                         return [
                                             'id' => $progress->id,
                                             'taskName' => $progress->task_name,
                                             'description' => $progress->description,
                                             'status' => $progress->status,
                                             'dueDate' => $progress->due_date ? $progress->due_date->format('M d, Y') : null,
                                             'completedAt' => $progress->completed_at ? $progress->completed_at->format('M d, Y') : null
                                         ];
                                     });

        $roadmapData = [
            'user' => [
                'name' => $user->name,
                'initials' => $user->initials
            ],
            'careerGoal' => $careerGoal,
            'mainPath' => $mainPath,
            'backupPath' => $backupPath,
            'currentPhase' => [
                'name' => $currentPhase->name,
                'description' => $currentPhase->description,
                'startDate' => $currentPhase->start_date ? $currentPhase->start_date->format('M Y') : null,
                'endDate' => $currentPhase->end_date ? $currentPhase->end_date->format('M Y') : null
            ],
            'progressStats' => $progressStats,
            'currentProgress' => $currentProgress,
            'phases' => $phases->map(function ($phase) {
                return [
                    'id' => $phase->id,
                    'name' => $phase->name,
                    'description' => $phase->description,
                    'order' => $phase->order,
                    'startDate' => $phase->start_date ? $phase->start_date->format('M Y') : null,
                    'endDate' => $phase->end_date ? $phase->end_date->format('M Y') : null,
                    'tasks' => $phase->tasks ?? []
                ];
            })
        ];

        return Inertia::render('MyRoadmap', $roadmapData);
    }

    public function updateProgress(Request $request)
    {
        $user = User::first();
        
        if (!$user) {
            return redirect()->back()->with('error', 'User not found');
        }

        $request->validate([
            'task_id' => 'required|exists:user_progress,id',
            'status' => 'required|in:Not Started,In Progress,Completed,Skipped'
        ]);

        $progress = UserProgress::where('id', $request->task_id)
                               ->where('user_id', $user->id)
                               ->first();

        if (!$progress) {
            return redirect()->back()->with('error', 'Task not found');
        }

        $progress->update([
            'status' => $request->status,
            'completed_at' => $request->status === 'Completed' ? now() : null
        ]);

        return redirect()->back()->with('success', 'Progress updated successfully');
    }
}
