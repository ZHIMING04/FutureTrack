<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Career extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'domain',
        'demand_level',
        'demand_index',
        'salary_range_min',
        'salary_range_max',
        'study_duration',
        'key_skills',
        'degree_programs',
        'requirements',
        'is_ai_recommended',
    ];

    protected $casts = [
        'key_skills' => 'array',
        'degree_programs' => 'array',
    ];

    // Relationships
    public function careerMatches()
    {
        return $this->hasMany(CareerMatch::class);
    }

    // Helper methods
    public function getSalaryRangeAttribute()
    {
        if ($this->salary_range_min && $this->salary_range_max) {
            return "RM {$this->salary_range_min} - RM {$this->salary_range_max}";
        }
        return null;
    }
}
