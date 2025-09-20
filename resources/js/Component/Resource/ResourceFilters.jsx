export default function ResourceFilters({ 
    searchTerm, 
    category, 
    type, 
    categories, 
    types, 
    onSearchChange, 
    onCategoryChange, 
    onTypeChange, 
    onSearch 
}) {
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <form onSubmit={onSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Search */}
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Search Resources
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
                            placeholder="Search by title, description, or tags..."
                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        />
                    </div>
                </div>

                {/* Category Filter */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category
                    </label>
                    <select
                        value={category}
                        onChange={(e) => onCategoryChange(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    >
                        <option value="All Categories">All Categories</option>
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                {/* Type Filter */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Resource Type
                    </label>
                    <select
                        value={type}
                        onChange={(e) => onTypeChange(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    >
                        <option value="All Resources">All Resources</option>
                        {types.map((resourceType) => (
                            <option key={resourceType} value={resourceType}>{resourceType}</option>
                        ))}
                    </select>
                </div>
            </form>

            {/* Active Filters Display */}
            <div className="mt-4 flex flex-wrap gap-2">
                {category !== 'All Categories' && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Category: {category}
                        <button
                            onClick={() => onCategoryChange('All Categories')}
                            className="ml-1 text-blue-600 hover:text-blue-800"
                        >
                            ×
                        </button>
                    </span>
                )}
                {type !== 'All Resources' && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Type: {type}
                        <button
                            onClick={() => onTypeChange('All Resources')}
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
            {(category !== 'All Categories' || type !== 'All Resources' || searchTerm) && (
                <div className="mt-4">
                    <button
                        onClick={() => {
                            onCategoryChange('All Categories');
                            onTypeChange('All Resources');
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
