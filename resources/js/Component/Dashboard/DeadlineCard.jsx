import { router } from '@inertiajs/react';

export default function DeadlineCard({ deadlines }) {
    const getStatusColor = (status) => {
        return status === 'urgent' 
            ? 'bg-red-100 text-red-800' 
            : 'bg-gray-100 text-gray-800';
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex items-center mb-4">
                <svg className="w-5 h-5 text-gray-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-lg font-semibold text-gray-900">Upcoming Deadlines</h3>
            </div>
            
            <div className="space-y-4 mb-4">
                {deadlines && deadlines.length > 0 ? (
                    deadlines.map((deadline, index) => (
                        <div key={index} className="flex items-center justify-between">
                            <div className="flex-1">
                                <h4 className="text-sm font-medium text-gray-900">{deadline.title}</h4>
                                <p className="text-xs text-gray-600">{deadline.description}</p>
                            </div>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(deadline.status)}`}>
                                {Math.round(deadline.daysLeft)} days
                            </span>
                        </div>
                    ))
                ) : (
                    <p className="text-sm text-gray-500">No upcoming deadlines</p>
                )}
            </div>
            
            <button 
                onClick={() => router.visit('/applications-deadlines')}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium py-2 px-4 rounded-lg transition-colors duration-200"
            >
                View All Deadlines
            </button>
        </div>
    );
}