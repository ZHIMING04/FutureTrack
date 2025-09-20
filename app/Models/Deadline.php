<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Deadline extends Model
{
    use HasFactory;

    protected $fillable = [
        'application_id',
        'title',
        'description',
        'due_date',
        'urgency_level',
        'days_remaining',
        'is_active',
    ];

    protected $casts = [
        'due_date' => 'datetime',
    ];

    // Relationships
    public function application()
    {
        return $this->belongsTo(Application::class);
    }

    // Helper methods
    public function getDaysRemainingAttribute()
    {
        return (int) now()->diffInDays($this->due_date, false);
    }

    public function getUrgencyColorAttribute()
    {
        $colors = [
            'Low' => 'gray',
            'Medium' => 'blue',
            'High' => 'orange',
            'Critical' => 'red',
        ];

        return $colors[$this->urgency_level] ?? 'gray';
    }
}
