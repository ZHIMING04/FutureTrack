<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Course;
use App\Models\CourseEnrollment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CoursesController extends Controller
{
    public function index(Request $request)
    {
        $user = User::first();
        
        if (!$user) {
            return Inertia::render('Courses', [
                'user' => null,
                'courseData' => null
            ]);
        }

        $tab = $request->get('tab', 'recommended');

        // Get courses based on tab
        if ($tab === 'recommended') {
            $courses = Course::where('is_active', true)
                           ->where('is_featured', true)
                           ->get();
        } elseif ($tab === 'my-courses') {
            $courseIds = CourseEnrollment::where('user_id', $user->id)
                                       ->pluck('course_id');
            $courses = Course::whereIn('id', $courseIds)->get();
        } else {
            $courses = Course::where('is_active', true)->get();
        }

        // Get user's enrolled courses
        $enrolledCourses = CourseEnrollment::where('user_id', $user->id)
                                         ->with('course')
                                         ->get()
                                         ->map(function ($enrollment) {
                                             return [
                                                 'id' => $enrollment->id,
                                                 'course' => [
                                                     'id' => $enrollment->course->id,
                                                     'title' => $enrollment->course->title,
                                                     'description' => $enrollment->course->description
                                                 ],
                                                 'status' => $enrollment->status,
                                                 'progressPercentage' => $enrollment->progress_percentage,
                                                 'enrolledAt' => $enrollment->enrolled_at->format('M d, Y'),
                                                 'completedAt' => $enrollment->completed_at ? $enrollment->completed_at->format('M d, Y') : null
                                             ];
                                         });

        // Format course data
        $courseData = $courses->map(function ($course) {
            return [
                'id' => $course->id,
                'title' => $course->title,
                'description' => $course->description,
                'type' => $course->type,
                'duration' => $course->duration,
                'price' => $course->price,
                'originalPrice' => $course->original_price,
                'savings' => $course->savings,
                'savingsPercentage' => $course->savings_percentage,
                'includedCourses' => $course->included_courses,
                'skillsCovered' => $course->skills_covered,
                'difficultyLevel' => $course->difficulty_level
            ];
        });

        return Inertia::render('Courses', [
            'user' => [
                'name' => $user->name,
                'initials' => $user->initials
            ],
            'courses' => $courseData,
            'enrolledCourses' => $enrolledCourses,
            'activeTab' => $tab
        ]);
    }

    public function enroll(Request $request)
    {
        $user = User::first();
        
        if (!$user) {
            return redirect()->back()->with('error', 'User not found');
        }

        $request->validate([
            'course_id' => 'required|exists:courses,id'
        ]);

        // Check if already enrolled
        $existingEnrollment = CourseEnrollment::where('user_id', $user->id)
                                            ->where('course_id', $request->course_id)
                                            ->first();

        if ($existingEnrollment) {
            return redirect()->back()->with('error', 'You are already enrolled in this course');
        }

        // Enroll in course
        CourseEnrollment::create([
            'user_id' => $user->id,
            'course_id' => $request->course_id,
            'status' => 'Enrolled',
            'enrolled_at' => now()
        ]);

        return redirect()->back()->with('success', 'Successfully enrolled in course');
    }

    public function updateProgress(Request $request)
    {
        $user = User::first();
        
        if (!$user) {
            return redirect()->back()->with('error', 'User not found');
        }

        $request->validate([
            'enrollment_id' => 'required|exists:course_enrollments,id',
            'progress_percentage' => 'required|integer|min:0|max:100'
        ]);

        $enrollment = CourseEnrollment::where('id', $request->enrollment_id)
                                    ->where('user_id', $user->id)
                                    ->first();

        if (!$enrollment) {
            return redirect()->back()->with('error', 'Enrollment not found');
        }

        $enrollment->update([
            'progress_percentage' => $request->progress_percentage,
            'status' => $request->progress_percentage >= 100 ? 'Completed' : 'In Progress',
            'completed_at' => $request->progress_percentage >= 100 ? now() : null
        ]);

        return redirect()->back()->with('success', 'Progress updated successfully');
    }
}
