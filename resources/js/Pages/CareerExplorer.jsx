import { useState } from 'react';
import { Head } from '@inertiajs/react';
import MainLayout from '../Layout/MainLayout';
import CareerCard from '../Component/Career/CareerCard';
import CareerFilters from '../Component/Career/CareerFilters';
import CareerSearch from '../Component/Career/CareerSearch';

export default function CareerExplorer({ user, careers, filters, universityCourses, navigationItems }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDomain, setSelectedDomain] = useState('');
    const [selectedMatchLevel, setSelectedMatchLevel] = useState('');
    const [sortBy, setSortBy] = useState('match');

    // Filter and sort careers
    const filteredCareers = careers
        .filter(career => {
            const matchesSearch = career.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                career.description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesDomain = !selectedDomain || career.domain === selectedDomain;
            const matchesLevel = !selectedMatchLevel || 
                (selectedMatchLevel === 'High Match' && career.matchPercentage >= 70) ||
                (selectedMatchLevel === 'Medium Match' && career.matchPercentage >= 40 && career.matchPercentage < 70) ||
                (selectedMatchLevel === 'Low Match' && career.matchPercentage < 40);
            
            return matchesSearch && matchesDomain && matchesLevel;
        })
        .sort((a, b) => {
            switch (sortBy) {
                case 'match':
                    return b.matchPercentage - a.matchPercentage;
                case 'demand':
                    return b.demandIndex - a.demandIndex;
                case 'title':
                    return a.title.localeCompare(b.title);
                default:
                    return 0;
            }
        });

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    const handleFilterChange = (filterType, value) => {
        if (filterType === 'domain') {
            setSelectedDomain(value);
        } else if (filterType === 'matchLevel') {
            setSelectedMatchLevel(value);
        }
    };

    const handleSortChange = (sortType) => {
        setSortBy(sortType);
    };

    const clearFilters = () => {
        setSearchTerm('');
        setSelectedDomain('');
        setSelectedMatchLevel('');
        setSortBy('match');
    };

    return (
        <MainLayout 
            title="Career Explorer" 
            navigationItems={navigationItems}
            studentProfile={user}
        >
            <Head title="Career Explorer - NexScholar" />

            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Career Explorer</h1>
                    <p className="text-gray-600">
                        Discover careers that match your interests, skills, and goals.
                    </p>
                </div>

                {/* Search and Filters */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <CareerSearch onSearch={handleSearch} searchTerm={searchTerm} />
                    
                    <div className="mt-4">
                        <CareerFilters
                            domains={filters.domains}
                            matchLevels={filters.matchLevels}
                            selectedDomain={selectedDomain}
                            selectedMatchLevel={selectedMatchLevel}
                            sortBy={sortBy}
                            onFilterChange={handleFilterChange}
                            onSortChange={handleSortChange}
                            onClearFilters={clearFilters}
                        />
                    </div>
                </div>

                {/* Results Summary */}
                <div className="flex items-center justify-between mb-6">
                    <div className="text-gray-600">
                        Showing {filteredCareers.length} of {careers.length} careers
                    </div>
                    <div className="text-sm text-gray-500">
                        Sorted by {sortBy === 'match' ? 'Match Percentage' : 
                                  sortBy === 'demand' ? 'Demand Level' : 'Title'}
                    </div>
                </div>

                {/* Career Cards */}
                {filteredCareers.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredCareers.map((career) => (
                            <CareerCard
                                key={career.id}
                                career={career}
                                isPrimaryGoal={career.isPrimaryGoal}
                                universityCourses={universityCourses[career.title] || []}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No careers found</h3>
                        <p className="text-gray-500 mb-4">
                            Try adjusting your search terms or filters to find more careers.
                        </p>
                        <button
                            onClick={clearFilters}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                        >
                            Clear Filters
                        </button>
                    </div>
                )}
            </div>
        </MainLayout>
    );
}
