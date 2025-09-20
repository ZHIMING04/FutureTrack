<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Resource;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ResourcesController extends Controller
{
    public function index(Request $request)
    {
        $user = User::first();
        
        if (!$user) {
            return Inertia::render('Resources', [
                'user' => null,
                'resourceData' => null
            ]);
        }

        $search = $request->get('search');
        $category = $request->get('category', 'All Categories');
        $type = $request->get('type', 'All Resources');

        // Build query
        $query = Resource::where('is_active', true);

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%")
                  ->orWhereJsonContains('tags', $search);
            });
        }

        if ($category !== 'All Categories') {
            $query->where('category', $category);
        }

        if ($type !== 'All Resources') {
            $query->where('type', $type);
        }

        $resources = $query->orderBy('is_featured', 'desc')
                          ->orderBy('views_count', 'desc')
                          ->get();

        // Get categories and types for filters
        $categories = Resource::distinct()->pluck('category')->filter()->values();
        $types = Resource::distinct()->pluck('type')->filter()->values();

        // Format resource data
        $resourceData = $resources->map(function ($resource) {
            return [
                'id' => $resource->id,
                'title' => $resource->title,
                'description' => $resource->description,
                'type' => $resource->type,
                'category' => $resource->category,
                'readTimeMinutes' => $resource->read_time_minutes,
                'viewsCount' => $resource->views_count,
                'rating' => $resource->rating,
                'tags' => $resource->tags,
                'isFeatured' => $resource->is_featured,
                'fileUrl' => $resource->file_url,
                'videoUrl' => $resource->video_url
            ];
        });

        return Inertia::render('Resources', [
            'user' => [
                'name' => $user->name,
                'initials' => $user->initials
            ],
            'resources' => $resourceData,
            'filters' => [
                'categories' => $categories,
                'types' => $types
            ],
            'search' => $search,
            'selectedCategory' => $category,
            'selectedType' => $type
        ]);
    }

    public function view(Request $request, $id)
    {
        $resource = Resource::findOrFail($id);
        
        // Increment view count
        $resource->incrementViews();

        return Inertia::render('ResourceView', [
            'resource' => [
                'id' => $resource->id,
                'title' => $resource->title,
                'description' => $resource->description,
                'content' => $resource->content,
                'type' => $resource->type,
                'category' => $resource->category,
                'readTimeMinutes' => $resource->read_time_minutes,
                'viewsCount' => $resource->views_count + 1,
                'rating' => $resource->rating,
                'tags' => $resource->tags,
                'fileUrl' => $resource->file_url,
                'videoUrl' => $resource->video_url
            ]
        ]);
    }

    public function download(Request $request, $id)
    {
        $resource = Resource::findOrFail($id);
        
        if (!$resource->file_url) {
            return redirect()->back()->with('error', 'No file available for download');
        }

        // In a real implementation, you would return the file
        return redirect($resource->file_url);
    }
}
