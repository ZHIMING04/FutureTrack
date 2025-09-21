import { useState } from 'react';

export default function PathwayCard({ pathway, isSelected, onSelect }) {
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const getMatchColor = (percentage) => {
        if (percentage >= 70) return 'text-green-600 bg-green-100';
        if (percentage >= 40) return 'text-blue-600 bg-blue-100';
        return 'text-yellow-600 bg-yellow-100';
    };

    const getCompetitivenessColor = (level) => {
        switch (level.toLowerCase()) {
            case 'high': return 'text-red-600 bg-red-100';
            case 'medium': return 'text-yellow-600 bg-yellow-100';
            case 'low': return 'text-green-600 bg-green-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };

    const getCostColor = (range) => {
        if (range.includes('Low')) return 'text-green-600 bg-green-100';
        if (range.includes('Medium')) return 'text-yellow-600 bg-yellow-100';
        if (range.includes('High')) return 'text-red-600 bg-red-100';
        return 'text-gray-600 bg-gray-100';
    };

    const handleSavePathway = () => {
        if (!isSaved) {
            setIsSaved(true);
            setShowSuccessMessage(true);
            
            // Hide success message after 3 seconds
            setTimeout(() => {
                setShowSuccessMessage(false);
            }, 3000);
        }
    };

    return (
        <div 
            className={`bg-white rounded-lg shadow-md border-2 transition-all duration-200 ${
                isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
            }`}
        >
            {/* Header */}
            <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{pathway.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{pathway.description}</p>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${getMatchColor(pathway.matchPercentage)}`}>
                            {pathway.matchPercentage}% Match
                        </div>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onSelect();
                            }}
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors duration-200 ${
                                isSelected 
                                    ? 'border-blue-500 bg-blue-500' 
                                    : 'border-gray-300 hover:border-blue-400'
                            }`}
                        >
                            {isSelected && (
                                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                        <div className="text-sm font-medium text-gray-900">{pathway.totalDuration} years</div>
                        <div className="text-xs text-gray-500">Duration</div>
                    </div>
                    <div className="text-center">
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${getCostColor(pathway.costRange)}`}>
                            {pathway.costRange}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">Cost</div>
                    </div>
                    <div className="text-center">
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${getCompetitivenessColor(pathway.competitiveness)}`}>
                            {pathway.competitiveness}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">Competition</div>
                    </div>
                </div>

                {/* Pros and Cons */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <div className="font-medium text-green-700 mb-1">Pros</div>
                        <div className="text-gray-600">
                            {pathway.pros?.join(', ')}
                        </div>
                    </div>
                    <div>
                        <div className="font-medium text-red-700 mb-1">Cons</div>
                        <div className="text-gray-600">
                            {pathway.cons?.join(', ')}
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="mt-6 flex space-x-3">
                    <button 
                        onClick={() => setShowDetailsModal(true)}
                        className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium"
                    >
                        View Details
                    </button>
                    <button 
                        onClick={handleSavePathway}
                        disabled={isSaved}
                        className={`flex-1 py-2 px-4 rounded-lg transition-colors duration-200 text-sm font-medium flex items-center justify-center ${
                            isSaved 
                                ? 'bg-green-600 text-white cursor-not-allowed' 
                                : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                    >
                        {isSaved ? (
                            <>
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Saved
                            </>
                        ) : (
                            'Save Pathway'
                        )}
                    </button>
                </div>
            </div>

            {/* Success Message */}
            {showSuccessMessage && (
                <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center animate-pulse">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-medium">Pathway saved successfully!</span>
                </div>
            )}

            {/* Details Modal */}
            {showDetailsModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                        {/* Modal Header */}
                        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                            <h3 className="text-xl font-semibold text-gray-900">
                                {pathway.name} - Detailed Information
                            </h3>
                            <button 
                                onClick={() => setShowDetailsModal(false)} 
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6">
                            {/* Description */}
                            <div className="mb-6">
                                <h4 className="text-lg font-semibold text-gray-900 mb-2">Description</h4>
                                <p className="text-gray-700">{pathway.description}</p>
                            </div>

                            {/* Requirements */}
                            <div className="mb-6">
                                <h4 className="text-lg font-semibold text-gray-900 mb-3">Requirements</h4>
                                <div className="space-y-3">
                                    {pathway.requirements?.map((req, index) => (
                                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">{req.subject}</div>
                                                <div className="text-xs text-gray-600">{req.description}</div>
                                            </div>
                                            <div className="text-sm font-medium text-blue-600">
                                                Min: {req.minimumGrade}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Advantages and Considerations */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="text-lg font-semibold text-green-700 mb-3">Advantages</h4>
                                    <ul className="space-y-2">
                                        {pathway.pros?.map((pro, index) => (
                                            <li key={index} className="text-sm text-gray-700 flex items-start">
                                                <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                {pro}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold text-red-700 mb-3">Considerations</h4>
                                    <ul className="space-y-2">
                                        {pathway.cons?.map((con, index) => (
                                            <li key={index} className="text-sm text-gray-700 flex items-start">
                                                <svg className="w-4 h-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                                {con}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Modal Actions */}
                            <div className="mt-6 flex justify-end space-x-3">
                                <button 
                                    onClick={() => setShowDetailsModal(false)}
                                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-sm font-medium"
                                >
                                    Close
                                </button>
                                <button 
                                    onClick={handleSavePathway}
                                    disabled={isSaved}
                                    className={`px-4 py-2 rounded-lg transition-colors duration-200 text-sm font-medium flex items-center ${
                                        isSaved 
                                            ? 'bg-green-600 text-white cursor-not-allowed' 
                                            : 'bg-blue-600 text-white hover:bg-blue-700'
                                    }`}
                                >
                                    {isSaved ? (
                                        <>
                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            Saved
                                        </>
                                    ) : (
                                        'Save Pathway'
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
