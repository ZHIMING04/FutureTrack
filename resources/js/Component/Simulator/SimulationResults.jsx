import { useState } from 'react';

export default function SimulationResults({ result, onSave }) {
    const [isSaving, setIsSaving] = useState(false);
    const [simulationName, setSimulationName] = useState('');

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

    const getRiskSeverityColor = (severity) => {
        switch (severity) {
            case 'high': return 'text-red-600 bg-red-100';
            case 'medium': return 'text-yellow-600 bg-yellow-100';
            case 'low': return 'text-blue-600 bg-blue-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };

    const handleSave = async () => {
        if (!simulationName.trim()) {
            alert('Please enter a simulation name');
            return;
        }

        setIsSaving(true);
        try {
            await onSave({
                name: simulationName,
                pathway_data: result,
                grade_adjustments: {}, // This would come from the controls
                admission_likelihood: result.admissionLikelihood,
                timeline: result.timeline,
                estimated_cost: result.estimatedCost,
                risk_assessment: result.riskAssessment,
                improvement_suggestions: result.improvementSuggestions
            });
        } catch (error) {
            console.error('Error saving simulation:', error);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Simulation Results</h2>
                <div className="flex items-center space-x-2">
                    <input
                        type="text"
                        value={simulationName}
                        onChange={(e) => setSimulationName(e.target.value)}
                        placeholder="Simulation name..."
                        className="px-3 py-1 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                        onClick={handleSave}
                        disabled={!simulationName.trim() || isSaving}
                        className="px-4 py-1 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                    >
                        {isSaving ? 'Saving...' : 'Save'}
                    </button>
                </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-2 ${getLikelihoodColor(result.admissionLikelihood)}`}>
                        {result.admissionLikelihood}% - {getLikelihoodLabel(result.admissionLikelihood)}
                    </div>
                    <div className="text-lg font-semibold text-gray-900">Admission Likelihood</div>
                    <div className="text-sm text-gray-600">Based on your grade improvements</div>
                </div>

                <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600 mb-1">{result.timeline}</div>
                    <div className="text-lg font-semibold text-gray-900">Timeline</div>
                    <div className="text-sm text-gray-600">Years to complete pathway</div>
                </div>

                <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-lg font-semibold text-gray-900 mb-1">{result.estimatedCost}</div>
                    <div className="text-sm text-gray-600">Estimated Cost Range</div>
                    <div className="text-xs text-gray-500 mt-1">Including tuition and living expenses</div>
                </div>
            </div>

            {/* Risk Assessment */}
            {result.riskAssessment && result.riskAssessment.length > 0 && (
                <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Assessment</h3>
                    <div className="space-y-3">
                        {result.riskAssessment.map((risk, index) => (
                            <div key={index} className="flex items-start p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                                <div className="flex-shrink-0 mr-3">
                                    <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm font-medium text-gray-900">{risk.message}</p>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskSeverityColor(risk.severity)}`}>
                                            {risk.severity}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Improvement Suggestions */}
            {result.improvementSuggestions && result.improvementSuggestions.length > 0 && (
                <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Improvement Suggestions</h3>
                    <div className="space-y-2">
                        {result.improvementSuggestions.map((suggestion, index) => (
                            <div key={index} className="flex items-start p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                <div className="flex-shrink-0 mr-3">
                                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                    </svg>
                                </div>
                                <p className="text-sm text-gray-900">{suggestion}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4">
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                    View Pathway Details
                </button>
                <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    Compare with Other Pathways
                </button>
            </div>
        </div>
    );
}
