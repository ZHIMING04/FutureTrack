export default function CurrentPhase({ phase, progress, onProgressUpdate }) {
    const getStatusColor = (status) => {
        switch (status) {
            case 'Completed': return 'text-green-600 bg-green-100';
            case 'In Progress': return 'text-yellow-600 bg-yellow-100';
            case 'Not Started': return 'text-gray-600 bg-gray-100';
            case 'Skipped': return 'text-red-600 bg-red-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Completed':
                return (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                );
            case 'In Progress':
                return (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                );
            case 'Skipped':
                return (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                );
            default:
                return (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                );
        }
    };

    const handleStatusChange = (taskId, newStatus) => {
        onProgressUpdate(taskId, newStatus);
    };

    if (!phase) {
        return (
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Current Phase</h2>
                <div className="text-center py-8">
                    <div className="text-gray-500">No current phase available</div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Current Phase</h2>
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-medium text-gray-900">{phase.name}</h3>
                        <p className="text-gray-600">{phase.description}</p>
                    </div>
                    <div className="text-right text-sm text-gray-500">
                        {phase.startDate && phase.endDate && (
                            <div>
                                {phase.startDate} - {phase.endDate}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Progress Tasks */}
            <div className="space-y-4">
                <h4 className="text-lg font-medium text-gray-900 mb-4">Current Tasks</h4>
                
                {progress && progress.length > 0 ? (
                    <div className="space-y-3">
                        {progress.map((task) => (
                            <div key={task.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors duration-200">
                                <div className="flex items-start space-x-3 flex-1">
                                    <div className={`p-1 rounded-full ${getStatusColor(task.status).split(' ')[1]}`}>
                                        {getStatusIcon(task.status)}
                                    </div>
                                    <div className="flex-1">
                                        <h5 className="text-sm font-medium text-gray-900">{task.taskName}</h5>
                                        {task.description && (
                                            <p className="text-xs text-gray-600 mt-1">{task.description}</p>
                                        )}
                                        <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                                            {task.dueDate && (
                                                <span>Due: {task.dueDate}</span>
                                            )}
                                            {task.completedAt && (
                                                <span className="text-green-600">Completed: {task.completedAt}</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="flex items-center space-x-2">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                                        {task.status}
                                    </span>
                                    
                                    {task.status !== 'Completed' && (
                                        <select
                                            value={task.status}
                                            onChange={(e) => handleStatusChange(task.id, e.target.value)}
                                            className="text-xs border border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                                        >
                                            <option value="Not Started">Not Started</option>
                                            <option value="In Progress">In Progress</option>
                                            <option value="Completed">Completed</option>
                                            <option value="Skipped">Skipped</option>
                                        </select>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                        </div>
                        <h3 className="text-sm font-medium text-gray-900 mb-2">No tasks available</h3>
                        <p className="text-xs text-gray-500">
                            Tasks will appear here as you progress through your roadmap.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
