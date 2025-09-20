<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'type',
        'duration',
        'price',
        'original_price',
        'included_courses',
        'skills_covered',
        'difficulty_level',
        'is_active',
    ];

    protected $casts = [
        'included_courses' => 'array',
        'skills_covered' => 'array',
    ];

    // Relationships
    public function courseEnrollments()
    {
        return $this->hasMany(CourseEnrollment::class);
    }

    // Helper methods
    public function getSavingsAttribute()
    {
        if ($this->original_price && $this->price) {
            return $this->original_price - $this->price;
        }
        return 0;
    }

    public function getSavingsPercentageAttribute()
    {
        if ($this->original_price && $this->price) {
            return round((($this->original_price - $this->price) / $this->original_price) * 100);
        }
        return 0;
    }
}
