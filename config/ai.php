<?php

return [
    /*
    |--------------------------------------------------------------------------
    | AI Mentor Configuration
    |--------------------------------------------------------------------------
    |
    | Configuration for the AI Mentor Chat feature using AWS Bedrock.
    |
    */

    'quick_questions_path' => base_path('docs/ai/AI_QUICK_QUESTIONS.json'),

    'max_context_bytes' => 2048,

    'throttle_per_min' => 30,
];
