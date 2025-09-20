export default function RoadmapHeader({ 
    careerGoal, 
    mainPath, 
    backupPath, 
    selectedPath, 
    onPathChange, 
    onToggleComparison, 
    showComparison 
}) {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">My Roadmap</h1>
                    <p className="text-gray-600">
                        Your personalized journey to becoming a <span className="font-semibold text-blue-600">{careerGoal}</span>
                    </p>
                </div>
                <button
                    onClick={onToggleComparison}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center"
                >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    Compare Paths
                </button>
            </div>

            {/* Path Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div 
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                        selectedPath === 'main' 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => onPathChange('main')}
                >
                    <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{mainPath.title}</h3>
                        {selectedPath === 'main' && (
                            <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                        )}
                    </div>
                    <p className="text-gray-600 mb-2">{mainPath.description}</p>
                    <p className="text-sm text-gray-500">{mainPath.summary}</p>
                </div>

                <div 
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                        selectedPath === 'backup' 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => onPathChange('backup')}
                >
                    <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{backupPath.title}</h3>
                        {selectedPath === 'backup' && (
                            <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                        )}
                    </div>
                    <p className="text-gray-600 mb-2">{backupPath.description}</p>
                    <p className="text-sm text-gray-500">{backupPath.summary}</p>
                </div>
            </div>

            {/* Selected Path Details */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="text-sm font-semibold text-gray-900 mb-2">Selected Path Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                        <span className="text-gray-600">Path:</span>
                        <span className="ml-2 font-medium text-gray-900">
                            {selectedPath === 'main' ? mainPath.title : backupPath.title}
                        </span>
                    </div>
                    <div>
                        <span className="text-gray-600">Description:</span>
                        <span className="ml-2 font-medium text-gray-900">
                            {selectedPath === 'main' ? mainPath.description : backupPath.description}
                        </span>
                    </div>
                    <div>
                        <span className="text-gray-600">Summary:</span>
                        <span className="ml-2 font-medium text-gray-900">
                            {selectedPath === 'main' ? mainPath.summary : backupPath.summary}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
