import { useState, useCallback, useRef, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import MainLayout from '../Layout/MainLayout';
import SimulationControls from '../Component/Simulator/SimulationControls';
import SimulationResults from '../Component/Simulator/SimulationResults';
import SavedSimulations from '../Component/Simulator/SavedSimulations';

export default function WhatIfSimulator({ 
    user, 
    currentGrades, 
    pathways, 
    savedSimulations, 
    simulationControls, 
    navigationItems 
}) {
    
    const [simulationResult, setSimulationResult] = useState(null);
    const [isSimulating, setIsSimulating] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const debounceTimeoutRef = useRef(null);

    const debouncedSimulate = useCallback(async (simulationData) => {
        // Clear existing timeout
        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current);
        }

        // Set new timeout
        debounceTimeoutRef.current = setTimeout(async () => {
            setIsSimulating(true);
            
            try {
                const response = await fetch('/what-if-simulator/simulate', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                    },
                    body: JSON.stringify(simulationData)
                });

                if (response.ok) {
                    const result = await response.json();
                    setSimulationResult(result);
                    setShowResults(true);
                } else {
                    console.error('Simulation failed with status:', response.status);
                }
            } catch (error) {
                console.error('Error running simulation:', error);
            } finally {
                setIsSimulating(false);
            }
        }, 300); // Reduced to 300ms for more responsive feel
    }, []);

    const handleSimulate = async (simulationData) => {
        await debouncedSimulate(simulationData);
    };

    const handleSaveSimulation = async (simulationData) => {
        try {
            const response = await fetch('/what-if-simulator/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                },
                body: JSON.stringify(simulationData)
            });

            if (response.ok) {
                // Refresh the page to show updated saved simulations
                window.location.reload();
            } else {
                console.error('Failed to save simulation');
            }
        } catch (error) {
            console.error('Error saving simulation:', error);
        }
    };

    const handleNewSimulation = () => {
        setSimulationResult(null);
        setShowResults(false);
    };

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (debounceTimeoutRef.current) {
                clearTimeout(debounceTimeoutRef.current);
            }
        };
    }, []);

    return (
        <MainLayout 
            title="What-If Simulator" 
            navigationItems={navigationItems}
            studentProfile={user}
        >
            <Head title="What-If Simulator - NexScholar" />

            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-3">What-If Simulator</h1>
                    <p className="text-lg text-gray-600">
                        Test different scenarios and see how changes in your grades might affect your pathway options.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Simulation Controls */}
                    <div>
                        <SimulationControls
                            currentGrades={currentGrades}
                            pathways={pathways}
                            simulationControls={simulationControls}
                            onSimulate={handleSimulate}
                            onNewSimulation={handleNewSimulation}
                            showResults={showResults}
                        />
                    </div>

                    {/* Simulation Results */}
                    <div>
                        {showResults && simulationResult ? (
                            <SimulationResults
                                result={simulationResult}
                                onSave={handleSaveSimulation}
                            />
                        ) : (
                            <div className="bg-white rounded-lg shadow-lg p-8 h-full flex items-center justify-center">
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Simulation Results</h3>
                                    <p className="text-gray-600">Run a simulation to see your pathway analysis</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Saved Simulations */}
                {savedSimulations && savedSimulations.length > 0 && (
                    <div className="mt-12">
                        <SavedSimulations
                            simulations={savedSimulations}
                        />
                    </div>
                )}
            </div>
        </MainLayout>
    );
}
