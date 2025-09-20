export default function PathComparison({ mainPath, backupPath, onClose }) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">Path Comparison</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Main Path */}
                        <div className="border border-gray-200 rounded-lg p-6">
                            <div className="flex items-center mb-4">
                                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                                    <span className="text-white text-sm font-bold">1</span>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900">{mainPath.title}</h3>
                            </div>
                            
                            <div className="space-y-4">
                                <div>
                                    <h4 className="text-sm font-medium text-gray-700 mb-2">Description</h4>
                                    <p className="text-gray-600">{mainPath.description}</p>
                                </div>
                                
                                <div>
                                    <h4 className="text-sm font-medium text-gray-700 mb-2">Summary</h4>
                                    <p className="text-gray-600">{mainPath.summary}</p>
                                </div>
                                
                                <div className="bg-blue-50 rounded-lg p-4">
                                    <h4 className="text-sm font-medium text-blue-900 mb-2">Advantages</h4>
                                    <ul className="space-y-1 text-sm text-blue-800">
                                        <li>• More traditional pathway</li>
                                        <li>• Better preparation for university</li>
                                        <li>• Recognized by all universities</li>
                                        <li>• Strong foundation in core subjects</li>
                                    </ul>
                                </div>
                                
                                <div className="bg-yellow-50 rounded-lg p-4">
                                    <h4 className="text-sm font-medium text-yellow-900 mb-2">Considerations</h4>
                                    <ul className="space-y-1 text-sm text-yellow-800">
                                        <li>• Longer duration</li>
                                        <li>• More competitive entry</li>
                                        <li>• Requires higher grades</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Backup Path */}
                        <div className="border border-gray-200 rounded-lg p-6">
                            <div className="flex items-center mb-4">
                                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center mr-3">
                                    <span className="text-white text-sm font-bold">2</span>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900">{backupPath.title}</h3>
                            </div>
                            
                            <div className="space-y-4">
                                <div>
                                    <h4 className="text-sm font-medium text-gray-700 mb-2">Description</h4>
                                    <p className="text-gray-600">{backupPath.description}</p>
                                </div>
                                
                                <div>
                                    <h4 className="text-sm font-medium text-gray-700 mb-2">Summary</h4>
                                    <p className="text-gray-600">{backupPath.summary}</p>
                                </div>
                                
                                <div className="bg-green-50 rounded-lg p-4">
                                    <h4 className="text-sm font-medium text-green-900 mb-2">Advantages</h4>
                                    <ul className="space-y-1 text-sm text-green-800">
                                        <li>• Shorter duration</li>
                                        <li>• Direct pathway to degree</li>
                                        <li>• Less competitive entry</li>
                                        <li>• Lower cost</li>
                                    </ul>
                                </div>
                                
                                <div className="bg-yellow-50 rounded-lg p-4">
                                    <h4 className="text-sm font-medium text-yellow-900 mb-2">Considerations</h4>
                                    <ul className="space-y-1 text-sm text-yellow-800">
                                        <li>• Limited university options</li>
                                        <li>• Less preparation time</li>
                                        <li>• May require bridging courses</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Comparison Summary */}
                    <div className="mt-8 bg-gray-50 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Comparison</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-gray-900 mb-1">Duration</div>
                                <div className="text-sm text-gray-600">
                                    <div className="font-medium">{mainPath.title}: 7 years</div>
                                    <div className="font-medium">{backupPath.title}: 6 years</div>
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-gray-900 mb-1">Cost</div>
                                <div className="text-sm text-gray-600">
                                    <div className="font-medium">{mainPath.title}: RM 22,000</div>
                                    <div className="font-medium">{backupPath.title}: RM 20,000</div>
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-gray-900 mb-1">Entry Level</div>
                                <div className="text-sm text-gray-600">
                                    <div className="font-medium">{mainPath.title}: Higher</div>
                                    <div className="font-medium">{backupPath.title}: Lower</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-8 flex justify-center space-x-4">
                        <button
                            onClick={onClose}
                            className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
                        >
                            Close
                        </button>
                        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                            Get Detailed Analysis
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
