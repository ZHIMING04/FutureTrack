<?php

namespace Database\Seeders;

use App\Models\Resource;
use Illuminate\Database\Seeder;

class ResourceSeeder extends Seeder
{
    public function run()
    {
        $resources = [
            [
                'title' => 'Complete Guide to UPU Application',
                'description' => 'Step-by-step guide to navigating the UPU online application system',
                'type' => 'Guide',
                'category' => 'Applications',
                'content' => 'This comprehensive guide covers everything you need to know about applying to public universities through UPU...',
                'read_time_minutes' => 15,
                'views_count' => 1247,
                'rating' => 4.8,
                'tags' => ['UPU', 'University', 'Application'],
                'is_featured' => true,
                'is_active' => true,
            ],
            [
                'title' => 'STPM vs Matriculation: Which is Right for You?',
                'description' => 'Comprehensive comparison of pre-university pathways',
                'type' => 'Guide',
                'category' => 'Pathways',
                'content' => 'A detailed comparison of STPM and Matriculation programs to help you choose the right path...',
                'read_time_minutes' => 12,
                'views_count' => 892,
                'rating' => 4.9,
                'tags' => ['STPM', 'Matriculation', 'Comparison'],
                'is_featured' => true,
                'is_active' => true,
            ],
            [
                'title' => 'Writing a Winning Personal Statement',
                'description' => 'Tips and templates for crafting compelling personal statements',
                'type' => 'Guide',
                'category' => 'Applications',
                'content' => 'Learn how to write a personal statement that stands out and increases your chances of admission...',
                'read_time_minutes' => 10,
                'views_count' => 654,
                'rating' => 4.7,
                'tags' => ['Personal Statement', 'Application', 'Writing'],
                'is_featured' => false,
                'is_active' => true,
            ],
            [
                'title' => 'Malaysia\'s Tech Industry Outlook 2024',
                'description' => 'Current trends and opportunities in Malaysia\'s technology sector',
                'type' => 'Article',
                'category' => 'Careers',
                'content' => 'An in-depth analysis of the Malaysian tech industry and career opportunities...',
                'read_time_minutes' => 8,
                'views_count' => 432,
                'rating' => 4.5,
                'tags' => ['Technology', 'Career', 'Malaysia'],
                'is_featured' => false,
                'is_active' => true,
            ],
            [
                'title' => 'University Interview Preparation',
                'description' => 'Video guide on preparing for university admission interviews',
                'type' => 'Video',
                'category' => 'Applications',
                'video_url' => 'https://example.com/interview-prep',
                'read_time_minutes' => 25,
                'views_count' => 321,
                'rating' => 4.6,
                'tags' => ['Interview', 'University', 'Preparation'],
                'is_featured' => false,
                'is_active' => true,
            ],
        ];

        foreach ($resources as $resource) {
            Resource::create($resource);
        }
    }
}
