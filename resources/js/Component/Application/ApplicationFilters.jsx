export default function ApplicationFilters({ 
    selectedFilter, 
    selectedStatus, 
    searchTerm, 
    onFilterChange, 
    onStatusChange, 
    onSearchChange 
}) {
    const filterOptions = [
        { value: 'all', label: 'All Applications', count: null },
        { value: 'urgent', label: 'Urgent (≤7 days)', count: null },
        { value: 'active', label: 'Active', count: null },
        { value: 'submitted', label: 'Submitted', count: null }
    ];

    const statusOptions = [
        { value: 'all', label: 'All Statuses' },
        { value: 'Not Started', label: 'Not Started' },
        { value: 'In Progress', label: 'In Progress' },
        { value: 'Submitted', label: 'Submitted' },
        { value: 'Under Review', label: 'Under Review' },
        { value: 'Accepted', label: 'Accepted' },
        { value: 'Rejected', label: 'Rejected' }
    ];

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Search */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Search Applications
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
                            placeholder="Search by name or organization..."
                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        />
                    </div>
                </div>

                {/* Filter */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Filter by Type
                    </label>
                    <select
                        value={selectedFilter}
                        onChange={(e) => onFilterChange(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    >
                        {filterOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Status */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Filter by Status
                    </label>
                    <select
                        value={selectedStatus}
                        onChange={(e) => onStatusChange(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    >
                        {statusOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Active Filters Display */}
            <div className="mt-4 flex flex-wrap gap-2">
                {selectedFilter !== 'all' && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {filterOptions.find(f => f.value === selectedFilter)?.label}
                        <button
                            onClick={() => onFilterChange('all')}
                            className="ml-1 text-blue-600 hover:text-blue-800"
                        >
                            ×
                        </button>
                    </span>
                )}
                {selectedStatus !== 'all' && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {statusOptions.find(s => s.value === selectedStatus)?.label}
                        <button
                            onClick={() => onStatusChange('all')}
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
            {(selectedFilter !== 'all' || selectedStatus !== 'all' || searchTerm) && (
                <div className="mt-4">
                    <button
                        onClick={() => {
                            onFilterChange('all');
                            onStatusChange('all');
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
