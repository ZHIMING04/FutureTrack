export default function ApplicationList({ applications, onStatusUpdate }) {
    const getStatusColor = (status) => {
        switch (status) {
            case 'Not Started': return 'text-gray-600 bg-gray-100';
            case 'In Progress': return 'text-blue-600 bg-blue-100';
            case 'Submitted': return 'text-green-600 bg-green-100';
            case 'Under Review': return 'text-yellow-600 bg-yellow-100';
            case 'Accepted': return 'text-green-600 bg-green-100';
            case 'Rejected': return 'text-red-600 bg-red-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };

    const getUrgencyColor = (daysLeft) => {
        if (daysLeft <= 7) return 'text-red-600 bg-red-100';
        if (daysLeft <= 30) return 'text-yellow-600 bg-yellow-100';
        return 'text-green-600 bg-green-100';
    };

    const getUrgencyLabel = (daysLeft) => {
        if (daysLeft <= 7) return 'Critical';
        if (daysLeft <= 30) return 'Urgent';
        return 'Normal';
    };

    if (!applications || applications.length === 0) {
        return (
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Applications</h2>
                <div className="text-center py-8">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <h3 className="text-sm font-medium text-gray-900 mb-2">No applications found</h3>
                    <p className="text-xs text-gray-500">
                        Applications will appear here when available.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Applications</h2>
                <span className="text-sm text-gray-500">{applications.length} applications</span>
            </div>

            <div className="space-y-4">
                {applications.map((application) => (
                    <div key={application.id} className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors duration-200">
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                                <h3 className="text-lg font-medium text-gray-900 mb-1">{application.name}</h3>
                                <p className="text-sm text-gray-600 mb-2">{application.organization}</p>
                                <p className="text-xs text-gray-500">{application.description}</p>
                            </div>
                            <div className="flex items-center space-x-2 ml-4">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}>
                                    {application.status}
                                </span>
                                {application.deadline && (
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(application.deadline.daysLeft)}`}>
                                        {getUrgencyLabel(application.deadline.daysLeft)}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Deadline Information */}
                        {application.deadline && (
                            <div className="bg-gray-50 rounded-lg p-3 mb-3">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-900">{application.deadline.title}</h4>
                                        <p className="text-xs text-gray-600">{application.deadline.description}</p>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm font-medium text-gray-900">{application.deadline.dueDate}</div>
                                        <div className="text-xs text-gray-500">
                                            {application.deadline.daysLeft} days left
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Requirements */}
                        {application.requirements && (
                            <div className="mb-3">
                                <h4 className="text-sm font-medium text-gray-900 mb-2">Requirements:</h4>
                                <ul className="text-xs text-gray-600 space-y-1">
                                    {application.requirements.map((requirement, index) => (
                                        <li key={index} className="flex items-start">
                                            <span className="text-gray-400 mr-2">•</span>
                                            {requirement}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Actions */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                {application.websiteUrl && (
                                    <a
                                        href={application.websiteUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                                    >
                                        View Application
                                    </a>
                                )}
                                <button className="text-sm text-gray-600 hover:text-gray-800 font-medium">
                                    View Details
                                </button>
                            </div>
                            
                            {application.status !== 'Accepted' && application.status !== 'Rejected' && (
                                <select
                                    value={application.status}
                                    onChange={(e) => onStatusUpdate(application.id, e.target.value)}
                                    className="text-xs border border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="Not Started">Not Started</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Submitted">Submitted</option>
                                    <option value="Under Review">Under Review</option>
                                    <option value="Accepted">Accepted</option>
                                    <option value="Rejected">Rejected</option>
                                </select>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
