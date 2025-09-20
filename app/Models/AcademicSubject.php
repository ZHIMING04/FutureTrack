<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AcademicSubject extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'subject_code',
        'subject_name',
        'grade',
        'grade_points',
        'exam_type',
        'year',
    ];

    // Relationships
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Helper methods
    public function getGradeColorAttribute()
    {
        $gradeColors = [
            'A+' => 'green',
            'A' => 'green',
            'A-' => 'blue',
            'B+' => 'blue',
            'B' => 'blue',
            'C+' => 'yellow',
            'C' => 'yellow',
            'D' => 'red',
            'E' => 'red',
            'F' => 'red',
        ];

        return $gradeColors[$this->grade] ?? 'gray';
    }
}
