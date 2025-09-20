<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\InterestAssessment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InterestAssessmentController extends Controller
{
    public function index()
    {
        $user = User::first();
        
        if (!$user) {
            return Inertia::render('InterestAssessment', [
                'user' => null,
                'assessmentData' => null
            ]);
        }

        // Get assessment questions (mock data for now)
        $questions = [
            [
                'id' => 1,
                'question_number' => 1,
                'question' => 'I enjoy working with computers and technology',
                'category' => 'Activities',
                'answer' => null
            ],
            [
                'id' => 2,
                'question_number' => 2,
                'question' => 'I like solving complex problems',
                'category' => 'Activities',
                'answer' => null
            ],
            [
                'id' => 3,
                'question_number' => 3,
                'question' => 'I prefer working in teams',
                'category' => 'Activities',
                'answer' => null
            ],
            // Add more questions as needed
        ];

        // Get user's answers
        $userAnswers = InterestAssessment::where('user_id', $user->id)
                                       ->whereNotNull('answer')
                                       ->pluck('answer', 'question_number')
                                       ->toArray();

        // Merge user answers with questions
        foreach ($questions as &$question) {
            if (isset($userAnswers[$question['question_number']])) {
                $question['answer'] = $userAnswers[$question['question_number']];
            }
        }

        // Calculate progress
        $totalQuestions = count($questions);
        $answeredQuestions = count($userAnswers);
        $progress = $totalQuestions > 0 ? round(($answeredQuestions / $totalQuestions) * 100) : 0;

        $assessmentData = [
            'user' => [
                'name' => $user->name,
                'initials' => $user->initials
            ],
            'currentQuestion' => 1,
            'totalQuestions' => $totalQuestions,
            'progress' => $progress,
            'questions' => $questions,
            'overallProgress' => [
                'percentage' => $progress,
                'completed' => $answeredQuestions,
                'total' => $totalQuestions
            ]
        ];

        return Inertia::render('InterestAssessment', $assessmentData);
    }

    public function store(Request $request)
    {
        $user = User::first();
        
        if (!$user) {
            return redirect()->back()->with('error', 'User not found');
        }

        $request->validate([
            'question_number' => 'required|integer',
            'answer' => 'required|string'
        ]);

        // Create or update assessment answer
        InterestAssessment::updateOrCreate(
            [
                'user_id' => $user->id,
                'question_number' => $request->question_number
            ],
            [
                'question' => $request->question,
                'category' => $request->category ?? 'Activities',
                'answer' => $request->answer,
                'answered_at' => now()
            ]
        );

        return redirect()->back()->with('success', 'Answer saved successfully');
    }
}
