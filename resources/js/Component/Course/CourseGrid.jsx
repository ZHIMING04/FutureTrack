export default function CourseGrid({ courses, onEnroll, enrolledCourseIds }) {
    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case 'Beginner': return 'text-green-600 bg-green-100';
            case 'Intermediate': return 'text-yellow-600 bg-yellow-100';
            case 'Advanced': return 'text-red-600 bg-red-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };

    const getTypeColor = (type) => {
        switch (type) {
            case 'Free': return 'text-green-600 bg-green-100';
            case 'Paid': return 'text-blue-600 bg-blue-100';
            case 'Premium': return 'text-purple-600 bg-purple-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };

    if (!courses || courses.length === 0) {
        return (
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5s3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18s-3.332.477-4.5 1.253" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No courses found</h3>
                    <p className="text-gray-500">
                        Try adjusting your filters or check back later for new courses.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => {
                const isEnrolled = enrolledCourseIds.includes(course.id);
                
                return (
                    <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
                        {/* Course Image/Header */}
                        <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                            <div className="text-center text-white">
                                <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5s3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18s-3.332.477-4.5 1.253" />
                                </svg>
                                <div className="text-sm font-medium">{course.type}</div>
                            </div>
                        </div>

                        <div className="p-6">
                            {/* Course Header */}
                            <div className="flex items-start justify-between mb-3">
                                <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{course.title}</h3>
                                <div className="flex flex-col items-end space-y-1">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(course.type)}`}>
                                        {course.type}
                                    </span>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(course.difficultyLevel)}`}>
                                        {course.difficultyLevel}
                                    </span>
                                </div>
                            </div>

                            {/* Course Description */}
                            <p className="text-sm text-gray-600 mb-4 line-clamp-3">{course.description}</p>

                            {/* Course Details */}
                            <div className="space-y-2 mb-4">
                                <div className="flex items-center text-sm text-gray-500">
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    {course.duration}
                                </div>
                                
                                {course.skillsCovered && course.skillsCovered.length > 0 && (
                                    <div className="flex items-start text-sm text-gray-500">
                                        <svg className="w-4 h-4 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                        </svg>
                                        <div>
                                            <span className="font-medium">Skills:</span> {course.skillsCovered.slice(0, 3).join(', ')}
                                            {course.skillsCovered.length > 3 && ` +${course.skillsCovered.length - 3} more`}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Pricing */}
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center space-x-2">
                                    <span className="text-lg font-bold text-gray-900">{course.price}</span>
                                    {course.originalPrice && course.originalPrice !== course.price && (
                                        <>
                                            <span className="text-sm text-gray-500 line-through">{course.originalPrice}</span>
                                            <span className="text-sm text-green-600 font-medium">
                                                Save {course.savingsPercentage}%
                                            </span>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Action Button */}
                            <div className="flex space-x-2">
                                {isEnrolled ? (
                                    <button
                                        disabled
                                        className="flex-1 px-4 py-2 bg-green-100 text-green-800 rounded-lg font-medium text-sm cursor-not-allowed"
                                    >
                                        Enrolled
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => onEnroll(course.id)}
                                        className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium text-sm"
                                    >
                                        Enroll Now
                                    </button>
                                )}
                                
                                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-sm">
                                    View Details
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
