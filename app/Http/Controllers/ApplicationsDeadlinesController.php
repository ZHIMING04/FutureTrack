<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Application;
use App\Models\Deadline;
use App\Models\UserApplication;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ApplicationsDeadlinesController extends Controller
{
    public function index()
    {
        $user = User::first();
        
        if (!$user) {
            return Inertia::render('ApplicationsDeadlines', [
                'user' => null,
                'applicationData' => null
            ]);
        }

        // Get all applications with deadlines
        $applications = Application::with(['deadlines', 'userApplications' => function ($query) use ($user) {
            $query->where('user_id', $user->id);
        }])->where('is_active', true)->get();

        // Get summary statistics
        $urgentDeadlines = Deadline::where('is_active', true)
                                 ->where('due_date', '<=', now()->addDays(30))
                                 ->count();

        $activeApplications = UserApplication::where('user_id', $user->id)
                                           ->whereIn('status', ['In Progress', 'Under Review'])
                                           ->count();

        $submittedApplications = UserApplication::where('user_id', $user->id)
                                              ->where('status', 'Submitted')
                                              ->count();

        $totalDeadlines = Deadline::where('is_active', true)->count();

        // Format application data
        $applicationData = $applications->map(function ($application) use ($user) {
            $userApplication = $application->userApplications->first();
            $deadline = $application->deadlines->first();
            
            return [
                'id' => $application->id,
                'name' => $application->name,
                'description' => $application->description,
                'organization' => $application->organization,
                'requirements' => $application->requirements,
                'websiteUrl' => $application->website_url,
                'status' => $userApplication ? $userApplication->status : 'Not Started',
                'deadline' => $deadline ? [
                    'title' => $deadline->title,
                    'description' => $deadline->description,
                    'dueDate' => $deadline->due_date->format('M d, Y'),
                    'daysLeft' => $deadline->days_remaining,
                    'urgencyLevel' => $deadline->urgency_level
                ] : null
            ];
        })->sortBy(function ($app) {
            return $app['deadline']['daysLeft'] ?? 999;
        })->values();

        $summaryStats = [
            'urgent' => $urgentDeadlines,
            'active' => $activeApplications,
            'submitted' => $submittedApplications,
            'total' => $totalDeadlines
        ];

        return Inertia::render('ApplicationsDeadlines', [
            'user' => [
                'name' => $user->name,
                'initials' => $user->initials
            ],
            'applications' => $applicationData,
            'summaryStats' => $summaryStats
        ]);
    }

    public function updateApplication(Request $request)
    {
        $user = User::first();
        
        if (!$user) {
            return redirect()->back()->with('error', 'User not found');
        }

        $request->validate([
            'application_id' => 'required|exists:applications,id',
            'status' => 'required|in:Not Started,In Progress,Submitted,Under Review,Accepted,Rejected'
        ]);

        UserApplication::updateOrCreate(
            [
                'user_id' => $user->id,
                'application_id' => $request->application_id
            ],
            [
                'status' => $request->status,
                'submitted_at' => $request->status === 'Submitted' ? now() : null
            ]
        );

        return redirect()->back()->with('success', 'Application status updated successfully');
    }
}
