<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PathwayRequirement extends Model
{
    use HasFactory;

    protected $fillable = [
        'pathway_id',
        'requirement_type',
        'subject_name',
        'minimum_grade',
        'description',
    ];

    // Relationships
    public function pathway()
    {
        return $this->belongsTo(Pathway::class);
    }
}
