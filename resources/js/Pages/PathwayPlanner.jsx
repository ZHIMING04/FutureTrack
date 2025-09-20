import { useState } from 'react';
import { Head } from '@inertiajs/react';
import MainLayout from '../Layout/MainLayout';
import PathwayCard from '../Component/Pathway/PathwayCard';
import PathwayFilters from '../Component/Pathway/PathwayFilters';
import PathwayComparison from '../Component/Pathway/PathwayComparison';

export default function PathwayPlanner({ user, careerGoal, pathways, navigationItems }) {
    const [selectedPathways, setSelectedPathways] = useState([]);
    const [showComparison, setShowComparison] = useState(false);
    const [filters, setFilters] = useState({
        duration: '',
        costRange: '',
        competitiveness: '',
        matchLevel: ''
    });

    // Filter pathways based on selected filters
    const filteredPathways = pathways.filter(pathway => {
        const matchesDuration = !filters.duration || 
            (filters.duration === 'short' && pathway.totalDuration <= 2) ||
            (filters.duration === 'medium' && pathway.totalDuration > 2 && pathway.totalDuration <= 4) ||
            (filters.duration === 'long' && pathway.totalDuration > 4);
        
        const matchesCost = !filters.costRange || 
            (filters.costRange === 'low' && pathway.costRange.includes('Low')) ||
            (filters.costRange === 'medium' && pathway.costRange.includes('Medium')) ||
            (filters.costRange === 'high' && pathway.costRange.includes('High'));
        
        const matchesCompetitiveness = !filters.competitiveness || 
            pathway.competitiveness.toLowerCase() === filters.competitiveness.toLowerCase();
        
        const matchesLevel = !filters.matchLevel ||
            (filters.matchLevel === 'high' && pathway.matchPercentage >= 70) ||
            (filters.matchLevel === 'medium' && pathway.matchPercentage >= 40 && pathway.matchPercentage < 70) ||
            (filters.matchLevel === 'low' && pathway.matchPercentage < 40);

        return matchesDuration && matchesCost && matchesCompetitiveness && matchesLevel;
    });

    const handlePathwaySelect = (pathwayId) => {
        setSelectedPathways(prev => {
            if (prev.includes(pathwayId)) {
                return prev.filter(id => id !== pathwayId);
            } else {
                return [...prev, pathwayId];
            }
        });
    };

    const handleFilterChange = (filterType, value) => {
        setFilters(prev => ({
            ...prev,
            [filterType]: value
        }));
    };

    const clearFilters = () => {
        setFilters({
            duration: '',
            costRange: '',
            competitiveness: '',
            matchLevel: ''
        });
    };

    const selectedPathwayData = pathways.filter(p => selectedPathways.includes(p.id));

    return (
        <MainLayout 
            title="Pathway Planner" 
            navigationItems={navigationItems}
            studentProfile={user}
        >
            <Head title="Pathway Planner - NexScholar" />

            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Pathway Planner</h1>
                    <p className="text-gray-600">
                        Explore education pathways to achieve your career goal: <span className="font-semibold text-blue-600">{careerGoal}</span>
                    </p>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <PathwayFilters
                        filters={filters}
                        onFilterChange={handleFilterChange}
                        onClearFilters={clearFilters}
                    />
                </div>

                {/* Comparison Bar */}
                {selectedPathways.length > 0 && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                                <span className="text-blue-800 font-medium">
                                    {selectedPathways.length} pathway{selectedPathways.length !== 1 ? 's' : ''} selected for comparison
                                </span>
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => setShowComparison(!showComparison)}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm"
                                >
                                    {showComparison ? 'Hide' : 'Show'} Comparison
                                </button>
                                <button
                                    onClick={() => setSelectedPathways([])}
                                    className="px-4 py-2 border border-blue-300 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors duration-200 text-sm"
                                >
                                    Clear Selection
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Comparison View */}
                {showComparison && selectedPathwayData.length > 0 && (
                    <div className="mb-8">
                        <PathwayComparison pathways={selectedPathwayData} />
                    </div>
                )}

                {/* Results Summary */}
                <div className="flex items-center justify-between mb-6">
                    <div className="text-gray-600">
                        Showing {filteredPathways.length} of {pathways.length} pathways
                    </div>
                    <div className="text-sm text-gray-500">
                        Sorted by match percentage
                    </div>
                </div>

                {/* Pathway Cards */}
                {filteredPathways.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {filteredPathways.map((pathway) => (
                            <PathwayCard
                                key={pathway.id}
                                pathway={pathway}
                                isSelected={selectedPathways.includes(pathway.id)}
                                onSelect={() => handlePathwaySelect(pathway.id)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No pathways found</h3>
                        <p className="text-gray-500 mb-4">
                            Try adjusting your filters to find more pathways.
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
