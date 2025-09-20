import { useState } from 'react';

export default function UniversityCourseModal({ isOpen, onClose, careerTitle, courses = [] }) {
    const [selectedLevel, setSelectedLevel] = useState('All');

    const filteredCourses = selectedLevel === 'All' 
        ? courses 
        : courses.filter(course => course.level === selectedLevel);

    const levels = ['All', ...new Set(courses.map(course => course.level))];

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
                {/* Header */}
                <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">University Courses</h2>
                            <p className="text-gray-600 mt-1">Suitable courses for {careerTitle}</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Filters */}
                <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center space-x-4">
                        <label className="text-sm font-medium text-gray-700">Filter by Level:</label>
                        <select
                            value={selectedLevel}
                            onChange={(e) => setSelectedLevel(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {levels.map(level => (
                                <option key={level} value={level}>{level}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto max-h-96">
                    {filteredCourses.length === 0 ? (
                        <div className="text-center py-8">
                            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5s3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18s-3.332.477-4.5 1.253" />
                            </svg>
                            <h3 className="mt-2 text-sm font-medium text-gray-900">No courses found</h3>
                            <p className="mt-1 text-sm text-gray-500">No university courses found for this career path.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {filteredCourses.map((course) => (
                                <div key={course.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-2 mb-2">
                                                <h3 className="text-lg font-semibold text-gray-900">{course.course_name}</h3>
                                                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                                                    {course.level}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-600 mb-2">{course.university_name}</p>
                                            <p className="text-gray-700 text-sm mb-3">{course.description}</p>
                                            
                                            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                                                <div>
                                                    <span className="font-medium">Duration:</span> {course.duration_years} years
                                                </div>
                                                <div>
                                                    <span className="font-medium">Tuition:</span> RM {course.tuition_fee?.toLocaleString() || 'Contact University'}
                                                </div>
                                                <div>
                                                    <span className="font-medium">Faculty:</span> {course.faculty}
                                                </div>
                                                <div>
                                                    <span className="font-medium">Campus:</span> {course.campus_location}
                                                </div>
                                            </div>

                                            <div className="mb-3">
                                                <span className="text-sm font-medium text-gray-700">Entry Requirements:</span>
                                                <p className="text-sm text-gray-600 mt-1">{course.entry_requirements}</p>
                                            </div>

                                            {course.subjects_required && course.subjects_required.length > 0 && (
                                                <div className="mb-3">
                                                    <span className="text-sm font-medium text-gray-700">Required Subjects:</span>
                                                    <div className="flex flex-wrap gap-1 mt-1">
                                                        {course.subjects_required.map((subject, index) => (
                                                            <span
                                                                key={index}
                                                                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                                                            >
                                                                {subject}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-200 bg-gray-50">
                    <div className="flex justify-end">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
