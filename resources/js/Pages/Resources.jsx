import { useState } from 'react';
import { Head } from '@inertiajs/react';
import MainLayout from '../Layout/MainLayout';
import ResourceFilters from '../Component/Resource/ResourceFilters';
import ResourceGrid from '../Component/Resource/ResourceGrid';

export default function Resources({ 
    user, 
    resources, 
    filters, 
    search, 
    selectedCategory, 
    selectedType, 
    navigationItems 
}) {
    const [searchTerm, setSearchTerm] = useState(search || '');
    const [category, setCategory] = useState(selectedCategory || 'All Categories');
    const [type, setType] = useState(selectedType || 'All Resources');

    const featuredResources = resources?.filter(resource => resource.isFeatured) || [];
    const regularResources = resources?.filter(resource => !resource.isFeatured) || [];

    const handleSearch = (e) => {
        e.preventDefault();
        // In a real implementation, this would trigger a search
        console.log('Searching for:', searchTerm, 'Category:', category, 'Type:', type);
    };

    return (
        <MainLayout 
            title="Resources" 
            navigationItems={navigationItems}
            studentProfile={user}
        >
            <Head title="Resources - NexScholar" />

            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Resources</h1>
                    <p className="text-gray-600">
                        Access educational materials, guides, and tools to support your learning journey.
                    </p>
                </div>

                {/* Filters and Search */}
                <div className="mb-8">
                    <ResourceFilters
                        searchTerm={searchTerm}
                        category={category}
                        type={type}
                        categories={filters?.categories || []}
                        types={filters?.types || []}
                        onSearchChange={setSearchTerm}
                        onCategoryChange={setCategory}
                        onTypeChange={setType}
                        onSearch={handleSearch}
                    />
                </div>

                {/* Resources Grid */}
                <ResourceGrid
                    resources={regularResources}
                    searchTerm={searchTerm}
                    category={category}
                    type={type}
                />
            </div>
        </MainLayout>
    );
}
