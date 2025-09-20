<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MentorsGuidanceController extends Controller
{
    public function index(Request $request)
    {
        $user = User::first();
        
        if (!$user) {
            return Inertia::render('MentorsGuidance', [
                'user' => null,
                'mentorData' => null
            ]);
        }

        $tab = $request->get('tab', 'ai-mentor');

        // Mock AI mentor chat data
        $aiMentorChat = [
            [
                'id' => 1,
                'sender' => 'ai-mentor',
                'message' => 'Hi! I can help explain the differences between STPM, Matriculation, and Foundation programs. What would you like to know?',
                'timestamp' => '10:30 AM'
            ],
            [
                'id' => 2,
                'sender' => 'user',
                'message' => 'What\'s the difference between STPM and Matriculation for getting into computer science?',
                'timestamp' => '10:32 AM'
            ],
            [
                'id' => 3,
                'sender' => 'ai-mentor',
                'message' => 'Great question! Here are the key differences: **STPM:** • Duration: 2 years • More subject choices • Internationally recognized • **Matriculation:** • Duration: 1 year • Government sponsored • More competitive admission',
                'timestamp' => '10:33 AM'
            ]
        ];

        // Mock human mentors data
        $humanMentors = [
            [
                'id' => 1,
                'name' => 'Dr. Ahmad Rahman',
                'title' => 'Computer Science Professor',
                'university' => 'Universiti Malaya',
                'specialization' => 'Data Science, Machine Learning',
                'rating' => 4.9,
                'availability' => 'Available',
                'profilePicture' => 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
            ],
            [
                'id' => 2,
                'name' => 'Ms. Sarah Lim',
                'title' => 'Career Counselor',
                'university' => 'Universiti Teknologi Malaysia',
                'specialization' => 'Career Guidance, University Applications',
                'rating' => 4.8,
                'availability' => 'Available',
                'profilePicture' => 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
            ]
        ];

        // Mock user sessions
        $userSessions = [
            [
                'id' => 1,
                'mentorName' => 'Dr. Ahmad Rahman',
                'type' => 'Video Call',
                'date' => '2024-01-15',
                'time' => '2:00 PM - 3:00 PM',
                'status' => 'Completed',
                'topic' => 'Career Path Discussion'
            ],
            [
                'id' => 2,
                'mentorName' => 'Ms. Sarah Lim',
                'type' => 'Chat',
                'date' => '2024-01-10',
                'time' => '10:00 AM - 10:30 AM',
                'status' => 'Completed',
                'topic' => 'University Application Tips'
            ]
        ];

        // AI mentor features
        $aiMentorFeatures = [
            [
                'title' => 'Instant Responses',
                'description' => 'Get immediate answers 24/7',
                'icon' => 'chat'
            ],
            [
                'title' => 'Pathway Explanations',
                'description' => 'Understand STPM, Matriculation, etc.',
                'icon' => 'puzzle'
            ],
            [
                'title' => 'Career Guidance',
                'description' => 'Personalized career advice',
                'icon' => 'briefcase'
            ]
        ];

        // Quick questions
        $quickQuestions = [
            'What are the requirements for Computer Science?',
            'Compare STPM vs Foundation programs',
            'How to improve my pathway eligibility?'
        ];

        $mentorData = [
            'user' => [
                'name' => $user->name,
                'initials' => $user->initials
            ],
            'activeTab' => $tab,
            'aiMentorChat' => $aiMentorChat,
            'humanMentors' => $humanMentors,
            'userSessions' => $userSessions,
            'aiMentorFeatures' => $aiMentorFeatures,
            'quickQuestions' => $quickQuestions
        ];

        return Inertia::render('MentorsGuidance', $mentorData);
    }

    public function sendMessage(Request $request)
    {
        $user = User::first();
        
        if (!$user) {
            return redirect()->back()->with('error', 'User not found');
        }

        $request->validate([
            'message' => 'required|string|max:1000'
        ]);

        // Mock AI response (in real implementation, this would call AI service)
        $aiResponse = $this->generateAIResponse($request->message);

        return response()->json([
            'success' => true,
            'aiResponse' => $aiResponse
        ]);
    }

    private function generateAIResponse($message)
    {
        // Simple mock responses based on keywords
        $message = strtolower($message);
        
        if (strpos($message, 'stpm') !== false && strpos($message, 'matriculation') !== false) {
            return 'STPM and Matriculation are both pre-university programs. STPM takes 2 years and is internationally recognized, while Matriculation takes 1 year and is government-sponsored. Both can lead to university admission.';
        }
        
        if (strpos($message, 'computer science') !== false) {
            return 'For Computer Science, you typically need strong Mathematics and Science subjects. STPM requires Mathematics and Physics with good grades, while Matriculation has similar requirements but is more competitive.';
        }
        
        if (strpos($message, 'requirements') !== false) {
            return 'General requirements include SPM with credits in Mathematics, English, and Science subjects. Specific requirements vary by university and program.';
        }
        
        return 'I understand you\'re asking about ' . $message . '. Could you be more specific about what you\'d like to know? I can help with pathway planning, university requirements, and career guidance.';
    }
}
