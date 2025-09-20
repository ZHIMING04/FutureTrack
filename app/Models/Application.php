<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Application extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'organization',
        'requirements',
        'website_url',
        'is_active',
    ];

    protected $casts = [
        'requirements' => 'array',
    ];

    // Relationships
    public function deadlines()
    {
        return $this->hasMany(Deadline::class);
    }

    public function userApplications()
    {
        return $this->hasMany(UserApplication::class);
    }
}
