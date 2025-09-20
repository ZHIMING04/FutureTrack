import { useState } from 'react';
import { Head } from '@inertiajs/react';
import MainLayout from '../Layout/MainLayout';
import RoadmapHeader from '../Component/Roadmap/RoadmapHeader';
import ProgressStats from '../Component/Roadmap/ProgressStats';
import CurrentPhase from '../Component/Roadmap/CurrentPhase';
import RoadmapTimeline from '../Component/Roadmap/RoadmapTimeline';
import PathComparison from '../Component/Roadmap/PathComparison';

export default function MyRoadmap({ 
    user, 
    careerGoal, 
    mainPath, 
    backupPath, 
    currentPhase, 
    progressStats, 
    currentProgress, 
    phases, 
    navigationItems 
}) {
    const [selectedPath, setSelectedPath] = useState('main');
    const [showComparison, setShowComparison] = useState(false);

    const handleProgressUpdate = async (taskId, status) => {
        try {
            const response = await fetch('/my-roadmap/update-progress', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                },
                body: JSON.stringify({
                    task_id: taskId,
                    status: status
                })
            });

            if (response.ok) {
                // Refresh the page to show updated progress
                window.location.reload();
            } else {
                console.error('Failed to update progress');
            }
        } catch (error) {
            console.error('Error updating progress:', error);
        }
    };

    return (
        <MainLayout 
            title="My Roadmap" 
            navigationItems={navigationItems}
            studentProfile={user}
        >
            <Head title="My Roadmap - NexScholar" />

            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <RoadmapHeader 
                    careerGoal={careerGoal}
                    mainPath={mainPath}
                    backupPath={backupPath}
                    selectedPath={selectedPath}
                    onPathChange={setSelectedPath}
                    onToggleComparison={() => setShowComparison(!showComparison)}
                    showComparison={showComparison}
                />

                {/* Progress Statistics */}
                <ProgressStats stats={progressStats} />

                {/* Path Comparison Modal */}
                {showComparison && (
                    <PathComparison
                        mainPath={mainPath}
                        backupPath={backupPath}
                        onClose={() => setShowComparison(false)}
                    />
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
                    {/* Current Phase */}
                    <div className="lg:col-span-2">
                        <CurrentPhase
                            phase={currentPhase}
                            progress={currentProgress}
                            onProgressUpdate={handleProgressUpdate}
                        />
                    </div>

                    {/* Roadmap Timeline */}
                    <div className="lg:col-span-1">
                        <RoadmapTimeline
                            phases={phases}
                            currentPhaseId={currentPhase?.id}
                        />
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
