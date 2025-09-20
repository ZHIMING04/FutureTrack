import { router } from '@inertiajs/react';

export default function SavedSimulations({ simulations }) {
    const getLikelihoodColor = (likelihood) => {
        if (likelihood >= 80) return 'text-green-600 bg-green-100';
        if (likelihood >= 60) return 'text-blue-600 bg-blue-100';
        if (likelihood >= 40) return 'text-yellow-600 bg-yellow-100';
        return 'text-red-600 bg-red-100';
    };

    const getLikelihoodLabel = (likelihood) => {
        if (likelihood >= 80) return 'Very High';
        if (likelihood >= 60) return 'High';
        if (likelihood >= 40) return 'Medium';
        if (likelihood >= 20) return 'Low';
        return 'Very Low';
    };

    if (!simulations || simulations.length === 0) {
        return (
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Saved Simulations</h2>
                <div className="text-center py-8">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <h3 className="text-sm font-medium text-gray-900 mb-2">No saved simulations</h3>
                    <p className="text-xs text-gray-500">
                        Run simulations and save them to compare different scenarios.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Saved Simulations</h2>
                <span className="text-sm text-gray-500">{simulations.length} saved</span>
            </div>

            <div className="space-y-3">
                {simulations.map((simulation) => (
                    <div
                        key={simulation.id}
                        className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors duration-200 cursor-pointer"
                        onClick={() => {
                            // Could implement view simulation details
                            console.log('View simulation:', simulation.id);
                        }}
                    >
                        <div className="flex items-start justify-between mb-2">
                            <h3 className="text-sm font-medium text-gray-900 line-clamp-1">
                                {simulation.name}
                            </h3>
                            <span className="text-xs text-gray-500">
                                {simulation.createdAt}
                            </span>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-600">Admission Likelihood:</span>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLikelihoodColor(simulation.admissionLikelihood)}`}>
                                    {simulation.admissionLikelihood}% - {getLikelihoodLabel(simulation.admissionLikelihood)}
                                </span>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-600">Timeline:</span>
                                <span className="text-xs font-medium text-gray-900">{simulation.timeline}</span>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-600">Cost:</span>
                                <span className="text-xs font-medium text-gray-900">{simulation.estimatedCost}</span>
                            </div>
                        </div>

                        <div className="mt-3 flex space-x-2">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    // Implement view details
                                    console.log('View details:', simulation.id);
                                }}
                                className="flex-1 px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors duration-200"
                            >
                                View
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    // Implement duplicate simulation
                                    console.log('Duplicate:', simulation.id);
                                }}
                                className="flex-1 px-2 py-1 border border-gray-300 text-gray-700 text-xs rounded hover:bg-gray-50 transition-colors duration-200"
                            >
                                Duplicate
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {simulations.length > 3 && (
                <div className="mt-4 text-center">
                    <button
                        onClick={() => {
                            // Implement view all simulations
                            console.log('View all simulations');
                        }}
                        className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                    >
                        View All Simulations
                    </button>
                </div>
            )}
        </div>
    );
}
