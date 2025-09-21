<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\MentorController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

/*Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/ai/mentor', [MentorController::class, 'answer'])
        ->name('ai.mentor.answer')
        ->middleware('throttle:ai');
    Route::post('/ai/mentor/free_text', [MentorController::class, 'fallback'])
        ->name('ai.mentor.fallback')
        ->middleware('throttle:ai');
});*/
