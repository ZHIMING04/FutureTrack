<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pathway extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'total_duration',
        'cost_range_min',
        'cost_range_max',
        'competitiveness',
        'pros',
        'cons',
        'is_active',
    ];

    protected $casts = [
        'pros' => 'array',
        'cons' => 'array',
    ];

    // Relationships
    public function pathwayRequirements()
    {
        return $this->hasMany(PathwayRequirement::class);
    }

    // Helper methods
    public function getCostRangeAttribute()
    {
        if ($this->cost_range_min && $this->cost_range_max) {
            return "RM {$this->cost_range_min} - {$this->cost_range_max}";
        }
        return null;
    }
}
