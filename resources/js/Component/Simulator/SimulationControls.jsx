import { useState, useEffect } from 'react';
import GradeSlider from './GradeSlider';

export default function SimulationControls({ 
    currentGrades, 
    pathways, 
    simulationControls, 
    onSimulate, 
    onNewSimulation,
    showResults 
}) {
    const [selectedPathway, setSelectedPathway] = useState(simulationControls?.selectedPathway || '');
    const [gradeAdjustments, setGradeAdjustments] = useState(simulationControls?.gradeImprovements || {});
    const [simulationName, setSimulationName] = useState('');
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        if (simulationControls?.gradeImprovements && !isInitialized) {
            setGradeAdjustments(simulationControls.gradeImprovements);
            setIsInitialized(true);
            
            // Trigger initial simulation if pathway is already selected
            if (simulationControls?.selectedPathway) {
                const simulationData = {
                    pathway_id: simulationControls.selectedPathway,
                    grade_adjustments: simulationControls.gradeImprovements
                };
                onSimulate(simulationData);
            }
        }
    }, [simulationControls, onSimulate, isInitialized]);


    const handleGradeChange = (subject, value) => {
        const newValue = parseFloat(value) || 0;
        const currentValue = gradeAdjustments[subject]?.target || 0;
        
        // Only update if the value actually changed
        if (Math.abs(newValue - currentValue) < 0.01) {
            return; // Skip if value hasn't meaningfully changed
        }
        
        const newGradeAdjustments = {
            ...gradeAdjustments,
            [subject]: {
                ...gradeAdjustments[subject],
                target: newValue
            }
        };
        setGradeAdjustments(newGradeAdjustments);
        
        // Trigger simulation automatically if pathway is selected and component is initialized
        if (selectedPathway && isInitialized) {
            const simulationData = {
                pathway_id: selectedPathway,
                grade_adjustments: newGradeAdjustments
            };
            onSimulate(simulationData);
        }
    };

    const handlePathwayChange = (pathwayId) => {
        // Only update if pathway actually changed
        if (pathwayId === selectedPathway) {
            return;
        }
        
        setSelectedPathway(pathwayId);
        
        // Trigger simulation automatically when pathway changes
        if (pathwayId && isInitialized) {
            const simulationData = {
                pathway_id: pathwayId,
                grade_adjustments: gradeAdjustments
            };
            onSimulate(simulationData);
        }
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

    return (
        <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Simulation Controls</h2>
                        <p className="text-sm text-gray-600">Adjust your grades and pathway to see different outcomes</p>
                    </div>
                </div>
                {showResults && (
                    <button
                        onClick={onNewSimulation}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium"
                    >
                        New Simulation
                    </button>
                )}
            </div>

            {/* Pathway Selection */}
            <div className="mb-8">
                <label className="block text-sm font-medium text-gray-900 mb-3">
                    Choose Pathway
                </label>
                <select
                    value={selectedPathway}
                    onChange={(e) => handlePathwayChange(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
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

            {/* Grade Improvements with Sliders */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Grade Improvements</h3>
                    <button
                        onClick={resetToCurrent}
                        className="text-sm text-blue-600 hover:text-blue-800 font-medium px-3 py-1 rounded-md hover:bg-blue-50 transition-colors duration-200"
                    >
                        Reset to Current
                    </button>
                </div>

                <div className="space-y-8">
                    {Object.entries(gradeAdjustments).map(([subject, data]) => (
                        <div key={subject} className="p-6 bg-gray-50 rounded-xl">
                            <GradeSlider
                                label={subject.replace(/([A-Z])/g, ' $1').trim()}
                                current={typeof data.current === 'number' ? data.current : 0}
                                target={typeof data.target === 'number' ? data.target : 0}
                                onChange={(value) => handleGradeChange(subject, value)}
                                min={0}
                                max={4}
                                step={0.1}
                                showGradeIndicator={true}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Additional Parameters */}
            <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Additional Parameters</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 bg-gray-50 rounded-xl">
                        <GradeSlider
                            label="Pre-University CGPA Target"
                            current={0}
                            target={typeof gradeAdjustments.preUniversityCGPA?.target === 'number' ? gradeAdjustments.preUniversityCGPA.target : 3.2}
                            onChange={(value) => handleGradeChange('preUniversityCGPA', value)}
                            min={0}
                            max={4}
                            step={0.1}
                            showGradeIndicator={false}
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-900 mb-3">
                            Simulation Name (Optional)
                        </label>
                        <input
                            type="text"
                            value={simulationName}
                            onChange={(e) => setSimulationName(e.target.value)}
                            placeholder="e.g., Improved Math Focus"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                        />
                    </div>
                </div>
            </div>

        </div>
    );
}
