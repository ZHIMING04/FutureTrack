export default function MyCoursesList({ enrolledCourses, onProgressUpdate }) {
    const getStatusColor = (status) => {
        switch (status) {
            case 'Enrolled': return 'text-blue-600 bg-blue-100';
            case 'In Progress': return 'text-yellow-600 bg-yellow-100';
            case 'Completed': return 'text-green-600 bg-green-100';
            case 'Paused': return 'text-gray-600 bg-gray-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };

    const getProgressColor = (percentage) => {
        if (percentage >= 80) return 'bg-green-500';
        if (percentage >= 50) return 'bg-yellow-500';
        return 'bg-blue-500';
    };

    if (!enrolledCourses || enrolledCourses.length === 0) {
        return (
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">My Courses</h2>
                <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5s3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18s-3.332.477-4.5 1.253" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No enrolled courses</h3>
                    <p className="text-gray-500 mb-4">
                        You haven't enrolled in any courses yet. Browse our course catalog to get started.
                    </p>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                        Browse Courses
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">My Courses</h2>
                <span className="text-sm text-gray-500">{enrolledCourses.length} enrolled</span>
            </div>

            <div className="space-y-4">
                {enrolledCourses.map((enrollment) => (
                    <div key={enrollment.id} className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors duration-200">
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                                <h3 className="text-lg font-medium text-gray-900 mb-1">{enrollment.course.title}</h3>
                                <p className="text-sm text-gray-600 mb-2">{enrollment.course.description}</p>
                                <div className="flex items-center space-x-4 text-xs text-gray-500">
                                    <span>Enrolled: {enrollment.enrolledAt}</span>
                                    {enrollment.completedAt && (
                                        <span>Completed: {enrollment.completedAt}</span>
                                    )}
                                </div>
                            </div>
                            <div className="flex items-center space-x-2 ml-4">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(enrollment.status)}`}>
                                    {enrollment.status}
                                </span>
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="mb-4">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-gray-700">Progress</span>
                                <span className="text-sm text-gray-500">{enrollment.progressPercentage}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                    className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(enrollment.progressPercentage)}`}
                                    style={{ width: `${enrollment.progressPercentage}%` }}
                                ></div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                                    Continue Learning
                                </button>
                                <button className="text-sm text-gray-600 hover:text-gray-800 font-medium">
                                    View Details
                                </button>
                            </div>
                            
                            {enrollment.status !== 'Completed' && (
                                <div className="flex items-center space-x-2">
                                    <span className="text-xs text-gray-500">Update Progress:</span>
                                    <select
                                        value={enrollment.progressPercentage}
                                        onChange={(e) => onProgressUpdate(enrollment.id, parseInt(e.target.value))}
                                        className="text-xs border border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        {[0, 25, 50, 75, 100].map(value => (
                                            <option key={value} value={value}>{value}%</option>
                                        ))}
                                    </select>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
