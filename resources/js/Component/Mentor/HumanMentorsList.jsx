import React from 'react';

export default function HumanMentorsList({ mentors }) {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-semibold text-gray-900">Available Mentors</h2>
                    <p className="text-gray-600">Connect with experienced professionals for personalized guidance</p>
                </div>
                <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    Request New Mentor
                </button>
            </div>

            {/* Mentors Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mentors.map((mentor) => (
                    <div key={mentor.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                        {/* Mentor Profile */}
                        <div className="flex items-start space-x-4 mb-4">
                            <img
                                src={mentor.profilePicture}
                                alt={mentor.name}
                                className="w-16 h-16 rounded-full object-cover"
                            />
                            <div className="flex-1">
                                <h3 className="font-semibold text-gray-900">{mentor.name}</h3>
                                <p className="text-sm text-gray-600">{mentor.title}</p>
                                <p className="text-sm text-blue-600">{mentor.university}</p>
                            </div>
                        </div>

                        {/* Specialization */}
                        <div className="mb-4">
                            <h4 className="text-sm font-medium text-gray-900 mb-2">Specialization</h4>
                            <p className="text-sm text-gray-600">{mentor.specialization}</p>
                        </div>

                        {/* Rating and Availability */}
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-1">
                                <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                        <svg
                                            key={i}
                                            className={`w-4 h-4 ${
                                                i < Math.floor(mentor.rating)
                                                    ? 'text-yellow-400'
                                                    : 'text-gray-300'
                                            }`}
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <span className="text-sm text-gray-600 ml-1">{mentor.rating}</span>
                            </div>
                            <span className={`px-2 py-1 text-xs rounded-full ${
                                mentor.availability === 'Available'
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-gray-100 text-gray-800'
                            }`}>
                                {mentor.availability}
                            </span>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex space-x-2">
                            <button className="flex-1 px-3 py-2 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                                Book Session
                            </button>
                            <button className="px-3 py-2 border border-gray-300 text-gray-700 text-sm rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                                Message
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* No Mentors Message */}
            {mentors.length === 0 && (
                <div className="text-center py-12">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No mentors available</h3>
                    <p className="mt-1 text-sm text-gray-500">Check back later for new mentor profiles.</p>
                </div>
            )}
        </div>
    );
}
