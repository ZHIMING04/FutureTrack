export default function RoadmapTimeline({ phases, currentPhaseId }) {
    const getPhaseStatus = (phase) => {
        if (phase.id === currentPhaseId) return 'current';
        // Simple logic: if phase order is less than current phase, it's completed
        const currentPhase = phases.find(p => p.id === currentPhaseId);
        if (currentPhase && phase.order < currentPhase.order) return 'completed';
        return 'upcoming';
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed': return 'bg-green-500 border-green-500';
            case 'current': return 'bg-blue-500 border-blue-500';
            case 'upcoming': return 'bg-gray-300 border-gray-300';
            default: return 'bg-gray-300 border-gray-300';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'completed':
                return (
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                );
            case 'current':
                return (
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                );
            default:
                return (
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                );
        }
    };

    const getStatusLabel = (status) => {
        switch (status) {
            case 'completed': return 'Completed';
            case 'current': return 'Current';
            case 'upcoming': return 'Upcoming';
            default: return 'Unknown';
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Roadmap Timeline</h3>
            
            <div className="space-y-6">
                {phases && phases.length > 0 ? (
                    phases.map((phase, index) => {
                        const status = getPhaseStatus(phase);
                        const isLast = index === phases.length - 1;
                        
                        return (
                            <div key={phase.id} className="relative">
                                {/* Timeline Line */}
                                {!isLast && (
                                    <div className="absolute left-4 top-8 w-0.5 h-16 bg-gray-200"></div>
                                )}
                                
                                <div className="flex items-start space-x-4">
                                    {/* Status Icon */}
                                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${getStatusColor(status)}`}>
                                        {getStatusIcon(status)}
                                    </div>
                                    
                                    {/* Phase Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between mb-1">
                                            <h4 className="text-sm font-medium text-gray-900">{phase.name}</h4>
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                status === 'completed' ? 'text-green-600 bg-green-100' :
                                                status === 'current' ? 'text-blue-600 bg-blue-100' :
                                                'text-gray-600 bg-gray-100'
                                            }`}>
                                                {getStatusLabel(status)}
                                            </span>
                                        </div>
                                        
                                        <p className="text-xs text-gray-600 mb-2">{phase.description}</p>
                                        
                                        {(phase.startDate || phase.endDate) && (
                                            <div className="text-xs text-gray-500">
                                                {phase.startDate && phase.endDate ? (
                                                    `${phase.startDate} - ${phase.endDate}`
                                                ) : (
                                                    phase.startDate || phase.endDate
                                                )}
                                            </div>
                                        )}
                                        
                                        {phase.tasks && phase.tasks.length > 0 && (
                                            <div className="mt-2">
                                                <span className="text-xs text-gray-500">
                                                    {phase.tasks.length} task{phase.tasks.length !== 1 ? 's' : ''}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="text-center py-8">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                            </svg>
                        </div>
                        <h3 className="text-sm font-medium text-gray-900 mb-2">No phases available</h3>
                        <p className="text-xs text-gray-500">
                            Roadmap phases will appear here.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
