import { useState } from 'react';

export default function PathwayCard({ pathway, isSelected, onSelect }) {
    const [isExpanded, setIsExpanded] = useState(false);

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

    return (
        <div 
            className={`bg-white rounded-lg shadow-md border-2 transition-all duration-200 cursor-pointer ${
                isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => setIsExpanded(!isExpanded)}
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

                {/* Pros and Cons Preview */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <div className="font-medium text-green-700 mb-1">Pros</div>
                        <div className="text-gray-600 line-clamp-2">
                            {pathway.pros?.slice(0, 2).join(', ')}
                        </div>
                    </div>
                    <div>
                        <div className="font-medium text-red-700 mb-1">Cons</div>
                        <div className="text-gray-600 line-clamp-2">
                            {pathway.cons?.slice(0, 2).join(', ')}
                        </div>
                    </div>
                </div>
            </div>

            {/* Expanded Content */}
            {isExpanded && (
                <div className="px-6 pb-6 border-t border-gray-200">
                    {/* Requirements */}
                    <div className="mt-4">
                        <h4 className="text-sm font-semibold text-gray-900 mb-3">Requirements</h4>
                        <div className="space-y-2">
                            {pathway.requirements?.map((req, index) => (
                                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
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

                    {/* Detailed Pros and Cons */}
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <h4 className="text-sm font-semibold text-green-700 mb-2">Advantages</h4>
                            <ul className="space-y-1">
                                {pathway.pros?.map((pro, index) => (
                                    <li key={index} className="text-sm text-gray-600 flex items-start">
                                        <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        {pro}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-sm font-semibold text-red-700 mb-2">Considerations</h4>
                            <ul className="space-y-1">
                                {pathway.cons?.map((con, index) => (
                                    <li key={index} className="text-sm text-gray-600 flex items-start">
                                        <svg className="w-4 h-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                        {con}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-6 flex space-x-3">
                        <button className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium">
                            View Details
                        </button>
                        <button className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-sm font-medium">
                            Save Pathway
                        </button>
                    </div>
                </div>
            )}

            {/* Expand/Collapse Indicator */}
            <div className="px-6 pb-4 flex justify-center">
                <svg
                    className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                        isExpanded ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </div>
        </div>
    );
}
