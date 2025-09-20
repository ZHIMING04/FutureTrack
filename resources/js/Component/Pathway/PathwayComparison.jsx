export default function PathwayComparison({ pathways }) {
    if (pathways.length === 0) return null;

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
        <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Pathway Comparison</h3>
            
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-gray-200">
                            <th className="text-left py-3 px-4 font-medium text-gray-900">Pathway</th>
                            <th className="text-center py-3 px-4 font-medium text-gray-900">Match</th>
                            <th className="text-center py-3 px-4 font-medium text-gray-900">Duration</th>
                            <th className="text-center py-3 px-4 font-medium text-gray-900">Cost</th>
                            <th className="text-center py-3 px-4 font-medium text-gray-900">Competition</th>
                            <th className="text-center py-3 px-4 font-medium text-gray-900">Requirements</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pathways.map((pathway, index) => (
                            <tr key={pathway.id} className="border-b border-gray-100">
                                <td className="py-4 px-4">
                                    <div>
                                        <div className="font-medium text-gray-900">{pathway.name}</div>
                                        <div className="text-sm text-gray-600 line-clamp-2">{pathway.description}</div>
                                    </div>
                                </td>
                                <td className="py-4 px-4 text-center">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getMatchColor(pathway.matchPercentage)}`}>
                                        {pathway.matchPercentage}%
                                    </span>
                                </td>
                                <td className="py-4 px-4 text-center">
                                    <span className="text-sm font-medium text-gray-900">{pathway.totalDuration} years</span>
                                </td>
                                <td className="py-4 px-4 text-center">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCostColor(pathway.costRange)}`}>
                                        {pathway.costRange}
                                    </span>
                                </td>
                                <td className="py-4 px-4 text-center">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCompetitivenessColor(pathway.competitiveness)}`}>
                                        {pathway.competitiveness}
                                    </span>
                                </td>
                                <td className="py-4 px-4 text-center">
                                    <span className="text-sm text-gray-600">{pathway.requirements?.length || 0} requirements</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Summary Stats */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Best Match</h4>
                    <div className="text-lg font-semibold text-blue-600">
                        {pathways.reduce((best, current) => 
                            current.matchPercentage > best.matchPercentage ? current : best
                        ).name}
                    </div>
                    <div className="text-sm text-gray-600">
                        {Math.max(...pathways.map(p => p.matchPercentage))}% match
                    </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Shortest Duration</h4>
                    <div className="text-lg font-semibold text-green-600">
                        {Math.min(...pathways.map(p => p.totalDuration))} years
                    </div>
                    <div className="text-sm text-gray-600">
                        {pathways.find(p => p.totalDuration === Math.min(...pathways.map(p => p.totalDuration)))?.name}
                    </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Lowest Competition</h4>
                    <div className="text-lg font-semibold text-green-600">
                        {pathways.reduce((lowest, current) => {
                            const currentLevel = current.competitiveness.toLowerCase();
                            const lowestLevel = lowest.competitiveness.toLowerCase();
                            const levels = { 'low': 1, 'medium': 2, 'high': 3 };
                            return levels[currentLevel] < levels[lowestLevel] ? current : lowest;
                        }).competitiveness}
                    </div>
                    <div className="text-sm text-gray-600">
                        {pathways.reduce((lowest, current) => {
                            const currentLevel = current.competitiveness.toLowerCase();
                            const lowestLevel = lowest.competitiveness.toLowerCase();
                            const levels = { 'low': 1, 'medium': 2, 'high': 3 };
                            return levels[currentLevel] < levels[lowestLevel] ? current : lowest;
                        }).name}
                    </div>
                </div>
            </div>
        </div>
    );
}
