export default function CareerFilters({
    domains,
    matchLevels,
    selectedDomain,
    selectedMatchLevel,
    sortBy,
    onFilterChange,
    onSortChange,
    onClearFilters
}) {
    return (
        <div className="flex flex-wrap items-center gap-4">
            {/* Domain Filter */}
            <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700">Domain:</label>
                <select
                    value={selectedDomain}
                    onChange={(e) => onFilterChange('domain', e.target.value)}
                    className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                    <option value="">All Domains</option>
                    {domains.map((domain) => (
                        <option key={domain} value={domain}>
                            {domain}
                        </option>
                    ))}
                </select>
            </div>

            {/* Match Level Filter */}
            <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700">Match Level:</label>
                <select
                    value={selectedMatchLevel}
                    onChange={(e) => onFilterChange('matchLevel', e.target.value)}
                    className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                    <option value="">All Levels</option>
                    {matchLevels.map((level) => (
                        <option key={level} value={level}>
                            {level}
                        </option>
                    ))}
                </select>
            </div>

            {/* Sort By */}
            <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700">Sort by:</label>
                <select
                    value={sortBy}
                    onChange={(e) => onSortChange(e.target.value)}
                    className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                    <option value="match">Match Percentage</option>
                    <option value="demand">Demand Level</option>
                    <option value="title">Title A-Z</option>
                </select>
            </div>

            {/* Clear Filters */}
            {(selectedDomain || selectedMatchLevel || sortBy !== 'match') && (
                <button
                    onClick={onClearFilters}
                    className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                >
                    Clear Filters
                </button>
            )}
        </div>
    );
}
