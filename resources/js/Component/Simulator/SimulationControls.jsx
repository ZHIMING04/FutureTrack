import { useState, useEffect } from 'react';

export default function SimulationControls({ 
    currentGrades, 
    pathways, 
    simulationControls, 
    onSimulate, 
    isSimulating, 
    onNewSimulation,
    showResults 
}) {
    const [selectedPathway, setSelectedPathway] = useState(simulationControls?.selectedPathway || '');
    const [gradeAdjustments, setGradeAdjustments] = useState(simulationControls?.gradeImprovements || {});
    const [simulationName, setSimulationName] = useState('');

    useEffect(() => {
        if (simulationControls?.gradeImprovements) {
            setGradeAdjustments(simulationControls.gradeImprovements);
        }
    }, [simulationControls]);

    const handleGradeChange = (subject, field, value) => {
        setGradeAdjustments(prev => ({
            ...prev,
            [subject]: {
                ...prev[subject],
                [field]: parseFloat(value) || 0
            }
        }));
    };

    const handleSimulate = () => {
        if (!selectedPathway) {
            alert('Please select a pathway');
            return;
        }

        const simulationData = {
            pathway_id: selectedPathway,
            grade_adjustments: gradeAdjustments
        };

        onSimulate(simulationData);
    };

    const resetToCurrent = () => {
        setGradeAdjustments(simulationControls?.gradeImprovements || {});
    };

    const getGradeColor = (current, target) => {
        if (current >= target) return 'text-green-600 bg-green-100';
        if (current >= target - 0.3) return 'text-yellow-600 bg-yellow-100';
        return 'text-red-600 bg-red-100';
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Simulation Controls</h2>
                {showResults && (
                    <button
                        onClick={onNewSimulation}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm"
                    >
                        New Simulation
                    </button>
                )}
            </div>

            {/* Pathway Selection */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Pathway to Simulate
                </label>
                <select
                    value={selectedPathway}
                    onChange={(e) => setSelectedPathway(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                    <option value="">Choose a pathway...</option>
                    {pathways?.map((pathway) => (
                        <option key={pathway.id} value={pathway.id}>
                            {pathway.name}
                        </option>
                    ))}
                </select>
                {selectedPathway && (
                    <p className="mt-2 text-sm text-gray-600">
                        {pathways?.find(p => p.id == selectedPathway)?.description}
                    </p>
                )}
            </div>

            {/* Grade Adjustments */}
            <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-900">Grade Adjustments</h3>
                    <button
                        onClick={resetToCurrent}
                        className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                    >
                        Reset to Current
                    </button>
                </div>

                <div className="space-y-4">
                    {Object.entries(gradeAdjustments).map(([subject, data]) => (
                        <div key={subject} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-center">
                                <span className="text-sm font-medium text-gray-900 capitalize">
                                    {subject.replace(/([A-Z])/g, ' $1').trim()}
                                </span>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                                <label className="text-xs text-gray-600">Current:</label>
                                <span className={`px-2 py-1 rounded text-xs font-medium ${getGradeColor(data.current, data.target)}`}>
                                    {data.current}
                                </span>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                                <label className="text-xs text-gray-600">Target:</label>
                                <input
                                    type="number"
                                    min="0"
                                    max="4"
                                    step="0.1"
                                    value={data.target}
                                    onChange={(e) => handleGradeChange(subject, 'target', e.target.value)}
                                    className="w-16 px-2 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Additional Parameters */}
            <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Additional Parameters</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Pre-University CGPA Target
                        </label>
                        <input
                            type="number"
                            min="0"
                            max="4"
                            step="0.1"
                            value={gradeAdjustments.preUniversityCGPA?.target || 3.2}
                            onChange={(e) => handleGradeChange('preUniversityCGPA', 'target', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Simulation Name (Optional)
                        </label>
                        <input
                            type="text"
                            value={simulationName}
                            onChange={(e) => setSimulationName(e.target.value)}
                            placeholder="e.g., Improved Math Focus"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                </div>
            </div>

            {/* Run Simulation Button */}
            <div className="flex justify-center">
                <button
                    onClick={handleSimulate}
                    disabled={!selectedPathway || isSimulating}
                    className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center"
                >
                    {isSimulating ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Running Simulation...
                        </>
                    ) : (
                        <>
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                            Run Simulation
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
