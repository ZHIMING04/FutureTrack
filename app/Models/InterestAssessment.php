<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InterestAssessment extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'question_number',
        'question',
        'category',
        'answer',
        'answered_at',
    ];

    protected $casts = [
        'answered_at' => 'datetime',
    ];

    // Relationships
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Helper methods
    public function getAnswerScoreAttribute()
    {
        $scores = [
            'Strongly Disagree' => 1,
            'Disagree' => 2,
            'Neutral' => 3,
            'Agree' => 4,
            'Strongly Agree' => 5,
        ];

        return $scores[$this->answer] ?? 0;
    }
}
