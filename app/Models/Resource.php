<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Resource extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'type',
        'category',
        'content',
        'file_url',
        'video_url',
        'read_time_minutes',
        'views_count',
        'rating',
        'tags',
        'is_featured',
        'is_active',
    ];

    protected $casts = [
        'tags' => 'array',
    ];

    // Helper methods
    public function incrementViews()
    {
        $this->increment('views_count');
    }
}
