export default function CourseFilters({ 
    selectedType, 
    selectedDifficulty, 
    searchTerm, 
    onTypeChange, 
    onDifficultyChange, 
    onSearchChange 
}) {
    const typeOptions = [
        { value: 'all', label: 'All Types' },
        { value: 'Free', label: 'Free' },
        { value: 'Paid', label: 'Paid' },
        { value: 'Premium', label: 'Premium' }
    ];

    const difficultyOptions = [
        { value: 'all', label: 'All Levels' },
        { value: 'Beginner', label: 'Beginner' },
        { value: 'Intermediate', label: 'Intermediate' },
        { value: 'Advanced', label: 'Advanced' }
    ];

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Search */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Search Courses
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => onSearchChange(e.target.value)}
                            placeholder="Search by title or description..."
                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        />
                    </div>
                </div>

                {/* Type Filter */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Course Type
                    </label>
                    <select
                        value={selectedType}
                        onChange={(e) => onTypeChange(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    >
                        {typeOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Difficulty Filter */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Difficulty Level
                    </label>
                    <select
                        value={selectedDifficulty}
                        onChange={(e) => onDifficultyChange(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    >
                        {difficultyOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Active Filters Display */}
            <div className="mt-4 flex flex-wrap gap-2">
                {selectedType !== 'all' && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Type: {typeOptions.find(t => t.value === selectedType)?.label}
                        <button
                            onClick={() => onTypeChange('all')}
                            className="ml-1 text-blue-600 hover:text-blue-800"
                        >
                            ×
                        </button>
                    </span>
                )}
                {selectedDifficulty !== 'all' && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Level: {difficultyOptions.find(d => d.value === selectedDifficulty)?.label}
                        <button
                            onClick={() => onDifficultyChange('all')}
                            className="ml-1 text-green-600 hover:text-green-800"
                        >
                            ×
                        </button>
                    </span>
                )}
                {searchTerm && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        Search: "{searchTerm}"
                        <button
                            onClick={() => onSearchChange('')}
                            className="ml-1 text-yellow-600 hover:text-yellow-800"
                        >
                            ×
                        </button>
                    </span>
                )}
            </div>

            {/* Clear All Filters */}
            {(selectedType !== 'all' || selectedDifficulty !== 'all' || searchTerm) && (
                <div className="mt-4">
                    <button
                        onClick={() => {
                            onTypeChange('all');
                            onDifficultyChange('all');
                            onSearchChange('');
                        }}
                        className="text-sm text-gray-600 hover:text-gray-800 font-medium"
                    >
                        Clear all filters
                    </button>
                </div>
            )}
        </div>
    );
}
