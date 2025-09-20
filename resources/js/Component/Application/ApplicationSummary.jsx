export default function ApplicationSummary({ stats }) {
    const getUrgencyColor = (count) => {
        if (count === 0) return 'text-green-600 bg-green-100';
        if (count <= 3) return 'text-yellow-600 bg-yellow-100';
        return 'text-red-600 bg-red-100';
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {/* Urgent Deadlines */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${getUrgencyColor(stats.urgent).split(' ')[1]}`}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-gray-900">{stats.urgent}</div>
                        <div className="text-sm text-gray-600">Urgent Deadlines</div>
                    </div>
                </div>
                <div className="text-xs text-gray-500">
                    Due within 30 days
                </div>
            </div>

            {/* Active Applications */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-gray-900">{stats.active}</div>
                        <div className="text-sm text-gray-600">Active Applications</div>
                    </div>
                </div>
                <div className="text-xs text-gray-500">
                    In progress or under review
                </div>
            </div>

            {/* Submitted Applications */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-gray-900">{stats.submitted}</div>
                        <div className="text-sm text-gray-600">Submitted</div>
                    </div>
                </div>
                <div className="text-xs text-gray-500">
                    Successfully submitted
                </div>
            </div>

            {/* Total Deadlines */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mr-4">
                        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
                        <div className="text-sm text-gray-600">Total Deadlines</div>
                    </div>
                </div>
                <div className="text-xs text-gray-500">
                    All upcoming deadlines
                </div>
            </div>
        </div>
    );
}
