export default function PathwayFilters({ filters, onFilterChange, onClearFilters }) {
    const durationOptions = [
        { value: '', label: 'Any Duration' },
        { value: 'short', label: 'Short (≤2 years)' },
        { value: 'medium', label: 'Medium (2-4 years)' },
        { value: 'long', label: 'Long (>4 years)' }
    ];

    const costOptions = [
        { value: '', label: 'Any Cost' },
        { value: 'low', label: 'Low Cost' },
        { value: 'medium', label: 'Medium Cost' },
        { value: 'high', label: 'High Cost' }
    ];

    const competitivenessOptions = [
        { value: '', label: 'Any Level' },
        { value: 'low', label: 'Low Competition' },
        { value: 'medium', label: 'Medium Competition' },
        { value: 'high', label: 'High Competition' }
    ];

    const matchLevelOptions = [
        { value: '', label: 'Any Match Level' },
        { value: 'high', label: 'High Match (≥70%)' },
        { value: 'medium', label: 'Medium Match (40-69%)' },
        { value: 'low', label: 'Low Match (<40%)' }
    ];

    const hasActiveFilters = Object.values(filters).some(value => value !== '');

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Filter Pathways</h3>
                {hasActiveFilters && (
                    <button
                        onClick={onClearFilters}
                        className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                    >
                        Clear All Filters
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Duration Filter */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                    <select
                        value={filters.duration}
                        onChange={(e) => onFilterChange('duration', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        {durationOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Cost Range Filter */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Cost Range</label>
                    <select
                        value={filters.costRange}
                        onChange={(e) => onFilterChange('costRange', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        {costOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Competitiveness Filter */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Competitiveness</label>
                    <select
                        value={filters.competitiveness}
                        onChange={(e) => onFilterChange('competitiveness', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        {competitivenessOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Match Level Filter */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Match Level</label>
                    <select
                        value={filters.matchLevel}
                        onChange={(e) => onFilterChange('matchLevel', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        {matchLevelOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Active Filters Display */}
            {hasActiveFilters && (
                <div className="flex flex-wrap gap-2">
                    <span className="text-sm text-gray-600">Active filters:</span>
                    {filters.duration && (
                        <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                            Duration: {durationOptions.find(opt => opt.value === filters.duration)?.label}
                            <button
                                onClick={() => onFilterChange('duration', '')}
                                className="ml-1 text-blue-600 hover:text-blue-800"
                            >
                                ×
                            </button>
                        </span>
                    )}
                    {filters.costRange && (
                        <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                            Cost: {costOptions.find(opt => opt.value === filters.costRange)?.label}
                            <button
                                onClick={() => onFilterChange('costRange', '')}
                                className="ml-1 text-blue-600 hover:text-blue-800"
                            >
                                ×
                            </button>
                        </span>
                    )}
                    {filters.competitiveness && (
                        <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                            Competition: {competitivenessOptions.find(opt => opt.value === filters.competitiveness)?.label}
                            <button
                                onClick={() => onFilterChange('competitiveness', '')}
                                className="ml-1 text-blue-600 hover:text-blue-800"
                            >
                                ×
                            </button>
                        </span>
                    )}
                    {filters.matchLevel && (
                        <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                            Match: {matchLevelOptions.find(opt => opt.value === filters.matchLevel)?.label}
                            <button
                                onClick={() => onFilterChange('matchLevel', '')}
                                className="ml-1 text-blue-600 hover:text-blue-800"
                            >
                                ×
                            </button>
                        </span>
                    )}
                </div>
            )}
        </div>
    );
}
