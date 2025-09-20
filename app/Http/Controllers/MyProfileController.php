<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\AcademicSubject;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MyProfileController extends Controller
{
    public function index()
    {
        // Get the first user (Sarah Ahmad) for now
        $user = User::with(['studentProfile', 'academicSubjects'])
                   ->first();

        if (!$user) {
            return Inertia::render('MyProfile', [
                'user' => null,
                'profileData' => null
            ]);
        }

        // Calculate overall GPA
        $spmSubjects = $user->academicSubjects->where('exam_type', 'SPM');
        $totalPoints = $spmSubjects->sum('grade_points');
        $totalSubjects = $spmSubjects->count();
        $overallGPA = $totalSubjects > 0 ? round($totalPoints / $totalSubjects, 2) : 0;

        // Prepare profile data
        $profileData = [
            'user' => [
                'name' => $user->name,
                'initials' => $user->initials,
                'email' => $user->email,
                'phone' => $user->phone,
                'ic_number' => $user->ic_number,
                'current_education_level' => $user->current_education_level,
                'school' => $user->school
            ],
            'personalDetails' => [
                'fullName' => $user->name,
                'icNumber' => $user->ic_number,
                'email' => $user->email,
                'phoneNumber' => $user->phone,
                'currentEducationLevel' => $user->current_education_level,
                'school' => $user->school
            ],
            'academicRecords' => [
                'spmResults' => [
                    'overallGPA' => $overallGPA,
                    'subjects' => $spmSubjects->map(function ($subject) {
                        return [
                            'subjectCode' => $subject->subject_code,
                            'subjectName' => $subject->subject_name,
                            'grade' => $subject->grade,
                            'gradePoints' => $subject->grade_points
                        ];
                    })->values()
                ],
                'muetResults' => $user->academicSubjects->where('exam_type', 'MUET')->map(function ($subject) {
                    return [
                        'subjectName' => $subject->subject_name,
                        'grade' => $subject->grade
                    ];
                })->first()
            ],
            'activitiesAndAwards' => [
                'activities' => $user->studentProfile->achievements['activities'] ?? [],
                'awards' => $user->studentProfile->achievements['awards'] ?? [],
                'skills' => $user->studentProfile->skills ?? []
            ]
        ];

        return Inertia::render('MyProfile', $profileData);
    }

    public function update(Request $request)
    {
        $user = User::first();
        
        if (!$user) {
            return redirect()->back()->with('error', 'User not found');
        }

        // Update user data
        $user->update($request->only([
            'name', 'email', 'phone', 'ic_number', 
            'current_education_level', 'school'
        ]));

        // Update student profile if exists
        if ($user->studentProfile) {
            $user->studentProfile->update($request->only([
                'date_of_birth', 'gender', 'address', 'emergency_contact',
                'personal_statement', 'interests', 'skills', 'achievements'
            ]));
        }

        return redirect()->back()->with('success', 'Profile updated successfully');
    }
}
