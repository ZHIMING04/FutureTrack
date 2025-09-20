<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CareerMatch extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'career_id',
        'match_percentage',
        'matching_factors',
        'is_primary_goal',
        'calculated_at',
    ];

    protected $casts = [
        'matching_factors' => 'array',
        'calculated_at' => 'datetime',
    ];

    // Relationships
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function career()
    {
        return $this->belongsTo(Career::class);
    }
}
