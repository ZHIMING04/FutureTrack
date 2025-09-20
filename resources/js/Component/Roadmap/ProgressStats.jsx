export default function ProgressStats({ stats }) {
    const total = stats.completed + stats.inProgress + stats.upcoming;
    const completionPercentage = total > 0 ? Math.round((stats.completed / total) * 100) : 0;

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {/* Overall Progress */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Overall Progress</h3>
                    <span className="text-2xl font-bold text-blue-600">{completionPercentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                        className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${completionPercentage}%` }}
                    ></div>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                    {stats.completed} of {total} tasks completed
                </p>
            </div>

            {/* Completed Tasks */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-gray-900">{stats.completed}</div>
                        <div className="text-sm text-gray-600">Completed</div>
                    </div>
                </div>
                <div className="text-xs text-gray-500">
                    Tasks finished successfully
                </div>
            </div>

            {/* In Progress Tasks */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
                        <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-gray-900">{stats.inProgress}</div>
                        <div className="text-sm text-gray-600">In Progress</div>
                    </div>
                </div>
                <div className="text-xs text-gray-500">
                    Currently working on
                </div>
            </div>

            {/* Upcoming Tasks */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mr-4">
                        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-gray-900">{stats.upcoming}</div>
                        <div className="text-sm text-gray-600">Upcoming</div>
                    </div>
                </div>
                <div className="text-xs text-gray-500">
                    Not started yet
                </div>
            </div>
        </div>
    );
}
