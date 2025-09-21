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
        <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Simulation Results</h2>
                        <p className="text-sm text-gray-600">Your pathway analysis based on current settings</p>
                    </div>
                </div>
                <div className="flex items-center space-x-3">
                    <input
                        type="text"
                        value={simulationName}
                        onChange={(e) => setSimulationName(e.target.value)}
                        placeholder="Simulation name..."
                        className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                        onClick={handleSave}
                        disabled={!simulationName.trim() || isSaving}
                        className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
                    >
                        {isSaving ? 'Saving...' : 'Save This Scenario'}
                    </button>
                </div>
            </div>

            {/* Key Metrics */}
            <div className="space-y-6 mb-8">
                {/* Admission Likelihood */}
                <div className="p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Admission Likelihood</h3>
                        <div className="flex items-center space-x-2">
                            <div className="w-12 h-8 bg-green-500 rounded-full flex items-center justify-center">
                                <span className="text-white font-bold text-sm">{result.admissionLikelihood}%</span>
                            </div>
                        </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                            className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full transition-all duration-500"
                            style={{ width: `${result.admissionLikelihood}%` }}
                        />
                    </div>
                    <p className="text-sm text-gray-600 mt-2">Based on your grade improvements and pathway requirements</p>
                </div>

                {/* Timeline and Cost */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 bg-gray-50 rounded-xl">
                        <div className="flex items-center space-x-3 mb-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900">Timeline</h3>
                        </div>
                        <p className="text-2xl font-bold text-blue-600">{result.timeline}</p>
                        <p className="text-sm text-gray-600">Total duration to complete pathway</p>
                </div>

                    <div className="p-6 bg-gray-50 rounded-xl">
                        <div className="flex items-center space-x-3 mb-3">
                            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900">Estimated Cost</h3>
                        </div>
                        <p className="text-2xl font-bold text-green-600">{result.estimatedCost}</p>
                        <p className="text-sm text-gray-600">Including tuition and living expenses</p>
                    </div>
                </div>
            </div>

            {/* Risk Assessment */}
            {result.riskAssessment && result.riskAssessment.length > 0 && (
                <div className="mb-8">
                    <div className="flex items-center space-x-3 mb-4">
                        <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">Risk Assessment</h3>
                    </div>
                    <div className="space-y-3">
                        {result.riskAssessment.map((risk, index) => (
                            <div key={index} className="flex items-start p-4 bg-orange-50 border border-orange-200 rounded-xl">
                                <div className="flex-shrink-0 mr-4">
                                    <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                    </svg>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm font-medium text-gray-900">{risk.message}</p>
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRiskSeverityColor(risk.severity)}`}>
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
                    <div className="flex items-center space-x-3 mb-4">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">Improvement Suggestions</h3>
                    </div>
                    <div className="space-y-3">
                        {result.improvementSuggestions.map((suggestion, index) => (
                            <div key={index} className="flex items-start p-4 bg-blue-50 border border-blue-200 rounded-xl">
                                <div className="flex-shrink-0 mr-4">
                                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                    </svg>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-900">{suggestion}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
                <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105">
                    Save This Scenario
                </button>
                <button className="px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-xl hover:bg-blue-50 transition-all duration-200 font-semibold">
                    Export to Roadmap
                </button>
            </div>
        </div>
    );
}
