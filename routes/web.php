<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\MyProfileController;
use App\Http\Controllers\InterestAssessmentController;
use App\Http\Controllers\CareerExplorerController;
use App\Http\Controllers\PathwayPlannerController;
use App\Http\Controllers\WhatIfSimulatorController;
use App\Http\Controllers\MyRoadmapController;
use App\Http\Controllers\ApplicationsDeadlinesController;
use App\Http\Controllers\CoursesController;
use App\Http\Controllers\MentorsGuidanceController;
use App\Http\Controllers\ResourcesController;
use App\Http\Controllers\SettingsController;

Route::get('/', function () {
    return Inertia::render('Home');
});

// Dashboard
Route::get('/dashboard', [DashboardController::class, 'index']);

// My Profile
Route::get('/my-profile', [MyProfileController::class, 'index']);
Route::put('/my-profile', [MyProfileController::class, 'update']);

// Interest Assessment
Route::get('/interest-assessment', [InterestAssessmentController::class, 'index']);
Route::post('/interest-assessment', [InterestAssessmentController::class, 'store']);

// Career Explorer
Route::get('/career-explorer', [CareerExplorerController::class, 'index']);
Route::post('/career-explorer/set-primary-goal', [CareerExplorerController::class, 'setPrimaryGoal']);

// Pathway Planner
Route::get('/pathway-planner', [PathwayPlannerController::class, 'index']);

// What-If Simulator
Route::get('/what-if-simulator', [WhatIfSimulatorController::class, 'index']);
Route::post('/what-if-simulator/simulate', [WhatIfSimulatorController::class, 'simulate']);
Route::post('/what-if-simulator/save', [WhatIfSimulatorController::class, 'save']);

// My Roadmap
Route::get('/my-roadmap', [MyRoadmapController::class, 'index']);
Route::put('/my-roadmap/update-progress', [MyRoadmapController::class, 'updateProgress']);

// Applications & Deadlines
Route::get('/applications-deadlines', [ApplicationsDeadlinesController::class, 'index']);
Route::put('/applications-deadlines/update-application', [ApplicationsDeadlinesController::class, 'updateApplication']);

// Courses
Route::get('/courses', [CoursesController::class, 'index']);
Route::post('/courses/enroll', [CoursesController::class, 'enroll']);
Route::put('/courses/update-progress', [CoursesController::class, 'updateProgress']);

// Mentors & Guidance
Route::get('/mentors-guidance', [MentorsGuidanceController::class, 'index']);
Route::post('/mentors-guidance/send-message', [MentorsGuidanceController::class, 'sendMessage']);

// Resources
Route::get('/resources', [ResourcesController::class, 'index']);
Route::get('/resources/{id}', [ResourcesController::class, 'view']);
Route::get('/resources/{id}/download', [ResourcesController::class, 'download']);

// Settings
Route::get('/settings', [SettingsController::class, 'index']);
Route::put('/settings/profile', [SettingsController::class, 'updateProfile']);
Route::put('/settings/preferences', [SettingsController::class, 'updatePreferences']);
Route::put('/settings/password', [SettingsController::class, 'updatePassword']);
Route::delete('/settings/delete-account', [SettingsController::class, 'deleteAccount']);
