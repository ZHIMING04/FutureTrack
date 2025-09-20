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

        // Add navigation items
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
            'quickQuestions' => $quickQuestions,
            'navigationItems' => [
                ['id' => 1, 'name' => 'Dashboard', 'href' => '/dashboard', 'icon' => 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2 2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'],
                ['id' => 2, 'name' => 'Interest Assessment', 'href' => '/interest-assessment', 'icon' => 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z'],
                ['id' => 3, 'name' => 'My Profile', 'href' => '/my-profile', 'icon' => 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'],
                ['id' => 4, 'name' => 'Career Explorer', 'href' => '/career-explorer', 'icon' => 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6'],
                ['id' => 5, 'name' => 'Pathway Planner', 'href' => '/pathway-planner', 'icon' => 'M13 10V3L4 14h7v7l9-11h-7z'],
                ['id' => 6, 'name' => 'What-If Simulator', 'href' => '/what-if-simulator', 'icon' => 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z'],
                ['id' => 7, 'name' => 'My Roadmap', 'href' => '/my-roadmap', 'icon' => 'M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'],
                ['id' => 8, 'name' => 'Applications & Deadlines', 'href' => '/applications-deadlines', 'icon' => 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'],
                ['id' => 9, 'name' => 'Courses', 'href' => '/courses', 'icon' => 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5s3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18s-3.332.477-4.5 1.253'],
                ['id' => 10, 'name' => 'Mentors & Guidance', 'href' => '/mentors-guidance', 'icon' => 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z', 'active' => true],
                ['id' => 11, 'name' => 'Resources', 'href' => '/resources', 'icon' => 'M8 7v8l4-4 4 4V7m0 3V7a2 2 0 00-2-2H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-3m-4-3H8'],
                ['id' => 12, 'name' => 'Settings', 'href' => '/settings', 'icon' => 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065zM12 12.75a.75.75 0 100-1.5.75.75 0 000 1.5z']
            ]
        ];

        return Inertia::render('MentorsGuidance', $mentorData);
    }

    public function sendMessage(Request $request)
    {
        $user = User::first();
        
        if (!$user) {
            return back()->with('error', 'User not found');
        }

        $request->validate([
            'message' => 'required|string|max:1000'
        ]);

        // Mock AI response (in real implementation, this would call AI service)
        $aiResponse = $this->generateAIResponse($request->message);

        return back()->with('success', 'Message sent successfully');
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
