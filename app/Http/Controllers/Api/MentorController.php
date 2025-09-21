<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\Ai\MentorService;
use Illuminate\Http\Request;

class MentorController extends Controller
{
    public function answer(Request $req, MentorService $svc)
    {
        $data = $req->validate([
            'intent_id' => 'required|string',
            'params'    => 'array'
        ]);

        return response()->json($svc->answerQuickQuestion(
            $data['intent_id'],
            $data['params'] ?? [],
            $req->user()
        ));
    }

    public function fallback(Request $req)
    {
        return response()->json([
            'intent_id' => 'fallback',
            'answer'    => "For the demo, please use the Quick Questions on the right.",
            'sources'   => [],
            'ts'        => now()->toIso8601String(),
        ]);
    }
}
