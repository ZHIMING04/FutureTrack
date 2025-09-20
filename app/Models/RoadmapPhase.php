<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RoadmapPhase extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'order',
        'tasks',
        'start_date',
        'end_date',
        'is_active',
    ];

    protected $casts = [
        'tasks' => 'array',
        'start_date' => 'date',
        'end_date' => 'date',
    ];

    // Relationships
    public function userProgress()
    {
        return $this->hasMany(UserProgress::class);
    }
}
