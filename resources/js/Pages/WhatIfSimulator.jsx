import { useState } from 'react';
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

    const handleSimulate = async (simulationData) => {
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
                console.error('Simulation failed');
            }
        } catch (error) {
            console.error('Error running simulation:', error);
        } finally {
            setIsSimulating(false);
        }
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
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">What-If Simulator</h1>
                    <p className="text-gray-600">
                        Test different scenarios and see how changes in your grades might affect your pathway options.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Simulation Controls */}
                    <div className="lg:col-span-2">
                        <SimulationControls
                            currentGrades={currentGrades}
                            pathways={pathways}
                            simulationControls={simulationControls}
                            onSimulate={handleSimulate}
                            isSimulating={isSimulating}
                            onNewSimulation={handleNewSimulation}
                            showResults={showResults}
                        />

                        {/* Simulation Results */}
                        {showResults && simulationResult && (
                            <div className="mt-8">
                                <SimulationResults
                                    result={simulationResult}
                                    onSave={handleSaveSimulation}
                                />
                            </div>
                        )}
                    </div>

                    {/* Saved Simulations Sidebar */}
                    <div className="lg:col-span-1">
                        <SavedSimulations
                            simulations={savedSimulations}
                        />
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
