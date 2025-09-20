<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UniversityCourse extends Model
{
    use HasFactory;

    protected $fillable = [
        'university_name',
        'course_name',
        'course_code',
        'description',
        'level',
        'duration_years',
        'tuition_fee',
        'entry_requirements',
        'subjects_required',
        'career_paths',
        'faculty',
        'campus_location',
        'is_active'
    ];

    protected $casts = [
        'subjects_required' => 'array',
        'career_paths' => 'array',
        'tuition_fee' => 'decimal:2',
        'is_active' => 'boolean'
    ];

    // Scope for active courses
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    // Scope for courses by career path
    public function scopeForCareer($query, $careerTitle)
    {
        return $query->whereJsonContains('career_paths', $careerTitle);
    }

    // Scope for courses by level
    public function scopeByLevel($query, $level)
    {
        return $query->where('level', $level);
    }
}