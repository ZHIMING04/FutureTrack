<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Simulation extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'pathway_data',
        'grade_adjustments',
        'admission_likelihood',
        'timeline',
        'estimated_cost',
        'risk_assessment',
        'improvement_suggestions',
        'is_saved',
    ];

    protected $casts = [
        'pathway_data' => 'array',
        'grade_adjustments' => 'array',
        'risk_assessment' => 'array',
        'improvement_suggestions' => 'array',
    ];

    // Relationships
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
